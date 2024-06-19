
import { useState, useEffect } from 'react';
import tagService from '../../services/tagService/tagService';

function useTagArticles(tagName, pageIndex = 0, pageSize = 10) {
    const [articles, setArticles] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await tagService.getArticlesByTag(tagName, pageIndex, pageSize);
                setArticles(response.data.items);
                setTotalResults(response.data.count);
                setPaginationInfo({
                    pages: response.data.pages,
                    currentPage: pageIndex,
                    hasNext: response.data.hasNext,
                    hasPrevious: response.data.hasPrevious
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (tagName) {
            fetchArticles();
        }
    }, [tagName, pageIndex, pageSize]);

    return { articles, totalResults, loading, error, ...paginationInfo };
}

export default useTagArticles;