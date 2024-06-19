import { useState, useEffect } from 'react';
import ColumnArticleService from '../../services/columnArticleService/columnArticleService';

const useColumnArticles = (pageIndex = 0, pageSize = 10, categoryId = null) => {
    const [columnArticles, setColumnArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColumnArticles = async () => {
            setLoading(true);
            try {
                const response = await ColumnArticleService.getColumnArticles(pageIndex, pageSize, categoryId);
                setColumnArticles(response.data.items); 
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchColumnArticles();
    }, [pageIndex, pageSize, categoryId]); 

    return { columnArticles, loading, error };
};

export default useColumnArticles;