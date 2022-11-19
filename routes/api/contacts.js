const express = require("express");
const {
  // postAddContact,
  // putChangeContact,
  // getContacts,
  getContactByID,
  // deleteContact,
  getAllContacts,
  addContact,
  removeContactById,
} = require("../../controllers/contactsControllers");

const { tryCatchWrapper } = require("../../helpers");

const {
  addContactSchema,
  // changeContactSchema,
} = require("../middleware/validationSchemes");
const { validation } = require("../middleware/validationBody");

const router = express.Router();

router.get("/", tryCatchWrapper(getAllContacts));

router.get("/:contactId", tryCatchWrapper(getContactByID));

router.post("/", validation(addContactSchema), tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContactById));

// router.put("/:contactId", validation(changeContactSchema), putChangeContact);

module.exports = router;
