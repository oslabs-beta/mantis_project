import express, { ErrorRequestHandler, Response } from "express";
import { InfluxDB, WriteApi, Point } from "@influxdata/influxdb-client";
import { ServerError } from "../types/types.js";
import { latencyController } from "./controllers/latencyController.js";
import { CustomRequest } from "../types/types";
import * as client from "prom-client";

const PORT = process.env.PORT || 3001;
const INFLUX_URL = "http://influxdb:8086";
const INFLUX_TOKEN = "supersecret";
const ORG = "MainOrg";
const BUCKET = "myBucket";
const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const writeApi = influxDB.getWriteApi(ORG, BUCKET, "ns");

const app = express();
app.use(express.json());
// in server.ts or a test route file:

// const httpRequestDuration = new client.Histogram({
//   name: "http_request_duration_seconds",
//   help: "Duration of HTTP requests in seconds",
//   labelNames: ["method", "route", "status"],
//   buckets: [0.1, 0.3, 0.5, 1, 1.5, 2] // choose whatever buckets make sense
// });

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2], // Define the bucket intervals
});

// // Collect default metrics, e.g. CPU, memory, etc. (optional)
// client.collectDefaultMetrics();

// app.use((req, res, next) => {
//   const stopTimer = httpRequestDuration.startTimer();
//   res.on("finish", () => {
//     // For example, label with route + method + status:
//     stopTimer({
//       method: req.method,
//       route: req.route?.path || req.url, 
//       status: res.statusCode
//     });
//   });
//   next();
// });

app.use((req, res, next) => {
  const stopTimer = httpRequestDuration.startTimer();
  res.on("finish", () => {
    stopTimer({ method: req.method, route: req.route?.path || req.url, status: res.statusCode });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/p90", latencyController.p90Latency);

// app.get("/test-latency", latencyController.p50Latency, async (req: CustomRequest, res: Response) => {
//   try {
//     const latency = req.latency;
//     res.set("Content-Type", "text/plain"); 
//         res.send(`# HELP api_latency_ms Latency metrics for API requests\n` +
//                  `# TYPE api_latency_ms gauge\n` +
//                  `api_latency_ms ${latency}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error");
//   }
// });
// Testing if DB its receving data and save it
// app.post("/track-metrics", async (req, res) => {
//   try {
//     const { endpoint, latency, status } = req.body;

//     const point = new Point("api_performance")
//       .tag("endpoint", endpoint)
//       .floatField("latency_ms", latency)
//       .intField("status_code", status);

//     writeApi.writePoint(point);
//     await writeApi.flush();

//     res.status(200).send("Metric saved in InfluxDB");
//   } catch (error) {
//     console.error("Error writing to InfluxDB:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//Global error handler

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export { influxDB, writeApi };
