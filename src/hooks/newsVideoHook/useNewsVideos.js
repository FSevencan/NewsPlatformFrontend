

import { useState, useEffect } from 'react';
import newsVideoService from '../../services/newsVideoService/newsVideoService';


const useNewsVideos = (pageIndex = 0, pageSize = 10) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
               
                const response = await newsVideoService.getNewsVideos(pageIndex, pageSize);
                if (response.status === 200) {
                    
                    setVideos(response.data.items);
                    console.log(response.data.items)
                } else {
                    throw new Error('Veri çekilemedi');
                }
            } catch (error) {
                console.error('Video listesi çekilemedi:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [pageIndex, pageSize]);

    return { videos, loading, error };
};

export default useNewsVideos;