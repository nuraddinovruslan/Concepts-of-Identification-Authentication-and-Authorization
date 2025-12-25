
const UserSchema = require("../schema/register-login.schema");
const CustomErrorHandle = require("../utils/custom-error-handler");
const bcryptjs = require("bcryptjs");

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

    await UserSchema.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "Register successful!",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw CustomErrorHandle.UnAuhtorized("Email, password are required!");
    }

    const foundedUser = await UserSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandle.BadRequest("Email or password is incorrect!");
    }

    const decode = await bcryptjs.compare(password, foundedUser.password)

       if (!decode) {
      throw CustomErrorHandle.BadRequest("Email or password is incorrect!");
    }


   if(decode){
    const payload = {
        id: foundedUser._id,
        email: foundedUser.email
    }
    const token = tokengenerator(payload)

    res.status(200).json({
        message: "Login succesful",
        token
    })
   } else {
    res.status(401).json({
        message: "Wrong password!"
    })
   }
  } catch (error) {
    next(error);
  }
};


module.exports = {
    register,
    login
}
