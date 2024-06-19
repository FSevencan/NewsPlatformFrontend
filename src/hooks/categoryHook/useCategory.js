

import { useState, useEffect } from 'react';
import CategoryService from '../../services/categoryService/categoryService';

const useCategories = (pageIndex = 0, pageSize = 10) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await CategoryService.getCategories(pageIndex, pageSize);
                setCategories(response.data.items); 
                setError(null); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [pageIndex, pageSize]);

    return { categories, loading, error };
};

export default useCategories;