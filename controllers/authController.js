const { User } = require("../models/usersModel");

const userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.status(409).json({ message: "Email in use" });
    }
    next(error);
  }
  return res.status(201).json({ user });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    message: users,
  });
};

module.exports = {
  userSignup,
  getAllUsers,
};
