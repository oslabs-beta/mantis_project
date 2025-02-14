import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User from "../models/userModel";
import { AuthenticatedRequest } from "../types/types"; // Import the extended request type

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/, "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user; // Now TypeScript recognizes `user`
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


