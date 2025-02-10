import axios from "axios";
import { Point } from "@influxdata/influxdb-client";
import { influxDB, writeApi } from "../server";
import { Response, NextFunction } from "express";
import { LatencyController, CustomRequest } from "../../types/types";

export const latencyController: LatencyController = {
//   p50Latency: async (req: CustomRequest, res: Response, next: NextFunction) => {
//     try {
//       // 1) Query Prometheus for the latest p50, p90, p99
//       // Below is just a placeholder example of a PromQL query
//       // that fetches your latencies for a given endpoint label.
//       const prometheusUrl = "http://prometheus:9090/api/v1/query";
//       const endpointName = "get-mocking1"; // or dynamically discovered
//       // const query = `histogram_quantile(0.5, sum(rate(http_request_duration_seconds_bucket{endpoint="${endpointName}"}[1m])) by (le))`;
//       // const query = `histogram_quantile(0.5, sum((http_request_duration_seconds_bucket{endpoint="${endpointName}"}[1m])) by (le))`;
//       const query = 'sum(http_request_duration_seconds_bucket{route="/test-latency"})';


//       // histogram_quantile(0.5,
//       //   sum(rate(http_request_duration_seconds_bucket{route="/test-latency"}[1m]))
//       //   by (le))

// //       const query = `
// //   histogram_quantile(
// //     0.5,
// //     sum(rate(http_request_duration_seconds_bucket{route="/test-latency"}[1m])) by (le)
// //   )
// // `;
//       // 2) Make the request to Prometheus
//       const { data } = await axios.get(prometheusUrl, {
//         params: {
//           query: encodeURIComponent(query) // ✅ Encode the query properly
//         }
      
//       });

//       console.log(data);

//       // 3) Extracting the data from Prometheus response

//       const results = data.data.result;

//       if (!Array.isArray(results) || results.length === 0) {
//         console.log("No valid data in result array.");
//         req.latency = 1;
//         return next();
//       }

//       // Let's just pick the first metric and read its value
//       const firstVal = results[0]?.value; // e.g. [1686152991.238, "1"]
//       const numericVal = parseFloat(firstVal[1]); // convert "1" to number

//       if (!firstVal || firstVal.length < 2) {
//         console.warn("Invalid latency format.");
//         req.latency = 2;
//         return next();
//       }

//       // 4) Upsert into InfluxDb
//       const point = new Point("api_performance")
//         .tag("endpoint", endpointName)
//         .floatField("latency_ms", numericVal);

//       writeApi.writePoint(point);
//       await writeApi.flush();

//       req.latency = parseFloat(firstVal[1]);;

//       next();
//     } catch (err) {
//       console.error("Error updating latency metrics:", err);
//     }
//   },

  p90Latency: async (req: Request, res: Response, next: NextFunction) => {
    console.log('p90 method in latency controller trigger')

    try {
      console.log('Inside the try in p90Latency method')
      // 1️⃣ Query Prometheus for p90 latency
      const prometheusUrl = "http://prometheus:9090/api/v1/query";
      const query = `http_api_request_duration_seconds_bucket`;

      const { data } = await axios.get(prometheusUrl, {
        timeout: 5000,
        params: { query: encodeURIComponent(query) },
      });

      console.log("Before check: ", data)

      if (!data || data.status !== "success" || !Array.isArray(data.result) || data.result.length === 0) {
        console.warn("⚠️ No valid p90 latency data from Prometheus.");
        res.status(404).json({ message: "No latency data available" });
        return;
      }

      console.log("After check: ",data)

      // 2️⃣ Extract latency value
      const firstVal = data.result[0]?.value;
      const p90Latency = firstVal ? parseFloat(firstVal[1]) : 0;

      // 3️⃣ Store in InfluxDB
      const point = new Point("api_performance")
        .tag("endpoint", "/test-latency")
        .floatField("latency_p90_ms", p90Latency);

      writeApi.writePoint(point);
      await writeApi.flush();

      console.log(`✅ Stored p90 latency: ${p90Latency}ms`);

      // 4️⃣ Respond with latency value
      res.json({
        metric: "latency_p90_ms",
        value: p90Latency,
        unit: "ms",
        source: "Prometheus",
      });

      next();

    } catch (err) {
      console.error("❌ Error fetching p90 latency:", err);
      return next();
    }
  },
  p99Latency: async (req, res, next) => {},
};
