const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      area: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

userSchema.statics.userLogin = async function (userEmailOrPhone, password) {
  if (!userEmailOrPhone || !password) {
    throw Error("All fields are required");
  }

  const user =
    (await this.findOne({ email: userEmailOrPhone })) ||
    (await this.findOne({ phone: userEmailOrPhone }));

  if (!user) {
    throw Error("Incorrect Email/Phone");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

userSchema.statics.register = async function (
  name,
  email,
  password,
  phone,
  address
) {
  // Validation

  if (!email || !name || !password || !phone) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong");
  }

  if (!validator.isMobilePhone(phone, "en-IN")) {
    throw Error("Phone Number not valid");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email,
    password: hash,
    phone,
    address,
  });

  return user;
};
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
