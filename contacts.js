const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContact = async (contacts) => {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data);
};


// TODO: задокументировать каждую функцию
const listContacts = async() => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
};
  
const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if(!result) {
        return null;
    }
    return result;
  };
  
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await updateContact(contacts);
    return removeContact;
};
  
const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}