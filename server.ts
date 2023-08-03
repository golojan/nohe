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

// set ejs tags
import ejs from "ejs";
ejs.delimiter = "?";

server.use(cors());
server.use(express.json({ limit: "25mb" }));
server.use(express.urlencoded({ extended: false, limit: "50mb" }));
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

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
  res.render("index", {
    title: "N.O.H - Enugu State",
    pageSlug: "home",
    parentSlug: "home",
    childSlug: "home",
    hasChildren: 0,
  });
});

// Pages
server.get("/pages/:slug", async (req: Request, res: Response) => {
  // get page info
  const { Pages } = await dbCon();
  await Pages.findOne({
    slug: req.params.slug,
  })
    .then(async (page: any) => {
      if (page) {
        // count children
        const countChildren: number = await Pages.find({
          parent: page.slug,
        }).countDocuments();
        const children = await Pages.find({
          parent: page.slug,
        }).sort({ createdAt: -1 });
        await res.render("page", {
          title: page.title,
          description: page.description,
          pageInfo: page,
          parent: page,
          pageId: page._id,
          pageContent: page.content,
          hasChildren: Number(countChildren),
          children: countChildren > 0 ? children : [],
          parentSlug: page.parent,
          pageSlug: page.slug,
          childSlug: page.slug,
        });
      } else {
        await res.render("404", {
          title: "Page not found",
        });
      }
    })
    .catch(async (err: any) => {
      console.log(err);
      await res.render("404", {
        title: "Page not found",
      });
    });
});

// Pages
server.get("/pages/:slug/:child", async (req: Request, res: Response) => {
  // get page info
  const { Pages } = await dbCon();
  await Pages.findOne({
    slug: req.params.child,
  })
    .then(async (page: any) => {
      if (page) {
        // count children
        const countChildren: number = await Pages.find({
          parent: page.parent,
        }).countDocuments();
        const children = await Pages.find({
          parent: page.parent,
        }).sort({ createdAt: -1 });
        const parentInfo = await Pages.findOne({
          slug: page.parent,
        });

        await res.render("page", {
          title: page.title,
          description: page.description,
          pageInfo: page,
          pageId: page._id,
          parent: parentInfo,
          pageContent: page.content,
          hasChildren: Number(countChildren),
          children: countChildren > 0 ? children : [],
          parentSlug: parentInfo.slug,
          pageSlug: page.slug,
          childSlug: page.slug,
        });
      } else {
        await res.render("404", {
          title: "Page not found",
        });
      }
    })
    .catch(async (err: any) => {
      console.log(err);
      await res.render("404", {
        title: "Page not found",
      });
    });
});

// Pages
server.get("/crons/delete-pages", async (req: Request, res: Response) => {
  // delete page
  const { Pages } = await dbCon();
  await Pages.deleteMany({
    delete: true,
  })
    .then(async (page: any) => {
      await res.send("done");
    })
    .catch(async (err: any) => {
      console.log(err);
      await res.send("error");
    });
});

// Pages
server.get("/forms/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;
  res.render(`${slug}`, {
    title: "Home",
  });
});

//Listen to port
const port = process.env.PORT || 3001;
server.listen(port, async () => {
  console.log(`Server http://localhost:${port}`);
});
