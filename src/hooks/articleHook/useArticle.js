
import { useState, useEffect } from 'react';
import ArticleService from '../../services/articleService/articleService';

const useArticles = (options = {}) => {
    const { page = 1, pageSize = 10, subCategoryName = null, excludeCategories = [] } = options;
    const [articles, setArticles] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                let response;

                if (subCategoryName) {
                    response = await ArticleService.getLatestArticlesByCategory(subCategoryName, pageSize);
                }
                else if (excludeCategories.length)
                {
                    response = await ArticleService.getLatestArticlesExcludingCategories(pageSize, excludeCategories);
                }
                else
                { 
                   response = await ArticleService.getArticles(page, pageSize);
                }

                setArticles(response.data.items);
                setPaginationInfo({
                    pages: response.data.pages,
                    currentPage: page,
                    hasNext: response.data.hasNext,
                    hasPrevious: response.data.hasPrevious
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [page, pageSize, subCategoryName, excludeCategories.join(',')]);

    return { articles, isLoading, error, ...paginationInfo };
};

export default useArticles;