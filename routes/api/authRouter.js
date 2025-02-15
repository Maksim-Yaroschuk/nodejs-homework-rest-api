const express = require("express");
const authRouter = express.Router();

const {
  userSignup,
  getAllUsers,
  userLogin,
  userLogout,
  userCurrent,
  userChangeAvatar,
  userVerify,
  userRepeatVerify,
} = require("../../controllers/authController");

const { tryCatchWrapper } = require("../../helpers");

const { authSchema, emailSchema } = require("../middleware/validationSchemes");
const { validation } = require("../middleware/validationBody");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

authRouter.post("/singup", validation(authSchema), tryCatchWrapper(userSignup));
authRouter.post("/login", validation(authSchema), tryCatchWrapper(userLogin));
authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(userLogout));
authRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(userCurrent));
authRouter.get("/", tryCatchWrapper(getAllUsers));
authRouter.post("/avatars", tryCatchWrapper(auth), tryCatchWrapper(upload.single("avatar")), tryCatchWrapper(userChangeAvatar));
authRouter.get("/verify/:verificationToken", tryCatchWrapper(userVerify));
authRouter.post("/verify", validation(emailSchema), tryCatchWrapper(userRepeatVerify));

module.exports = authRouter;
