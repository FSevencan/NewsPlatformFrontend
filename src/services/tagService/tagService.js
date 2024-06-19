import BaseService from "../baseService";
import axios from "axios";
class TagService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/Tags");
    }

    getTags(pageIndex = 0, pageSize = 30) {

        return this.getAll(pageIndex, pageSize);
    }

    getArticlesByTag(tagName, pageIndex = 0, pageSize = 10) {
        return axios.get(`${this.apiUrl}/${tagName}/articles`, {
            params: { PageIndex: pageIndex, PageSize: pageSize }
        });
    }
}

export default new TagService();
