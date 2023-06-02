import { Request, Response, NextFunction } from "express";

import { Greeting } from "./greeting";
import { dbCon } from "./models";
import ejsHelper from "./ejs-helper";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.domain = process.env.DOMAIN || "http://localhost:3001/";
  const { Settings, Pages } = await dbCon();
  await Settings.findOne({
    appname: "NOHE",
  })
    .then(async (settings) => {
      res.locals.settings = settings;
      res.locals.greeting = Greeting();
      res.locals.ejsHelper = ejsHelper;
      res.locals.domain = settings.siteDomain;
      // list all home pages for menu
      await Pages.find({
        disable: false,
        isDraft: false,
        delete: false,
        parent: "home",
      })
        .sort({ createdAt: -1 })
        .then(async (allPages) => {
          res.locals.allPages = allPages;
          /**
           * @todo
           * list all sub pages for menu
           * @example
           * const subPages = [];
           */
          let subPages = [];
          for (let i = 0; i < allPages.length; i++) {
            const page: any = allPages[i];
            const children: any = await Pages.find({
              parent: page._id,
            });
            //console.log(children);
            subPages[page._id] = children;
          }
          res.locals.subPages = subPages;

          // list footer1 and footer2 pages
          await Pages.find({
            disable: false,
            isDraft: false,
            delete: false,
            addToFooter1: true,
          })
            .then(async (footer1Pages) => {
              res.locals.footer1Pages = footer1Pages;
              await Pages.find({
                disable: false,
                isDraft: false,
                delete: false,
                addToFooter2: true,
              })
                .then(async (footer2Pages) => {
                  res.locals.footer2Pages = footer2Pages;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.locals.settings = {
        appname: "National Orthopedic Hospital, Enugu.",
        domain: "http://localhost:3001/",
        title: "National Orthopedic Hospital, Enugu.",
        description:
          "National Orthopaedic Hospital, Enugu is a federal government of Nigeria speciality hospital located in Enugu, Enugu State, Nigeria.",
      };
    });
  next();
};

export default middleware;
