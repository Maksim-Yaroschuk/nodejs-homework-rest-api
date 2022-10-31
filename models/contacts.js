const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(list);
  return contacts;
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const findContact = list.find((item) => item.id === contactId);
  return findContact;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const findContact = list.find((item) => item.id === contactId);
  if (!findContact) {
    return null;
  }
  const newContacts = list.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return findContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const list = await listContacts();
  const newContacts = list.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const list = await listContacts();
  const [contact] = list.filter((item) => item.id === contactId);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
