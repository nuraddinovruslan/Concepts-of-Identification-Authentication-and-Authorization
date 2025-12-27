
const UserSchema = require("../schema/register-login.schema");
const CustomErrorHandle = require("../utils/custom-error-handler");
const bcryptjs = require("bcryptjs");
const emailSenderr = require("../utils/email.senderr");
const { now } = require("mongoose");
const customErrorHandler = require("../utils/custom-error-handler");
const { date } = require("joi");
const { AccessToen, refreshToken } = require("../utils/token-generator");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw CustomErrorHandle.UnAuhtorized(
        "Username, email, password are required!"
      );
    }

    const foundedEmail = await UserSchema.findOne({ email });

    if (foundedEmail) {
      throw CustomErrorHandle.BadRequest("Email alredy exist!");
    }

    const foundedusername = await UserSchema.findOne({ username });

    if (foundedusername) {
      throw CustomErrorHandle.BadRequest("Username already exist!");
    }

    const hash = await bcryptjs.hash(password, 12);

    const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")
    const time = Date.now() + 120000

    await UserSchema.create({
      username,
      email,
      password: hash,
      otp: randomNumbers,
      otpTime: time
    })

    await emailSenderr(randomNumbers, email)

    res.status(201).json({
      message: "Register successful!",
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    const foundedUser = await UserSchema.findOne({ email })

    if (!foundedUser) {
      throw customErrorHandler.UnAuthorized("user not found")
    }

    const time = Date.now()
    if (foundedUser.otpTime < time) {
      throw customErrorHandler.UnAuthorized("Otp time expired")
    }

    if (foundedUser.otp !== otp) {
      throw customErrorHandler.BadRequest("wrong otp")
    }

    await UserSchema.findByIdAndUpdate(foundedUser._id, { isVerified: true, otpTime: null, otp: null })

    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id
    }

    const access_token = AccessToen(payload)
    const refresh_token = refreshToken(payload)

    res.cookie("access_token", access_token, { httpOnly: true, maxAge: 100 * 60 * 15 })

    res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: 3600 * 1000 * 24 * 15 })

    res.status(200).json({
      message: "success",
      access_token
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await UserSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandle.UnAuthorized("User not found");
    }

    const compare = await bcryptjs.compare(password, foundedUser.password)

    if (compare && foundedUser.isVerified) {
      const payload = {
        username: foundedUser.username,
        email: foundedUser.email,
        role: foundedUser.role,
        id: foundedUser._id
      }

      const access_token = AccessToen(payload)
      const refresh_token = refreshToken(payload)

      res.cookie("access_token", access_token, { httpOnly: true, maxAge: 100 * 60 * 15 })

      res.cookie("access_token", refresh_token, { httpOnly: true, maxAge: 3600 * 1000 * 24 * 15 })

      res.status(200).json({
        message: "success",
        access_token
      })
    } else {
      throw customErrorHandler.UnAuthorized("invalid password")
    }

  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
  } catch (error) {
    next(error);
  }
};


module.exports = {
  register,
  login,
  verify,
  logout
}
