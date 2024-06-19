

// Alt kategori adını URL formatına uygun hale getirir.
export function formatSubCategoryForURL(subCategoryName) {
    // Türkçe karakter dönüşümlerini koruyarak ASCII karşılıkları ile değiştir
    const replacements = {
        'İ': 'i', 'I': 'ı', 'Ş': 'ş', 'Ğ': 'ğ',
        'Ç': 'ç', 'Ü': 'ü', 'Ö': 'ö', 'ı': 'ı',
        'ş': 'ş', 'ğ': 'ğ', 'ç': 'ç', 'ü': 'ü', 'ö': 'ö'
    };
    // Türkçe karakterler korunarak küçük harfe çevrilir
    let formattedName = subCategoryName
        .split('')
        .map(char => replacements[char] || char)
        .join('')
        .toLowerCase(new Intl.Collator('tr-TR').locale)
        .replace(/\s+/g, '-');
    return formattedName;
}