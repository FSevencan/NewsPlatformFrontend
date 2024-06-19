import { useState, useEffect } from 'react';
import axios from 'axios';

const useLatestPoll = () => {
    const [latestPoll, setLatestPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestPoll = async () => {
            try {
                const response = await axios.get('https://haberapi.fatihsevencan.com/api/Polls/latest');
                setLatestPoll(response.data);
                setError(null);
            } catch (err) {
                setError(err);
                console.error('En son anket yüklerken bir hata oluştu', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPoll();
    }, []);

    return { latestPoll, loading, error };
};

export default useLatestPoll;