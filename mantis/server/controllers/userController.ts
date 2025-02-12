import { InfluxDB } from "@influxdata/influxdb-client";
import {
  UsersAPI,
  PostUsersRequest,
  OrgsAPI,
  BucketsAPI,
  AuthorizationsAPI,
  PostBucketRequest,
  AuthorizationPostRequest,
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
const JWT_SECRET = process.env.JWT_SECRET!;
const ORG_ID = process.env.INFLUX_ORG_ID || "3ac2a3157de776b5";
const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const usersApi = new UsersAPI(influxDB);
const bucketsApi = new BucketsAPI(influxDB);
const authApi = new AuthorizationsAPI(influxDB);

// const writeApi = influxDB.getWriteApi(ORG, BUCKET, "ns");

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

      // // const createUserReq: PostUsersRequest = { name: username };
      // // const createdUser = await usersApi.postUsers(createUserReq);
      // const createUserReq = { name: username } as any;
      // const createdUser = await usersApi.postUsers({ body: createUserReq });

      // console.log("Influx created user:", createdUser);

      // // 3. Optional: set a password for them in Influx so they can log in to UI
      // // If you don't care about password-based UI logins, skip.
      // await usersApi.postUsersIDPassword({
      //   userID: createdUser.id as string,
      //   body: { password: password as string },
      // });

      const orgID = ORG_ID;

      // 4. Create a new bucket for this user (optional step).
      // If you want each user to have a personal bucket, do so:
      const bucketName = `bucket_${username}`;
      const createBucketReq: PostBucketRequest = {
        orgID,
        name: bucketName,
        retentionRules: [],
      };
      const createdBucket = await bucketsApi.postBuckets({ body: createBucketReq });

      console.log("Created bucket:", createdBucket);

      const permissions = [
        {
          action: "read" as const,
          resource: { type: "buckets" as const, orgID, id: createdBucket.id },
        },
        {
          action: "write" as const,
          resource: { type: "buckets" as const, orgID, id: createdBucket.id },
        },
      ];

      const createAuthReq: AuthorizationPostRequest = {
        orgID,
        description: "User token for " + username,
        // userID: createdUser.id,
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

      // Look up in Mongo
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // If valid, create a JWT (for your app)
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
        // We could return the user's Influx token as well,
        // if we want them to write data from the client side.
        // But typically you'd keep it server-side to do writes on their behalf.
      });
    } catch (error) {
      console.error("Error logging user in:", error);
      return next(error);
    }
  },
};

export { influxDB };
