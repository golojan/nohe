import express, { Application, Request, Response } from "express";
const server: Application = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { dbCon } from "./libs/models";

import middleware from "./libs/middleware";

import cookieParser from "cookie-parser";
import helmet from "helmet";

import ejs from "ejs";
ejs.delimiter = "%";

server.use(cors());
server.use(express.json({ limit: "25mb" }));
server.use(express.urlencoded({ extended: false, limit: "50mb" }));

// cookie parser
server.use(cookieParser());

// ejs // set view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// static files
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "public", "assets")));

// middleware
server.use(middleware);

// set API routes
server.get("/", async (req: Request, res: Response) => {
  await res.render("index", {
    title: "Home",
  });

  // // get host
  // if (process.env.NODE_ENV === "production") {
  //   await res.render("working", {
  //     title: "Home",
  //   });
  // } else {
  //   await res.render("index", {
  //     title: "Home",
  //   });
  // }
});

// Pages
server.get("/pages/:slug", async (req: Request, res: Response) => {
  // get page info
  const { Pages } = await dbCon();
  await Pages.findOne({
    slug: req.params.slug,
  })
    .then(async (page) => {
      if (page) {
        // count children
        const children = await Pages.find({
          parent: page._id,
        }).countDocuments();

        await res.render("page", {
          title: page.title,
          description: page.description,
          pageInfo: page,
          pageContent: page.content,
          children: children ? children : [],
        });
      } else {
        await res.render("404", {
          title: "Page not found",
        });
      }
    })
    .catch(async (err) => {
      console.log(err);
      await res.render("404", {
        title: "Page not found",
      });
    });
});

//Listen to port
const port = process.env.PORT || 3001;
server.listen(port, async () => {
  console.log(`Server http://localhost:${port}`);
});
