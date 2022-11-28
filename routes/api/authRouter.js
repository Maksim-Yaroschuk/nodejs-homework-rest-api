const express = require("express");
const authRouter = express.Router();

const { userSignup, getAllUsers } = require("../../controllers/authController");

const { tryCatchWrapper } = require("../../helpers");

authRouter.post("/singup", tryCatchWrapper(userSignup));
authRouter.get("/", tryCatchWrapper(getAllUsers));

module.exports = authRouter;
