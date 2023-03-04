const argv = require("yargs/yargs")(process.argv.slice(2)).argv;
const fs = require("fs").promises;
const path = require("path");

const contactsAction = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contactsAction.listContacts();
      console.table(listContacts);
      break;

    case "get":
      const contactById = await contactsAction.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsAction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsAction.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.log(action);
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
