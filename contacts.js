const manager = require("./contactManager");
const ui = require("./ui");

const command = process.argv[2]; // what operation to do
const args = process.argv.slice(3);

const run = function () {
  ui.checkArg(command, args.length);
  if (command === "add") {
    const email = args[1];
    ui.checkEmail(email);
  }

  switch (command) {
    case "add":
      const [fname, email, phone] = args;
      manager.addContact(fname, email, phone);
      break;
    case "delete":
      const [emailToDelete] = args;
      manager.deleteContact(emailToDelete);
      break;
    case "list":
      let contactList = manager.listContact();
      console.log(`=== All Contacts ===`);
      ui.printContacts(contactList);
      break;
    case "search":
      const [searchName] = args;
      let searchList = manager.searchContact(searchName);
      console.log(`=== Search Results for ${searchName} ===`);
      if (searchList.length > 0) {
        ui.printContacts(searchList);
      } else {
        console.log(`No contacts found matching ${searchName}`);
      }
      break;
    case "help":
      ui.showHelp();
      break;
    default:
      ui.invalidcommand(command);
      break;
  }
};

run();
