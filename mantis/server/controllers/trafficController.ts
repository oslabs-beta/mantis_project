import axios from "axios";
import { Point, InfluxDB } from "@influxdata/influxdb-client";
import { influxDB } from "../controllers/userController";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest, TrafficController } from "../types/types";
import User from "../models/userModel";

export const trafficController: TrafficController = {
  rps: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("RPS method in latency controller trigger");
// Axios need to be review
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
      }
      // 1️⃣ Retrieve the username from the request body
      // (If you prefer JWT-based auth, see the note below)
      const { username } = req.user;
      
      if (!username) {
        return res
          .status(400)
          .json({ error: "Missing 'username' in the request body." });
      }

      // 2️⃣ Find the user in Mongo
      const user = await User.findOne({ username });
      if (!user || !user.influxToken || !user.bucket) {
        return res
          .status(404)
          .json({ error: "No Influx credentials found for this user." });
      }

      console.log("Fetching metrics from Prometheus for user:", username);
      // 3️⃣ Query Prometheus for RPS
      const prometheusUrl = "http://prometheus:9090/api/v1/query";
      const query = "http_api_requests_total";

      const { data } = await axios.get(prometheusUrl, {
        timeout: 5000,
        params: { query: encodeURIComponent(query) },
      });

      console.log("Prometheus raw response:", data);

      if (
        !data ||
        data.status !== "success" ||
        !Array.isArray(data.data?.result) ||
        data.data.result.length === 0
      ) {
        console.warn("No valid RPS data from Prometheus.");
        return res
          .status(404)
          .json({ message: "No RPS data available from Prometheus" });
      }

      // 4️⃣ Extract an RPS value from the first result
      const firstVal = data.data.result[0]?.value;
      const rps = firstVal ? parseFloat(firstVal[1]) : 0;

      // 5️⃣ Write the metric to Influx using the user’s token & bucket
      const orgName = process.env.INFLUX_ORG || "MainOrg";
      const writeApi = new InfluxDB({
        url: process.env.INFLUX_URL || "http://influxdb:8086",
        token: user.influxToken,
      }).getWriteApi(orgName, user.bucket);

      const point = new Point("api_performance")
        .tag("endpoint", "/test-rps")
        .floatField("rps", rps);

      writeApi.writePoint(point);
      await writeApi.flush();

      console.log(`✅ Stored RPS value: ${rps} for user: ${username}`);

      // 6️⃣ Return the metric to the client
      return res.json({
        metric: "rps",
        value: rps,
        source: "Prometheus",
        user: username,
      });
    } catch (err) {
      console.error("❌ Error fetching or storing RPS:", err);
      return next(err);
    }
  },
  trafficEndpoint: async (req, res, next) => {},
};
