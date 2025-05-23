import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter, userPrefix } from "./routes/user.js";
import { mainRouter } from "./routes/main.js";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const mongoURL = "mongodb://localhost:27017/my-database";

mongoose.connect(mongoURL)
  .then(() => {
  console.log('connected successfully ✅')
  })
  .catch((err) => {
    console.log('failed connection ❌', err);
  })

app.use(userPrefix, userRouter);

app.use("/", mainRouter);

// Launch the server, start listening to events
app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});

export default app;
