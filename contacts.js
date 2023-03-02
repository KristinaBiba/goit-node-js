const fs = require("fs").promises;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(
  `${path.dirname("./db/contacts.json")}`,
  "contacts.json"
);

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const result = JSON.parse(contacts);
  return result;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const allContact = await listContacts();

  const indexContact = allContact.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexContact === -1) {
    console.log("Contact to delete not found");
    return;
  }
  const removeContact = allContact.splice(indexContact, 1);

  fs.writeFile(contactsPath, JSON.stringify(allContact));

  return removeContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  const newContact = { name, email, phone, id: uuidv4() };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
