const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const contactById = allContacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contactById) {
    return null;
  }
  return contactById;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = { id: uuidv4(), name, email, phone };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const indexOfRemuveContact = allContacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (indexOfRemuveContact === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(indexOfRemuveContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return removeContact;
};

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
