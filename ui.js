

// $ node contacts.js search "john"
// Loading contacts from contacts.json...
// ✓ Loaded 2 contacts

// === Search Results for "john" ===
// 1. John Doe - john@example.com - 555-123-4567

// $ node contacts.js search "bob"
// Loading contacts from contacts.json...
// ✓ Loaded 2 contacts

// === Search Results for "bob" ===
// No contacts found matching "bob"

// $ node contacts.js delete "jane@example.com"
// Loading contacts from contacts.json...
// ✓ Loaded 2 contacts
// ✓ Contact deleted: Jane Smith
// ✓ Contacts saved to contacts.json

// $ node contacts.js delete "nonexistent@example.com"
// Loading contacts from contacts.json...
// ✓ Loaded 1 contacts
// ✗ Error: No contact found with email: nonexistent@example.com

// $ node contacts.js add "Bad User" "john@example.com" "555-9999"
// Loading contacts from contacts.json...
// ✓ Loaded 1 contacts
// ✗ Error: Contact with this email already exists



// Examples:
//   node contacts.js add "John Doe" "john@example.com" "555-123-4567"
//   node contacts.js search "john"
//   node contacts.js delete "john@example.com"

// $ node contacts.js invalidcommand
// ✗ Error: Unknown command 'invalidcommand'
// Usage: node contacts.js [add|list|search|delete|help] [arguments]

// $ node contacts.js add
// ✗ Error: Missing arguments for add command
// Usage: node contacts.js add "name" "email" "phone"





console.log('Arguments:', process.argv);


const command = (process.argv[2]); // what operation to do
const fname = (process.argv[3]);
const email = (process.argv[4]);
const phone = (process.argv[5]);
const list = [
    { name: "Gal", email: "galraij@gmail.com", phone: 052 - 4545795 },
    { name: "Bob", email: "bob@test.com" },
    { name: "Charlie", email: "charlie@gmail.com" }
] //import from json

// $ node contacts.js add "John" "invalid-email" "555-1234"
// ✗ Error: Email must contain @ symbol

if (email == undefined || email.includes("@")) {
    //mail is valid - do something
} else {
    console.log("Error: Email must contain @ symbol")
}


// $ node contacts.js add "John Doe" "john@example.com" "555-123-4567"
// Loading contacts from contacts.json...
// ✗ File not found - creating new contact list
// ✓ Contact added: John Doe
// ✓ Contacts saved to contacts.json

// $ node contacts.js add "Jane Smith" "jane@example.com" "555-987-6543"
// Loading contacts from contacts.json...
// ✓ Loaded 1 contacts
// ✓ Contact added: Jane Smith
// ✓ Contacts saved to contacts.json

const checkEmailInList = list.find(u => u.email === email);

if (email == undefined || checkEmailInList) {
    // user found - do something
} else {
    // user not found - add to list
    console.log("User added: " + fname);
}

// $ node contacts.js list
// Loading contacts from contacts.json...
// ✓ Loaded 2 contacts

// === All Contacts ===
// 1. John Doe - john@example.com - 555-123-4567
// 2. Jane Smith - jane@example.com - 555-987-6543


// for (oneuser of listOfContacts) {



// }

// $ node contacts.js help
// Usage: node contacts.js [command] [arguments]

// Commands:
//   add "name" "email" "phone"  - Add a new contact
//   list                        - List all contacts
//   search "query"              - Search contacts by name or email
//   delete "email"              - Delete contact by email
//   help                        - Show this help message

if (command == "help") {

    console.log("Commands:");
    console.log('add "name" "email" "phone"  - Add a new contact');
    console.log("list                        - List all contacts");
    console.log('search "query"              - Search contacts by name or email');
    console.log('delete "email"              - Delete contact by email');
    console.log('help                        - Show this help message');

}