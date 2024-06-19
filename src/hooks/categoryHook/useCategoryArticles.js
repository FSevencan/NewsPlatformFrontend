
import { useState, useEffect } from 'react';
import CategoryService from '../../services/categoryService/categoryService';

function useCategoryArticles(categoryName, pageIndex = 0, pageSize = 10) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {    
                const response = await CategoryService.getArticlesByCategory(categoryName, pageIndex, pageSize);
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

        if (categoryName) {
            fetchArticles();
        }
    }, [categoryName, pageIndex, pageSize]); 

    return { articles, totalResults, loading, error, ...paginationInfo };
}

export default useCategoryArticles;