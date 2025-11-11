import axios from 'axios';
import { News } from '../entities/news';

// TODO: Em produção, mover para variável de ambiente (.env)
const API_TOKEN = 'EqPbh38sjKDyYorAB1ph69dOqtEShJgyf9nuvjBB';
const BASE_URL = 'https://api.thenewsapi.com/v1/news/all';

export class NewsService {
    static async getNews(search?: string, limit: number = 20): Promise<News[]> {
        const params: Record<string, string> = {
            api_token: API_TOKEN,
            language: 'pt',
        };

        if (search) {
            params.search = search;
        }

        if (limit) {
            params.limit = limit.toString();
        }

        const response = await axios.get(BASE_URL, { params });
        return response.data.data || [];
    }
}

