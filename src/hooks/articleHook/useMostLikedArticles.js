
import { useState, useEffect } from 'react';
import articleService from '../../services/articleService/articleService';

const useMostLikedArticles = (pageIndex = 0, pageSize = 5) => {
    const [mostLikedArticles, setmostLikedArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostLikedArticles = async () => {
            setLoading(true);
            try {
                const response = await articleService.getMostLikedArticles(pageIndex, pageSize);
                setmostLikedArticles(response.data.items);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMostLikedArticles();
    }, [pageIndex, pageSize]);

    return { mostLikedArticles, loading, error };
};

export default useMostLikedArticles;