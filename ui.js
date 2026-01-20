const checkEmail = function (email) {
  if (!email.includes("@")) {
    console.log("Error: Email must contain @ symbol");
    process.exit(1);
  }
};

const invalidcommand = function (command) {
  console.log(`✗ Error: Unknown command ${command}`);
  console.log(
    "Usage: node contacts.js [add|list|search|delete|help] [arguments]",
  );
};

const checkArg = function (command, arg) {
  switch (command) {
    case "add":
      if (arg !== 3) {
        console.log("✗ Error: Missing arguments for add command");
        console.log(`Usage: node contacts.js add "name" "email" "phone"`);
        process.exit(1);
      }
      break;
    case "delete":
      if (arg !== 1) {
        console.log("✗ Error: Missing arguments for delete command");
        console.log(`Usage: node contacts.js delete "email"`);
        process.exit(1);
      }
      break;
    case "search":
      if (arg !== 1) {
        console.log("✗ Error: Missing arguments for search command");
        console.log(`Usage: node contacts.js search "name"`);
        process.exit(1);
      }
      break;
    default:
      break;
  }
};

const showHelp = function () {
  console.log("Usage: node contacts.js [command] [arguments]");
  console.log("Commands:");
  console.log('add "name" "email" "phone"  - Add a new contact');
  console.log("list                        - List all contacts");
  console.log('search "query"              - Search contacts by name or email');
  console.log('delete "email"              - Delete contact by email');
  console.log("help                        - Show this help message");
  console.log("Examples:");
  console.log(
    `  node contacts.js add "John Doe" "john@example.com" "555-123-4567"`,
  );
  console.log(`  node contacts.js search "john"`);
  console.log(`  node contacts.js delete "john@example.com"`);
};
const printContacts = function (list) {
  let i = 1;
  for (let contact of list) {
    console.log(`${i}. ${contact.name} - ${contact.email} - ${contact.phone} `);
    i++;
  }
};
module.exports = {
  showHelp,
  invalidcommand,
  checkArg,
  checkEmail,
  printContacts,
};
