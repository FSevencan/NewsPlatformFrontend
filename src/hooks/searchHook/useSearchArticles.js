import { useState, useEffect } from 'react';
import articleService from '../../services/articleService/articleService';

const useSearchArticles = (searchTerm, pageIndex = 0, pageSize = 10) => {
    const [articles, setArticles] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await articleService.getSearchArticles(searchTerm, pageIndex, pageSize);
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

        if (searchTerm?.trim()) {
            fetchData();
        }
    }, [searchTerm, pageIndex, pageSize]);

    return { articles, totalResults, loading, error, ...paginationInfo };
};

export default useSearchArticles;