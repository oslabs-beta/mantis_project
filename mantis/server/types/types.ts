import { Request } from "express";
import { Document } from "mongoose";

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

export interface TrafficController {
  rps: (req: any, res: any, next: any) => Promise<void>;
  trafficEndpoint: (req: any, res: any, next: any) => Promise<void>;
}

export interface UserController {
  createNewUser: (req: any, res: any, next: any) => Promise<void>;
  loginUser: (req: any, res: any, next: any) => Promise<void>;
}

export interface IUser extends Document {
  username: string;
  password: string;
  influxToken: string;
  bucket: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}