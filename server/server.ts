import express, { ErrorRequestHandler, NextFunction, Response } from "express";
import { ServerError, UserPrometheus } from "./types/types.js";
import * as client from "prom-client";
import connectDB from "./mongoConnection.ts";
import cors from "cors";
import endpointRoutes from "./routes/endpointRoute.ts";
import metricsRoutes from "./routes/metricsRoute.ts";
import userRoutes from "./routes/userRoute.ts";
import { loginAndStoreToken, triggerEndpoint, userToken, triggerErrors } from "./controllers/automation.ts";
// import { set } from "mongoose";

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
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2], // Define the bucket intervals
});

app.use((req: UserPrometheus, res: Response, next: NextFunction) => {
  const stopTimer = httpRequestDuration.startTimer();
  res.on("finish", () => {
    stopTimer({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode,
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


// // Log in once at startup
// loginAndStoreToken().then(() => {
//   console.log("✅ Background job initialized. Using token:", userToken);
// });

// // Run main traffic endpoints every 40s
// setInterval(() => {
//   console.log("🔁 Triggering endpoints with token:", userToken);
//   const endpoints = ["payment", "order", "user", "travel"];
//   endpoints.forEach((endpoint) => triggerEndpoint(endpoint));
// }, 40000);;

// // Run lower-priority endpoints every 120s
// setInterval(() => {
//   const extraEndpoints = ["createUser", "dashboard", "login1", "home", "payment_card"];
//   extraEndpoints.forEach((endpoint) => triggerErrors(endpoint)); // Pass each endpoint
// }, 60000);

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

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
