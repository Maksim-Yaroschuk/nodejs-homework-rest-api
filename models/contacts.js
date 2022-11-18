const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(list);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    const findContact = list.find((item) => item.id === contactId);
    return findContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    const findContact = list.find((item) => item.id === contactId);
    if (!findContact) {
      return null;
    }
    const newContacts = list.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return findContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const list = await listContacts();
    const newContacts = [...list, contact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const list = await listContacts();
    const [contact] = list.filter((item) => item.id === contactId);
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    const newContacts = [...list];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
