import { useState, useEffect } from 'react';
import axios from 'axios';

const usePoll = (pollId) => {
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPoll = async () => {
        setLoading(true);
        try {
            // API'den anket verilerini çek
            const pollResponse = await axios.get(`https://haberapi.fatihsevencan.com/api/Polls/${pollId}`);
            const optionsResponse = await axios.get(`https://haberapi.fatihsevencan.com/api/PollOptions/by-poll/${pollId}`);

            // Anket ve seçenekleri state'e ata
            setPoll({
                ...pollResponse.data,
                options: optionsResponse.data
            });
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPoll();
    }, [pollId]);

    return { poll, setPoll, loading, error, fetchPoll }; 
};

export default usePoll;

