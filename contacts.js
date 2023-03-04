const fs = require("fs").promises;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(
  `${path.dirname("./db/contacts.json")}`,
  "contacts.json"
);

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  const result = JSON.parse(contacts);
  return result;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  const id = String(contactId);
  const contactById = allContacts.filter((contact) => {
    contact.id === contactId;
    console.log(contact.id === id);
  });
  // const contactById = allContacts.find((contact) => {
  //   contact.id === id;
  //   console.log(contact.id === id);
  // });
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const indexContact = allContacts.findIndex((contact) => {
    contact.id === contactId;

    console.log(`${contact.id} === ${contactId}`, contact.id == contactId);
  });
  if (indexContact === -1) {
    console.log("Contact to delete not found");
    return;
  }
  const removeContact = allContacts.splice(indexContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

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
