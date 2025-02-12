import axios from "axios";
import { Point, InfluxDB } from "@influxdata/influxdb-client";
import { influxDB } from "../controllers/userController";
import { Response, NextFunction } from "express";
import { TrafficController } from "../types/types";
import User from "../models/userModel";

export const trafficController: TrafficController = {
  rps: async (req: Request, res: Response, next: NextFunction) => {
    console.log("RPS method in latency controller trigger");

    try {

      const {username} = req.body!.username; 
      if (!username) {
        return res.status(400).json({ error: "Missing username in body." });
      }

      const user = await User.findOne({ username });
      if (!user || !user.influxToken || !user.bucket) {
        return res.status(404).json({ error: "No Influx credentials for user." });
      }

      console.log("Inside the try in RPS method");
      // 1️⃣ Query Prometheus for RPS
      const prometheusUrl = "http://prometheus:9090/api/v1/query";
      const query = `http_api_request_duration_seconds_bucket`;

      const { data } = await axios.get(prometheusUrl, {
        timeout: 5000,
        params: { query: encodeURIComponent(query) },
      });

      console.log("Before check: ", data);

      if (
        !data ||
        data.status !== "success" ||
        !Array.isArray(data.data.result) ||
        data.data.result.length === 0
      ) {
        console.warn("⚠️ No valid p90 latency data from Prometheus.");
        res.status(404).json({ message: "No latency data available" });
        return;
      }

      console.log("After check: ", data);
      console.log("branch");

      // 2️⃣ Extract latency value
      const firstVal = data.data.result[0]?.value;
      const rps = firstVal ? parseFloat(firstVal[1]) : 0;

      // 3️⃣ Store in InfluxDB
      const orgName = process.env.INFLUX_ORG || "MainOrg";
      const writeClient = new InfluxDB({
        url: process.env.INFLUX_URL || "http://localhost:8086",
        token: user.influxToken,
      }).getWriteApi(orgName, user.bucket);

      // Build a data point
      const point = new Point("api_performance")
        .tag("endpoint", "/test-rps")
        .floatField("rps", rps);

      // Write it
      writeClient.writePoint(point);
      await writeClient.flush();;

      console.log(`✅ Stored p90 latency: ${rps}ms`);

      // 4️⃣ Respond with latency value
      res.json({
        metric: "rps_ms",
        value: rps,
        unit: "ms",
        source: "Prometheus",
      });

      next();
    } catch (err) {
      console.error("❌ Error fetching RPS:", err);
      return next();
    }
  },
  trafficEndpoint: async (req, res, next) => {},
};
