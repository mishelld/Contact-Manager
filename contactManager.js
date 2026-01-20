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
const addContact = function (name, email, phone) {};

const deleteContact = function (email) {};

const searchContact = function (name) {};

const listContact = function () {};

module.exports = {
  loadContacts,
  addContact,
  deleteContact,
  searchContact,
  listContact,
};
