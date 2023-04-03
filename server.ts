import express, { Application, Request, Response } from "express";
const server: Application = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import middleware from "./libs/middleware";

import cookieParser from "cookie-parser";
import helmet from "helmet";

import ejs from "ejs";
ejs.delimiter = "%";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

server.use(cors());
server.use(helmet());
server.use(express.json({ limit: "25mb" }));
server.use(express.urlencoded({ extended: false, limit: "50mb" }));

// cookie parser
server.use(cookieParser());

// set public folder
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "public", "assets")));

// ejs // set view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// middleware
server.use(middleware);

// set API routes
server.get("/", async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === "production") {
    res.render("working");
  } else {
    res.render("index");
  }
});

//Listen to port
const port = process.env.PORT || 3001;
server.listen(port, async () => {
  console.log(`Server http://localhost:${port}`);
  await prisma
    .$connect()
    .then(() => console.log("Database connected"))
    .catch((error: Error) => console.log(error));
});
