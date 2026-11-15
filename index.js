import express from "express";
const app = express();
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/user.route.js";
import { configDotenv } from "dotenv";
configDotenv();

// parse the req.body
app.use(express.json());
// connect to database.
mongoose
  .connect(process.env.mongoDB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.use("/", (req, res) => {
//   res.send("hiii");
// });
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is starting at port ${process.env.PORT}`);
});
