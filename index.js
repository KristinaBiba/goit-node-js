const argv = require("yargs/yargs")(process.argv.slice(2)).argv;
const fs = require("fs").promises;
const path = require("path");

const contactsAction = require("./contacts");

const newContact = {
  name: "Olga",
  email: "olga@gmail.com",
  phone: "0506300365",
};

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contactsAction.listContacts();
      console.log(listContacts);
      break;

    case "get":
      const contactById = await contactsAction.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsAction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContac = await contactsAction.removeContact(id);
      console.log(removeContac);
      break;

    default:
      console.log(action);
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
