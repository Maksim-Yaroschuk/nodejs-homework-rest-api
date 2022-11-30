const express = require("express");
const authRouter = express.Router();

const {
  userSignup,
  getAllUsers,
  userLogin,
} = require("../../controllers/authController");

const { tryCatchWrapper } = require("../../helpers");

const { authSchema } = require("../middleware/validationSchemes");
const { validation } = require("../middleware/validationBody");

authRouter.post("/singup", validation(authSchema), tryCatchWrapper(userSignup));
authRouter.post("/login", tryCatchWrapper(userLogin));
authRouter.get("/", tryCatchWrapper(getAllUsers));

module.exports = authRouter;
