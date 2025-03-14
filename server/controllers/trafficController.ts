import axios from "axios";
import { Point, InfluxDB } from "@influxdata/influxdb-client";
// import { influxDB } from "../controllers/userController";
import { Response, NextFunction, RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/types";
import User from "../models/userModel";
import {generateModifier} from "./automation.ts"

const wiremock_base = process.env.WIREMOCK_BASE || "http://wiremock:8080";

// export const rpsController: RequestHandler = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("RPS method in latency controller trigger");
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: "Unauthorized: No user found" });
//     }

//     const { username } = req.user;

//     const endpointQuery = req.query.endpoint as string;
//     const wiremockEndpoint = endpointQuery || "/default";
//     let wiremockData: any = null;

//     try {
//       const wiremockResponse = await axios.get(
//         `${wiremock_base}${wiremockEndpoint}`
//       );
//       wiremockData = wiremockResponse.data;
//     } catch (err) {
//       console.error(
//         `Error fetching wiremock data for endpoint: ${wiremockEndpoint}`,
//         err
//       );
//       wiremockData = { error: "Failed calling Wiremock" };
//     }

//     console.log("Fetching metrics from Prometheus for user:", username);

//     const prometheusUrl = "http://prometheus:9090/api/v1/query";
//     const query = `sum(rate(http_api_requests_total[1m]))`;

//     const { data } = await axios.get(prometheusUrl, {
//       timeout: 5000,
//       params: { query: query },
//     });

//     console.log("Prometheus raw response:", data);

//     if (
//       !data ||
//       data.status !== "success" ||
//       !Array.isArray(data.data?.result) ||
//       data.data.result.length === 0
//     ) {
//       console.warn("No valid RPS data from Prometheus.");
//       return res.status(404).json({
//         wiremockData: wiremockData,
//         message: "No RPS data available from Prometheus",
//       });
//     }

//     const firstVal = data.data.result[0]?.value;
//     let rps = firstVal ? parseFloat(firstVal[1]) : 0;

//     const modifierFunction = generateModifier(wiremockEndpoint);
//     rps = modifierFunction(rps);

//     const user = await User.findOne({ username });
//     if (!user || !user.influxToken || !user.bucket) {
//       return res
//         .status(404)
//         .json({ error: "No Influx credentials found for this user." });
//     }

//     if (!username) {
//       return res
//         .status(400)
//         .json({ error: "Missing 'username' in the request body." });
//     }

//     const orgName = process.env.INFLUX_ORG || "MainOrg";
//     const writeApi = new InfluxDB({
//       url: process.env.INFLUX_URL || "http://influxdb:8086",
//       token: user.influxToken,
//     }).getWriteApi(orgName, user.bucket);

//     const point = new Point("rps")
//       .tag("endpoint", wiremockEndpoint)
//       .floatField("rps", rps);

//     writeApi.writePoint(point);
//     await writeApi.flush();

//     console.log(`✅ Stored RPS value: ${rps} for user: ${username}`);

