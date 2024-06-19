
import axios from "axios";
import BaseService from "../baseService";

class CategoryService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/categories");
    }

    getCategories(pageIndex = 0, pageSize = 10) {

        return this.getAll(pageIndex, pageSize);
    }

    getArticlesByCategory(categoryName, pageIndex = 0, pageSize = 10) {
        return axios.get(`${this.apiUrl}/${categoryName}/articles`, {
            params: { PageIndex: pageIndex, PageSize: pageSize }
        });
    }

}

export default new CategoryService();
