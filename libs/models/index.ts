import mongoose from "mongoose";

import Accounts from "./src/accounts.model";
import Settings from "./src/settings.model";
import Pages from "./src/pages.model";
import Departments from "./src/departments.model";
import Doctors from "./src/doctors.model";

const { MONGOOSE_URI } = process.env;

export const dbCon = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(MONGOOSE_URI as string)
    .then(() => {
      console.log("Mongoose Connection Established");
    })
    .catch((err: Error) => console.log(err))
    .finally(() => {
      // mongoose.disconnect();
      // mongoose.connection.close();
      console.log("Mongoose Connection Closed");
    });

  return {
    Pages,
    Settings,
    Accounts,
    Departments,
    Doctors,
  };
};
