
// YouTube video URL'sinden video ID'sini çıkarır.
export const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Verilen YouTube video ID'si için küçük resim URL'si oluşturur.
export const getYoutubeThumbnailUrl = (videoID) => {
    return `https://img.youtube.com/vi/${videoID}/default.jpg`;
};