const express = require("express");
const {
  postAddContact,
  putChangeContact,
  // getContacts,
  getContactByID,
  deleteContact,
  getAllContacts,
} = require("../../controllers/contactsControllers");

const { tryCatchWrapper } = require("../../helpers");

const {
  addContactSchema,
  changeContactSchema,
} = require("../middleware/validationSchemes");
const { validation } = require("../middleware/validationBody");

const router = express.Router();

router.get("/", tryCatchWrapper(getAllContacts));

router.get("/:contactId", getContactByID);

router.post("/", validation(addContactSchema), postAddContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validation(changeContactSchema), putChangeContact);

module.exports = router;
