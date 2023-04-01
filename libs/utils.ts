import { NextFunction, Response, Request } from "express";
const jwtSecret: string = process.env.JWT_SECRET || "NOHE_ENUGU";

// Convert MongoDb date to Full Date
export function convertMongoDateToFullDate(date: Date) {
  return new Date(date).toDateString();
}

// number to Naira
export function numberToNaira(number: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
}

// middleware to test if authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

// convert title to slug
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
