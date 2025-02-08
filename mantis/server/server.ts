import express, { ErrorRequestHandler } from "express";
import { InfluxDB, WriteApi, Point } from "@influxdata/influxdb-client";
import { ServerError } from "../types/types.js";
import { updateLatencyMetrics } from "./controllers/latencyController.js";

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

app.get("/test-latency", async (req, res) => {
  try {
    await updateLatencyMetrics();
    res.send(updateLatencyMetrics());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

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
