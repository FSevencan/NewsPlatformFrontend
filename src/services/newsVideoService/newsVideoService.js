import BaseService from "../baseService";

class newsVideoService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/newsVideos");
    }

    getNewsVideos(pageIndex = 0, pageSize = 10) {

        return this.getAll(pageIndex, pageSize);
    }
}

export default new newsVideoService();