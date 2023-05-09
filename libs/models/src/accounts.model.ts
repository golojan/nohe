import mongoose, { Document } from "mongoose";

mongoose.Promise = global.Promise;

const accountsScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      default: "/images/avatar/user.png",
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: String,
    street: String,
    city: String,
    lga: String,
    state: String,
    zip: String,
    country: {
      type: String,
      default: "Nigeria",
    },
    enable_otp: String,
    otp: String,
    password: String,
    enabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "USER",
    },
    smsNotification: {
      type: Boolean,
      default: false,
    },
    emailNotification: {
      type: Boolean,
      default: false,
    },
    smsBalance: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Accounts) {
  delete mongoose.models.Accounts;
}

const Accounts =
  mongoose.models.Accounts || mongoose.model("Accounts", accountsScheme);
export default Accounts;
