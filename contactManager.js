const fs = require("fs");
const path = require("path");
const file_name = "contacts.json";
const CONTACTS_FILE = path.join(__dirname, file_name);

const loadContacts = function () {
  try {
    console.log("Loading contacts from contacts.json...");
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8"); //"utf-8": bytes -> char
    const contacts = JSON.parse(data); // string -> object
    console.log(`✓ Loaded ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File not found - creating new contact list");
    } else {
      console.log(
        `Failed to parse ${file_name} - creating new contact list`,
        error.message,
      );
    }
    return [];
  }
};
const writeContacts = function (new_contacts) {
  try {
    const jsonString = JSON.stringify(new_contacts);
    fs.writeFileSync(CONTACTS_FILE, jsonString, "utf-8");
    console.log("Contacts saved successfully");
  } catch (error) {
    console.log("Failed to write file contacts");
  }
};
const addContact = function (name, email, phone) {
  const contacts = loadContacts();
  const contactToAdd = contacts.find((c) => c.email === email);
  if (contactToAdd) {
    console.log("✗ Error: Contact with this email already exists");
    return;
  }
  let contact = { name: name, email: email, phone: phone };
  console.log(`✓ Contact added: ${name}`);
  let new_contacts = [...contacts, contact];
  writeContacts(new_contacts);
  console.log("✓ Contacts saved to", file_name);
};

const deleteContact = function (email) {
  const contacts = loadContacts();
  const contactToDelete = contacts.find((c) => c.email === email);
  if (!contactToDelete) {
    console.log("✗ Error: No contact found with email: ", email);
    return;
  }
  let new_contacts = contacts.filter((c) => c.email !== email);
  console.log("✓ Contact deleted:", contactToDelete.name);
  writeContacts(new_contacts);
};

const searchContact = function (name) {
  const contacts = loadContacts();
  let new_contacts = contacts.filter((c) => c.name === name);
  return new_contacts;
};

const listContact = function () {
  const contacts = loadContacts();
  return contacts;
};

module.exports = {
  addContact,
  deleteContact,
  searchContact,
  listContact,
};
