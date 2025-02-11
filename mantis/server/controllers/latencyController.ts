// import axios from "axios";
// import { Point } from "@influxdata/influxdb-client";
// import { influxDB, writeApi } from "../server";
// import { Response, NextFunction } from "express";
// import { LatencyController, CustomRequest } from "../../types/types";

// export const latencyController: LatencyController = {

//   // p90Latency: async (req: Request, res: Response, next: NextFunction) => {
//   //   console.log('RPS method in latency controller trigger')

//   //   try {
//   //     console.log('Inside the try in p90Latency method')
//   //     // 1️⃣ Query Prometheus for p90 latency
//   //     const prometheusUrl = "http://prometheus:9090/api/v1/query";
//   //     const query = `http_api_request_duration_seconds_bucket`;

//   //     const { data } = await axios.get(prometheusUrl, {
//   //       timeout: 5000,
//   //       params: { query: encodeURIComponent(query) },
//   //     });

//   //     console.log("Before check: ", data)

//   //     if (!data || data.status !== "success" || !Array.isArray(data.data.result) || data.data.result.length === 0) {
//   //       console.warn("⚠️ No valid p90 latency data from Prometheus.");
//   //       res.status(404).json({ message: "No latency data available" });
//   //       return;
//   //     }

//   //     console.log("After check: ",data)

//   //     // 2️⃣ Extract latency value
//   //     const firstVal = data.data.result[0]?.value;
//   //     const p90Latency = firstVal ? parseFloat(firstVal[1]) : 0;

//   //     // 3️⃣ Store in InfluxDB
//   //     const point = new Point("api_performance")
//   //       .tag("endpoint", "/test-latency")
//   //       .floatField("latency_p90_ms", p90Latency);

//   //     writeApi.writePoint(point);
//   //     await writeApi.flush();

//   //     console.log(`✅ Stored p90 latency: ${p90Latency}ms`);

//   //     // 4️⃣ Respond with latency value
//   //     res.json({
//   //       metric: "latency_p90_ms",
//   //       value: p90Latency,
//   //       unit: "ms",
//   //       source: "Prometheus",
//   //     });

//   //     next();

//   //   } catch (err) {
//   //     console.error("❌ Error fetching p90 latency:", err);
//   //     return next();
//   //   }
//   // },
//   // p99Latency: async (req, res, next) => {},
// }};
