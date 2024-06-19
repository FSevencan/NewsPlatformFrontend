import { useState } from 'react';
import ContactService from '../../services/contactService/contactService';

const useContact = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendContact = async (contactData) => {
        try {
            setLoading(true);
            const res = await ContactService.addContact(contactData);
            setResponse(res);
            setLoading(false);
            return res; 
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err; 
        }
    };

    return { sendContact, isLoading, error, response };
};

export default useContact;