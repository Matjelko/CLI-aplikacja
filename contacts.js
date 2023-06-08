const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

// console.log(path.basename(contactsPath))
console.log(contactsPath)

function listContacts() {
    fs.readFile(contactsPath, function(err, data) {
        if(err) {
            console.log("error", err.message);
        } else {
            // console.log(data.toString());
            console.log(JSON.parse(data))
        }
    })
}
  
function getContactById(contactId) {
    fs.readFile(contactsPath, function(err, data) {
        if(err) {
            console.log("error", err.message);
        } else {
            const contacts = JSON.parse(data);
            const contact = contacts.find((contact) => contact.id === contactId);
            console.log(contact);  
        }
    })
}
  
function removeContact(contactId) {
    fs.readFile(contactsPath, function(err, data) {
        if(err) {
            console.log("error", err.message);
        } else {
            const contacts = JSON.parse(data);
            const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

            fs.writeFile(contactsPath, JSON.stringify(updatedContacts), function(err) {
                if(err) {
                    console.log("error", err.message)
                } else {
                    console.log(`Contacts with id ${contactId} has been removed.`)
                }
            })
        }
    })
}
  
function addContact(name, email, phone) {
    fs.readFile(contactsPath, function(err, data) {
        if(err) {
            console.log("error", err.message)
        } else {
            const contacts = JSON.parse(data);
            const newContact = {
                name,
                email,
                phone,
            };

            const updatedContacts = [...contacts, newContact];

            fs.writeFile(contactsPath, JSON.stringify(updatedContacts), function(err) {
                if (err) {
                    console.log("error", err.message)
                }
                else {
                    console.log("Contact has been added.")
                }
            })
        }
    })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}