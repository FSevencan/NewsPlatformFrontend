import axios from 'axios';
import BaseService from "../baseService";

class ArticleService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/Articles");
    }

    getArticles(pageIndex = 0, pageSize = 10) {
     
        return this.getAll(pageIndex , pageSize);
    }

    getMostLikedArticles(pageIndex = 0, pageSize = 5) {

        const params = new URLSearchParams({ PageIndex: pageIndex, PageSize: pageSize });
        return axios.get(`${this.apiUrl}/articles/most-liked?${params}`);
    }

    getLatestArticlesByCategory(subCategoryName, maxResults = 5) {
        
        const params = new URLSearchParams({ subCategoryName, maxResults });
        return axios.get(`${this.apiUrl}/latest-by-category?${params}`);
    }

    getBySlug(slug) {
        
        return this.getById(slug);
    }

    getLatestArticlesExcludingCategories(maxResults, excludeCategories) {
        const params = new URLSearchParams({ maxResults });

        excludeCategories.forEach(category => {
            params.append('excludeCategories', category);
        });

        return axios.get(`${this.apiUrl}/latest-articles-excluding-categories?${params}`);
    }

    getSearchArticles(searchTerm, pageIndex = 0, pageSize = 10) {
        const params = new URLSearchParams({ PageIndex: pageIndex, PageSize: pageSize, searchTerm: searchTerm });

        return axios.get(`${this.apiUrl}/search?${params}`);
    }
}

export default new ArticleService();
