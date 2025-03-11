import { InfluxDB } from "@influxdata/influxdb-client";
import {
  BucketsAPI,
  AuthorizationsAPI,
} from "@influxdata/influxdb-client-apis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel";
import { IUser } from "../types/types";
import { Response, NextFunction, RequestHandler, Request } from "express";
import crypto from 'crypto';

dotenv.config();

const INFLUX_URL = process.env.INFLUX_URL as string;
const INFLUX_TOKEN = process.env.INFLUX_TOKEN as string;
const ORG_ID = process.env.INFLUX_ORG_ID as string;  

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const bucketsApi = new BucketsAPI(influxDB);
const authApi = new AuthorizationsAPI(influxDB);


export const createNewUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      console.error("Email, username or password missing");
      return next(); // Ensure you exit after calling next
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const bucketName = `bucket_${username}`;
    const createBucketReq = {
      orgID: ORG_ID,
      name: bucketName,
      retentionRules: [],
    };
    const createdBucket = await bucketsApi.postBuckets({ body: createBucketReq });
    console.log("Created bucket:", createdBucket);

    const permissions = [
      {
        action: "read" as const,
        resource: { type: "buckets" as const, orgID: ORG_ID, id: createdBucket.id },
      },
      {
        action: "write" as const,
        resource: { type: "buckets" as const, orgID: ORG_ID, id: createdBucket.id },
      },
    ];

    const createAuthReq = {
      orgID: ORG_ID,
      description: `Token for ${username}`,
      permissions,
    };
    const newAuth = await authApi.postAuthorizations({ body: createAuthReq });
    console.log("Created authorization:", newAuth);

    const userToken = newAuth.token;

    // Generate a secure API key
    const apiKey = crypto.randomBytes(32).toString('hex');

    const user: IUser = new User({
      email,
      username,
      password, // Ensure you hash the password in a real application!
      influxToken: userToken,
      bucket: bucketName,
      apiKey, // Store the generated API key
    });
    await user.save();

    // Set the new user data on res.locals for further middleware processing
    return res.status(200).json( {
      message: "User created successfully",
      username,
      email,
      bucket: bucketName,
      influxToken: userToken,
      apiKey,
    });
    
  } catch (error) {
    console.error("Error creating user:", error);
    return next(error);
  }
};

export const loginUser: RequestHandler  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res
            .status(400)
            .json({ error: "Username and password are required." });
        }
  
        // Look up the user in Mongo
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: "Invalid username or password." });
        }
  
        // Compare the plain-text password to the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ error: "Invalid username or password." });
        }
  
        // Create a JWT for your application
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET || "fallback_secret",
          { expiresIn: "96h" }
        );

        console.log("Logged in successfully with token:", token);
  
        return res.status(200).json({
          message: "Logged in successfully",
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            bucket: user.bucket,

            // any additional user fields you want to return
          },
        });
      } catch (error) {
        console.error("Error logging user in:", error);
        next(error);
      }
  };


export { influxDB };
