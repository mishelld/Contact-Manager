const fs = require("fs");
const path = require("path");

const CONTACTS_FILE = path.join(__dirname, "contacts.json");

const loadContacts = function () {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8"); //"utf-8": bytes -> char
    const contacts = JSON.parse(data); // string -> object
    console.log("JSON file Loaded");
    return contacts;
  } catch (error) {
    console.log("Failed to load file contacts");
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
  let contact = { name: name, email: email, phone: phone };
  let new_contacts = [...contacts, contact];
  writeContacts(new_contacts);
};

const deleteContact = function (email) {
  const contacts = loadContacts();
  let new_contacts = contacts.filter((c) => c.email !== email);
  writeContacts(new_contacts);
};

const searchContact = function (name) {};

const listContact = function () {};

module.exports = {
  addContact,
  deleteContact,
  searchContact,
  listContact,
};
