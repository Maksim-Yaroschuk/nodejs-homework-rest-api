const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
// const { use } = require("../routes/api/authRouter");

const userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.status(409).json({ message: "Email in use" });
    }
    next(error);
  }
  return res.status(201).json({
    user: {
      _id: user._id,
    },
  });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    message: users,
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  return res.status(200).json({
    token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "15m" }),
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  userSignup,
  getAllUsers,
  userLogin,
};
