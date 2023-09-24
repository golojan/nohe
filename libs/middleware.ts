import { Request, Response, NextFunction } from "express";

import { Greeting } from "./greeting";
import { dbCon } from "./models";
import ejsHelper from "./ejs-helper";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const { Settings, Pages, Departments } = await dbCon();

  const servicePages = await Pages.find({
    disable: false,
    isDraft: false,
    delete: false,
    pageType: "service",
  }).sort({ sort: 1 });

  const departmentPages = await Pages.find({
    disable: false,
    isDraft: false,
    delete: false,
    pageType: "department",
  }).sort({ sort: 1 });

  const doctorPages = await Pages.find({
    disable: false,
    isDraft: false,
    delete: false,
    pageType: "doctor",
  }).sort({ sort: 1 });

  res.locals.servicePages = servicePages;
  res.locals.departmentPages = departmentPages;
  res.locals.doctorPages = doctorPages;

  await Settings.findOne({
    appname: "NOHE",
  })
    .then(async (settings) => {
      res.locals.settings = settings;
      res.locals.greeting = Greeting();
      res.locals.ejsHelper = ejsHelper;
      res.locals.domain = process.env.DOMAIN || "http://localhost:3001/";
      // list all home pages for menu
      await Pages.find({
        disable: false,
        isDraft: false,
        delete: false,
        parent: "home",
        pageType: "page",
      })
        .sort({ sort  : 1	  })
        .then(async (allPages) => {
          res.locals.allPages = allPages;
          let subPages = [];
          for (let i = 0; i < allPages.length; i++) {
            const page: any = allPages[i];
            const children: any = await Pages.find({
              parent: page.slug,
            });
            subPages[page.slug] = children;
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
                  // list all departments
                  await Departments.find({})
                    .sort({ createdAt: -1 })
                    .then(async (allDepartments) => {
                      res.locals.allDepartments = allDepartments;
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
        });
    })
    .catch((err) => {
      console.log(err);
      res.locals.settings = {
        appname: "National Orthopedic Hospital, Enugu.",
        domain: process.env.DOMAIN || "http://localhost:3001/",
        title: "National Orthopedic Hospital, Enugu.",
        description:
          "National Orthopaedic Hospital, Enugu is a federal government of Nigeria speciality hospital located in Enugu, Enugu State, Nigeria.",
      };
    });
  next();
};

export default middleware;
