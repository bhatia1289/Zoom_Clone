import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const start = async () => {
  app.set("mongo_user");
  const connectionDB = await mongoose.connect(
    "mongodb+srv://abhishek:abhishek9950@cluster0.nfmolwd.mongodb.net/"
  );
  console.log("MONGO CONNECTED");
  server.listen(app.get("PORT"), () => {
    console.log("LISTENING ON PORT 8000");
  });
};

start();
