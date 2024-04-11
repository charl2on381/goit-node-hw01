// const { Command } = require("commander");
import { Command } from "commander";
const program = new Command();

// prettier-ignore
import { getContactById, listContacts, removeContact, addContact } from "./contacts.js";

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactsById = await getContactById(id);
      console.table(contactsById);
      break;

    case "add":
      const addNewContact = await addContact({ name, email, phone });
      console.table(addNewContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.table(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);