import { useState, useEffect } from 'react';
import ColumnArticleService from '../../services/columnArticleService/columnArticleService';

function useColumnArticleBySlug(slug) {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await ColumnArticleService.getColumnArticleBySlug(slug);
                setArticle(response.data);
            } catch (err) {
                setError(err);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    return { article, loading, error };
}

export default useColumnArticleBySlug;
