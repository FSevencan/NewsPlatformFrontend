import BaseService from "../baseService";

class ContactService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/contacts");
    }

    addContact(contactData) {
        return this.add(contactData);
    }
}

export default new ContactService();