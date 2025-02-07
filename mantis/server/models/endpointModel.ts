// models/Endpoint.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ILatency {
  timestamp: Date;
  p50: number;
  p90: number;
  p99: number;
}

interface IEndpoint extends Document {
  name: string;               // e.g., "get-mocking1"
  method: string;             // GET, POST, etc.
  latencyStats: ILatency[];   // store time‐series of latencies
  error4xxCount: number;
  error5xxCount: number;
  rps: number;                // requests per second
  // ... other fields as needed
}

const LatencySchema = new Schema<ILatency>({
  timestamp: { type: Date, default: Date.now },
  p50: { type: Number, required: true },
  p90: { type: Number, required: true },
  p99: { type: Number, required: true }
});

const EndpointSchema = new Schema<IEndpoint>({
  name: { type: String, required: true },
  method: { type: String, required: true },
  latencyStats: [LatencySchema],
  error4xxCount: { type: Number, default: 0 },
  error5xxCount: { type: Number, default: 0 },
  rps: { type: Number, default: 0 }
  // ...
});

export const Endpoint = mongoose.model<IEndpoint>('Endpoint', EndpointSchema);
