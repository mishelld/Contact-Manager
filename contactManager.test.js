const fs = require("fs");
const path = require("path");
const file_name = "contacts.json";
const CONTACTS_FILE = path.join(__dirname, file_name);
const manager = require("./contactManager");
beforeEach(() => {
  if (fs.existsSync(CONTACTS_FILE)) {
    fs.unlinkSync(CONTACTS_FILE);
  }
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]));
});
afterEach(() => {
  if (fs.existsSync(CONTACTS_FILE)) {
    fs.unlinkSync(CONTACTS_FILE);
  }
});

describe("Contact Manager", () => {
  test("addContact adds a contact to the json file", () => {
    manager.addContact("John", "john@test.com", "123");
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const contacts = JSON.parse(data);
    const exist = contacts.some(
      (c) =>
        c.name === "John" && c.email === "john@test.com" && c.phone === "123",
    );
    expect(exist).toBe(true);
  });
  test("addContact does not add a duplicate email", () => {
    manager.addContact("John", "john@test.com", "123");
    manager.addContact("John Duplicate", "john@test.com", "999");
    const result = manager.listContact();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      name: "John",
      email: "john@test.com",
      phone: "123",
    });
  });

  test("deleteContact removes a contact from the json file", () => {
    manager.addContact("John", "john@test.com", "123");
    manager.deleteContact("john@test.com");
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const contacts = JSON.parse(data);
    const exist = contacts.some(
      (c) =>
        c.name === "John" && c.email === "john@test.com" && c.phone === "123",
    );
    expect(exist).toBe(false);
  });
  test("deleteContact with non-existing email does nothing", () => {
    manager.addContact("John", "john@test.com", "123");
    manager.deleteContact("nonexistent@test.com");
    const result = manager.listContact();
    expect(result.length).toBe(1);
    expect(result[0].email).toBe("john@test.com");
  });
  test("searchContact returns empty array if no match", () => {
    manager.addContact("John", "john@test.com", "123");
    const result = manager.searchContact("Jane");
    expect(result).toEqual([]);
  });

  test("searchContact returns matching contacts", () => {
    const contact = [{ name: "John", email: "john@test.com", phone: "123" }];
    manager.addContact("John", "john@test.com", "123");
    manager.addContact("Jane", "jane@test.com", "456");
    const result = manager.searchContact("John");
    console.log(contact);
    expect(result).toEqual(contact);
  });
  test("listContact returns empty array when no contacts", () => {
    const result = manager.listContact();
    expect(result).toEqual([]);
  });
  test("listContact returns all contacts", () => {
    manager.addContact("John", "john@test.com", "123");
    manager.addContact("Jane", "jane@test.com", "456");
    const contacts = [
      { name: "John", email: "john@test.com", phone: "123" },
      { name: "Jane", email: "jane@test.com", phone: "456" },
    ];
    const result = manager.listContact();
    expect(result).toEqual(contacts);
  });
});
