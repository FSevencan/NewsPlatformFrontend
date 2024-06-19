

// Verilen metinden HTML etiketlerini temizler ve belirli bir uzunluktaki bir alt dizeye kısaltır.
export const cleanHtmlAndSubstring = (text, length) => {
    
    const strippedString = text.replace(/(<([^>]+)>)/gi, "");

    if (strippedString.length <= length) {
        return strippedString;
    }

    return strippedString.substring(0, length) + "...";
}