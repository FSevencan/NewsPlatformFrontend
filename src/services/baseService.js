import axios from "axios";

export default class BaseService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || "http://localhost:60805/";
    }

    getAll(pageIndex = 0, pageSize = 10) {
        
        const params = new URLSearchParams({ PageIndex: pageIndex, PageSize: pageSize });
        return axios.get(`${this.apiUrl}?${params}`);
    }

    getById(id) {
        return axios.get(`${this.apiUrl}/${id}`);
    }

    add(request) {
        return axios.post(this.apiUrl, request);
    }

    update(id, request) {
        return axios.put(`${this.apiUrl}/${id}`, request);
    }

    delete(id) {
        return axios.delete(`${this.apiUrl}/${id}`);
    }
}