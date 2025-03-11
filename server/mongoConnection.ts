import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI from env:", process.env.MONGO_URI)

const MONGO_URL = process.env.MONGO_URI;

console.log(MONGO_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
