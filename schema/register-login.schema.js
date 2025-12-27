const { required, string, any } = require("joi");
const { Schema, model } = require("mongoose");
const { validate } = require("./book.schema");

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      unique: [true, "Bunaqa username bor"],
      match: [/^[a-zA-Z0-9_]+$/, "faqat harflardan iborat bolsin"],
    },
    email: {
      type: String,
      required: [true, "Email majburiy"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Email notogri formatda (masalan: name@gmail.com)",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Parol kamida 8 ta harfdan iborat bolsin"],
    },

    role: {
      type: String,
      set: value => value.toLowerCase(),
      enum: {
        values: ["superadmin", "admin", "user"],
        message: `{VALUE} bunday qiyamt qabul qilinmaydi`
      },
      default: "user"
    },
    otp: {
      type: String,
      default: null
    },
   isVerified: {
    type: Boolean,
    default: false
   },
   otpTime: {
    type: String,
    default: null
   }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchema = model("User", user);

module.exports = UserSchema;