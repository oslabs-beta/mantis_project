import { InfluxDB } from "@influxdata/influxdb-client";
import {
  BucketsAPI,
  AuthorizationsAPI,
} from "@influxdata/influxdb-client-apis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel";
import { IUser, UserController } from "../types/types";

dotenv.config();

const INFLUX_URL = "http://influxdb:8086";
const INFLUX_TOKEN = "supersecret";
const ORG = "MainOrg";
const ORG_ID = process.env.INFLUX_ORG_ID || "3ac2a3157de776b5";
const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const bucketsApi = new BucketsAPI(influxDB);
const authApi = new AuthorizationsAPI(influxDB);

export const userController: UserController = {
  createNewUser: async (req: any, res: any, next: any) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        console.error("Username or Password missing");
        next();
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
      const createdBucket = await bucketsApi.postBuckets({
        body: createBucketReq,
      });
      console.log("Created bucket:", createdBucket);

      const permissions = [
        {
          action: "read" as const,
          resource: { type: "buckets" as const, orgID: ORG_ID, id: createdBucket.id },
        },
        {
          action: "write" as const,
          resource: { type: "buckets" as const,orgID: ORG_ID, id: createdBucket.id },
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

      const user: IUser = new User({
        username,
        password,
        influxToken: userToken,
        bucket: bucketName,
      });
      await user.save();

      return res.status(200).json({
        message: "User created succesfully",
        username,
        bucket: bucketName,
        influxToken: userToken,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return next();
    }
  },

  loginUser: async (req: any, res: any, next: any) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res
            .status(400)
            .json({ error: "Username and password are required." });
        }
  
        // Look up the user in Mongo
        const user = await User.findOne({ username });
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
          { expiresIn: "2h" }
        );
  
        return res.status(200).json({
          message: "Logged in successfully",
          token,
          user: {
            _id: user._id,
            username: user.username,
            // any additional user fields you want to return
          },
        });
      } catch (error) {
        console.error("Error logging user in:", error);
        next(error);
      }
  },
};

export { influxDB };
