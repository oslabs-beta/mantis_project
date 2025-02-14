import express, { ErrorRequestHandler, Response } from "express";
import { ServerError } from "./types/types.js";
import { trafficController } from "./controllers/trafficController.ts";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import { userController} from "./controllers/userController.ts";
import * as client from "prom-client";
import connectDB from "./mongoConnection.ts";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
connectDB();

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2], // Define the bucket intervals
});

app.use((req, res, next) => {
  const stopTimer = httpRequestDuration.startTimer();
  res.on('finish', () => {
    stopTimer({
     
      method: req.method,
     
      route: req.route?.path || req.url,
     
      status: res.statusCode,
   ,
    });
  });
  next();
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/rps", authMiddleware, trafficController.rps);
app.post("/create-user", userController.createNewUser);
app.post("/login", userController.loginUser);

//Global error handler

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
