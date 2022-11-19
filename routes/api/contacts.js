const express = require("express");
const {
  getContactByID,
  getAllContacts,
  addContact,
  removeContactById,
  updateContact,
} = require("../../controllers/contactsControllers");

const { tryCatchWrapper } = require("../../helpers");

const {
  addContactSchema,
  changeContactSchema,
} = require("../middleware/validationSchemes");
const { validation } = require("../middleware/validationBody");

const router = express.Router();

router.get("/", tryCatchWrapper(getAllContacts));

router.get("/:contactId", tryCatchWrapper(getContactByID));

router.post("/", validation(addContactSchema), tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContactById));

router.put("/:contactId", validation(changeContactSchema), tryCatchWrapper(updateContact));

module.exports = router;
