
import axios from "axios";
import BaseService from "../baseService";

class ColumnArticleService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/ColumnArticles");
    }

    getColumnArticles(pageIndex = 0, pageSize = 10, categoryId = null) {
        // Eğer categoryId belirtilmişse, parametrelere ekle
        const params = new URLSearchParams({ PageIndex: pageIndex, PageSize: pageSize });
        if (categoryId) {
            params.append('CategoryId', categoryId);
        }
        return axios.get(`${this.apiUrl}?${params}`);
    }

    getColumnArticleBySlug(slug) {
        return axios.get(`${this.apiUrl}/slug/${slug}`);
    }
   
}

export default new ColumnArticleService();