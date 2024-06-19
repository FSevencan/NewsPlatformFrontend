
import axios from 'axios';
import BaseService from "../baseService";

export default class ArticleReactionService extends BaseService {
    constructor() {
        super("https://haberapi.fatihsevencan.com/api/articleReactions");
    }

    addReaction(articleId, voterIdentifier, isLiked) {
       
        const request = { articleId, voterIdentifier, isLiked };
        return axios.post(`${this.apiUrl}/add`, request);
    }

    async getReactionByArticleAndVoter(articleId, voterIdentifier) {
        
        try {
            const response = await axios.get(`${this.apiUrl}/GetByArticleAndVoter`, {
                params: { articleId, voterIdentifier }
            });
            return response.data;
        } catch (error) {
            console.error('An error occurred while fetching the reaction', error);
            throw error;
        }
    }

    async updateReaction(articleId, voterIdentifier, isLiked) {
       
        const request = { articleId, voterIdentifier, isLiked };
        return axios.put(`${this.apiUrl}`, request);
    }

    async deleteReaction(articleId, voterIdentifier) {
       
        return axios.delete(`${this.apiUrl}/${articleId}/${voterIdentifier}`);
    }
}