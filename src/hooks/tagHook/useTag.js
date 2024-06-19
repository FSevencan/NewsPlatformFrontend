

import { useState, useEffect } from 'react';
import tagService from '../../services/tagService/tagService';

const useTags = (pageIndex = 0, pageSize = 30) => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await tagService.getTags(pageIndex, pageSize);
                setTags(response.data.items); 
                setError(null); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, [pageIndex, pageSize]);

    return { tags, loading, error };
};

export default useTags;