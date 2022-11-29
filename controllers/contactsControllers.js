const { Contact } = require("../models/contacts");
const { createNotFoundError } = require("../helpers");

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
  const result = await Contact.findByIdAndDelete(contactId);
  if (result) {
    return res.status(200).json({ message: `${result.name} deleted` });
  }
  return next(createNotFoundError());
};

const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    return res.status(200).json({ message: contact });
  }
  return next(createNotFoundError());
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    await Contact.findByIdAndUpdate(contactId, req.body);
    return res.status(200).json({ message: `${contact.name} was updated` });
  }
  return next(createNotFoundError());
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findById(contactId);
  if (contact) {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return res.status(200).json({ message: updatedContact });
  }
  return next(createNotFoundError());
};

module.exports = {
  getAllContacts,
  addContact,
  removeContactById,
  getContactByID,
  updateContact,
  updateContactStatus,
};
