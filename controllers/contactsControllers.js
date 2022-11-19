const { Contact } = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  return res.status(200).json({
    message: contacts,
  });
};

const addContact = async (req, res, next) => {
  const createdContact = await Contact.create(req.body);
  return res.status(201).json({ message: createdContact });
};

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    await Contact.findByIdAndDelete(contactId);
    return res.status(200).json({ message: `${contact.name} deleted` });
  }
  return res.status(404).json({ message: "Contact not found" });
};

const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    return res.status(200).json({ message: contact });
  }
  return res.status(404).json({ message: "Contact not found" });
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    await Contact.findByIdAndUpdate(contactId, req.body);
    return res.status(200).json({ message: `${contact.name} was updated` });
  }
  return res.status(404).json({ message: "Contact not found" });
};

module.exports = {
  getAllContacts,
  addContact,
  removeContactById,
  getContactByID,
  updateContact,
};
