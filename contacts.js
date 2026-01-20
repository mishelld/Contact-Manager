const manager = require("./contactManager");
const ui = require("./ui");

function handleChoice(choice) {
  switch (choice) {
    case "add":
      break;
    case "delete":
      break;
    case "list":
      break;
    case "search":
      break;
    case "help":
      break;
    default:
      break;
  }
}
function run() {
  const choice = ui.getMenuChoice();
  handleChoice(choice);
}
run();
