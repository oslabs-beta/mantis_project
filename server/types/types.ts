import { Request } from "express";
import { Document } from "mongoose";

export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  influxToken: string;
  bucket: string;
  apiKey: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  token?: string;
}

export interface UserPrometheus extends Request{
  user?: {username : string}
}

