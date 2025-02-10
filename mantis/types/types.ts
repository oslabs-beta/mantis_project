import { Request } from "express";

export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface LatencyController {
  p50Latency: (req: any, res: any, next: any) => Promise<void>;
  p90Latency: (req: any, res: any, next: any) => Promise<void>;
  p99Latency: (req: any, res: any, next: any) => Promise<void>;
}

export interface CustomRequest extends Request {
  latency?: number; // Make it optional to prevent errors
}