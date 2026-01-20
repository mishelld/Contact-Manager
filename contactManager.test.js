const fs = require("fs");
const path = require("path");
const manager = require("./contactManager");
const CONTACTS_FILE = path.join(__dirname, "contacts.json");
jest.mock("fs");
beforeEach(() => {
  fs.readFileSync.mockReset();
  fs.writeFileSync.mockReset();
});

describe("Contact Manager", () => {
  const sampleContacts = [
    { name: "John Doe", email: "john@example.com", phone: "555-1234" },
    { name: "Jane Smith", email: "jane@example.com", phone: "555-5678" },
  ];

  test("loadContacts returns array from file", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));

    const contacts = manager.listContact();
    expect(contacts).toEqual(sampleContacts);
  });

  test("addContact adds a new contact", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));
    fs.writeFileSync.mockImplementation(() => {});

    manager.addContact("Alice", "alice@example.com", "555-9999");

    const newContacts = [
      ...sampleContacts,
      { name: "Alice", email: "alice@example.com", phone: "555-9999" },
    ];
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      CONTACTS_FILE,
      JSON.stringify(newContacts),
      "utf-8",
    );
  });

  test("addContact does not add duplicate email", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));
    fs.writeFileSync.mockImplementation(() => {});

    console.log = jest.fn();

    manager.addContact("Duplicate John", "john@example.com", "555-0000");

    expect(console.log).toHaveBeenCalledWith(
      "✗ Error: Contact with this email already exists",
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  test("deleteContact removes contact by email", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));
    fs.writeFileSync.mockImplementation(() => {});
    console.log = jest.fn();

    manager.deleteContact("jane@example.com");

    const expectedContacts = [sampleContacts[0]];
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      CONTACTS_FILE,
      JSON.stringify(expectedContacts),
      "utf-8",
    );
    expect(console.log).toHaveBeenCalledWith(
      "✓ Contact deleted:",
      "Jane Smith",
    );
  });

  test("deleteContact with nonexistent email", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));
    fs.writeFileSync.mockImplementation(() => {});
    console.log = jest.fn();

    manager.deleteContact("noone@example.com");

    expect(console.log).toHaveBeenCalledWith(
      "✗ Error: No contact found with email: ",
      "noone@example.com",
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  test("searchContact finds contact by name", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleContacts));

    const results = manager.searchContact("Jane Smith");
    expect(results).toEqual([sampleContacts[1]]);

    const emptyResults = manager.searchContact("Bob");
    expect(emptyResults).toEqual([]);
  });
});
