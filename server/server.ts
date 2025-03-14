import express, { ErrorRequestHandler, NextFunction, Response } from "express";
import { ServerError, UserPrometheus } from "./types/types.js";
import * as client from "prom-client";
import connectDB from "./mongoConnection.ts";
import cors from "cors";
import endpointRoutes from "./routes/endpointRoute.ts";
import metricsRoutes from "./routes/metricsRoute.ts";
import userRoutes from "./routes/userRoute.ts";

const PORT = process.env.PORT || 3001;
const app = express();

// cors configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
connectDB();

// Prometheus configuration
// const httpRequestDuration = new client.Histogram({
//   name: "http_request_duration_seconds",
//   help: "Duration of HTTP requests in seconds",
//   labelNames: ["method", "route", "status"],
//   buckets: [0.1, 0.3, 0.5, 1, 1.5, 2], // Define the bucket intervals
// });

// app.use((req: UserPrometheus, res: Response, next: NextFunction) => {
//   const stopTimer = httpRequestDuration.startTimer();
//   res.on("finish", () => {
//     stopTimer({
//       method: req.method,
//       route: req.route ? req.route.path : req.originalUrl,
//       status: res.statusCode,
//     });
//   });
//   next();
// });

// app.get("/metrics", async (_req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   res.end(await client.register.metrics());
// });
// Update the counter to include a "user" label
export const httpRequestsTotal = new client.Counter({
  name: "http_api_requests_total",
  help: "Total number of HTTP API requests",
  labelNames: ["method", "route", "status", "user"],
});

// Histogram remains the same (if needed for latency)
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2],
});

// Middleware to capture metrics for every request.
app.use((req, res, next) => {
  const stopTimer = httpRequestDuration.startTimer();
  res.on("finish", () => {
    // Get the user label from req.user if available; default to "anonymous"
    const userLabel = (req as any).user && (req as any).user.username 
      ? (req as any).user.username 
      : "anonymous";
    
    // Record latency
    stopTimer({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode,
    });
    // Increment the total request counter with user label
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode.toString(),
      user: userLabel,
    });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Routes
app.use("/api", endpointRoutes);
app.use("/api", metricsRoutes);
app.use("/api", userRoutes);


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

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