//     return res.json({
//       metric: "rps",
//       wiremockEnpoint: wiremockEndpoint,
//       wiremockData: wiremockData,
//       value: rps.toFixed(2),
//       source: "Prometheus",
//       user: username,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching or storing RPS:", err);
//     return next(err);
//   }
// };
export const rpsController: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("RPS controller triggered (production mode)");
  try {
    // 1. Check user authentication (assumes JWT middleware has attached req.user)
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }
    const { username } = req.user;
    if (!username) {
      return res.status(400).json({ error: "Missing 'username'" });
    }

    // 2. Retrieve the user document (which holds InfluxDB credentials)
    const user = await User.findOne({ username });
    if (!user || !user.influxToken || !user.bucket) {
      return res
        .status(404)
        .json({ error: "No Influx credentials found for this user." });
    }

    // 3. Query Prometheus for real RPS data.
    //    This query uses the real request counter metric.
    //    If your microservices expose a label to identify the user,
    //    you can filter by it. For example, if each request has label `user`,
    //    adjust the query below:
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query = `sum(rate(http_api_requests_total{user="${username}"}[1m]))`;
    
    const promResponse = await axios.get(prometheusUrl, {
      timeout: 5000,
      params: { query },
    });
    console.log("Prometheus raw response:", promResponse.data);

    if (
      !promResponse.data ||
      promResponse.data.status !== "success" ||
      !Array.isArray(promResponse.data.data?.result) ||
      promResponse.data.data.result.length === 0
    ) {
      console.warn("No valid RPS data from Prometheus.");
      return res
        .status(404)
        .json({ message: "No RPS data available from Prometheus" });
    }

    // 4. Extract the RPS value.
    //    For example, if the metric returns 4, then that means 4 RPS.
    const firstVal = promResponse.data.data.result[0]?.value;
    const rps = firstVal ? parseFloat(firstVal[1]) : 0;

    // 5. Store the metric in InfluxDB (for Grafana visualization)
    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const influx = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    });
    const writeApi = influx.getWriteApi(orgName, user.bucket, "s"); // using seconds as precision
    const point = new Point("rps")
      .tag("user", username)
      .floatField("rps", rps);
    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(`✅ Stored RPS value: ${rps} for user: ${username}`);

    // 6. Return the RPS metric to the client.
    return res.json({
      metric: "rps",
      value: rps.toFixed(2),
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("❌ Error fetching or storing RPS:", err);
    return next(err);
  }
};

export const trafficEndpoint: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Traffic method in traffic controller trigger");

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No userfound" });
    }
    const { username } = req.user;
    if (!username) {
      return res
        .status(400)
        .json({ error: "Missing 'username' in the request body." });
    }

    const user = await User.findOne({ username });
    if (!user || !user.influxToken || !user.bucket) {
      return res
        .status(404)
        .json({ error: "No Influx credentials found for this user." });
    }

    const endpointQuery = req.query.endpoint as string;
    const wiremockEndpoint = endpointQuery || "/default";
    let wiremockData: any = null;

    try {
      const wiremockResponse = await axios.get(
        `${wiremock_base}${wiremockEndpoint}`
      );
      wiremockData = wiremockResponse.data;
    } catch (err) {
      console.error(
        `Error fetching wiremock data for endpoint: ${wiremockEndpoint}`,
        err
      );
      wiremockData = { error: "Failed calling Wiremock" };
    }

    console.log("Fetching metrics from Prometheus for user:", username);
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query ='http_api_requests_total';


    const { data } = await axios.get(prometheusUrl, {
      timeout: 5000,
      params: { query: query },
    });
    console.log("Prometheus raw response:", data);

    if (
      !data ||
      data.status !== "success" ||
      !Array.isArray(data.data?.result) ||
      data.data.result.length === 0
    ) {
      console.warn("No valid 4xx data from Prometheus.");
      return res
        .status(404)
        .json({ 
          wiremockData: wiremockData,
          message: "No traffic data available from Prometheus" });
    }

    const firstVal = data.data.result[0]?.value;
    let traffic = firstVal ? parseFloat(firstVal[1]) : 0;

    const modifierFunction = generateModifier(wiremockEndpoint);
    traffic = modifierFunction(traffic);

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point("traffic")
      .tag("endpoint", wiremockEndpoint)
      .floatField(`traffic_${wiremockEndpoint}`, traffic);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log("Traffic data written to InfluxDB for user:", username);

    return res.status(200).json({
      wiremockEndpoint: wiremockEndpoint,
      wiremockData: wiremockData,
      metric: `traffic_${wiremockEndpoint}`,
      value: traffic.toFixed(2),
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("Error in error4xx controller", err);
    return next(err);
  }
};


// function generateModifier(endpoint: string): (val: number) => number {
//   const hash = endpoint.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0); // Sum char codes
//   const multiplier = (hash % 3) + 1.5; // Ensures a unique multiplier between 1.5 and 3.5
//   const randomOffset = (hash % 5) + Math.random() * 5; // Ensures a unique offset between 0-10
//   return (val: number) => val * multiplier + randomOffset;
// }