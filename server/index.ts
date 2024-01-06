import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { authRouter } from "./routes/auth/router";
import { userRouter } from "./routes/user/router";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));



mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to MongoDB"));


//route
app.use("/v1/auth", authRouter);
app.use('/user', userRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//authentication

//authorization
