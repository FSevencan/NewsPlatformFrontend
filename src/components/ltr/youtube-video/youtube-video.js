
"use client"
import useNewsVideos from '../../../hooks/newsVideoHook/useNewsVideos';
import { useState, useEffect } from 'react';
import { extractVideoID, getYoutubeThumbnailUrl } from "@/Utilities/youtubeFormatHelper"


const YoutubeVideo = () => {

    const { videos, loading, error } = useNewsVideos();
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        // İlk videoyu seçili olarak ayarla
        if (videos.length > 0) {
            setSelectedVideo(videos[0]);
        }
    }, [videos]);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
    };

    console.log(videos)

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error.message}</div>;

    return (
        <div className="youtube-wrapper">
           
            <div id="rypp-demo-1" className="RYPP r16-9" data-rypp="da4e5dd6">
                <div>
                    <div className="RYPP-playlist">
                        <header>
                            <h2 className="_h1 RYPP-title">Oynatma Listesi</h2>
                           
                        </header>
                        <div className="RYPP-items">
                            <ol>
                                {videos.map((video) => (
                                    <li
                                        key={video.id}
                                        className={selectedVideo?.id === video.id ? 'selected' : ''}
                                        onClick={() => handleThumbnailClick(video)}
                                    >
                                        <p className="title">{video.title}</p>
                                        <img
                                            src={getYoutubeThumbnailUrl(extractVideoID(video.videoURL))}
                                            className="thumb"
                                            alt={`Thumbnail of ${video.title}`}
                                        />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                {selectedVideo && (
                    <div className="RYPP-video">
                        <iframe
                            key={selectedVideo.id}
                            className="RYPP-video-player"
                            style={{ display: 'block' }}
                            frameBorder="0"
                            allowFullScreen
                            title="YouTube Video Player"
                            width="640"
                            height="360"
                            src={`https://www.youtube.com/embed/${extractVideoID(selectedVideo.videoURL)}`} 
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YoutubeVideo;

