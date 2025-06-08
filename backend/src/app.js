import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { globalLimiter } from "./utils/rateLimiter.js";
// import { verifyToken } from "./middlewares/auth.middleware.js";

import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
console.log("SDGSFDVSDGS___0001"+process.env.FRONTEND_URL);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods:['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "400kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "400kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1", projectRouter);
app.all("/", async(req,res)=>{
  return res.send("BACKEND is Running...");
})



app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});
export default app;