
// Tarih ve saat bilgisini 'gg.aa.yyyy ss:dd' formatında döndürür.

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('tr-TR', options);
    const formattedTime = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
};


// Yalnızca tarihi 'gg.aa.yyyy' formatında döndürür.

export const formatDateOnly = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('tr-TR', options);
    return formattedDate;
};