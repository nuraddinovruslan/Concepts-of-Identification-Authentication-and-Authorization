const { required } = require("joi");
const { Schema, model } = require("mongoose");
const { validate } = require("./book.schema");

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      unique: [true, "Bunaday username avval kiritilgan"],
      match: [/^[a-zA-Z0-9_]+$/, "faqat harf kiriting"],
    },
    email: {
      type: String,
      required: [true, "Email majburiy"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Email notogri formatda (masalan: test@gmail.com)",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Parol kamida 8 ta harfdan iborat bolsin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchema = model("User", user);

module.exports = UserSchema;