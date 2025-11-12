import axios from 'axios';
import { News } from '../entities/news';

// TODO: Em produção, mover para variável de ambiente (.env)
const API_KEY = '0e05347ee3924850956ad491ef160c6e';
const BASE_URL = 'https://newsapi.org/v2';

// Interface que define a estrutura da resposta da NewsAPI
interface NewsApiResponse {
    articles: News[];
    status: string;
    totalResults: number;
}

// Serviço responsável por fazer requisições à NewsAPI
export class NewsService {
    // Busca notícias da NewsAPI
    // @param search - Termo de busca opcional (se não fornecido, busca por "brasil")
    // @param limit - Número máximo de notícias a retornar (padrão: 20)
    // @returns Promise com array de notícias
    static async getNews(search?: string, limit: number = 20): Promise<News[]> {
        const url = `${BASE_URL}/everything`;
        const params: Record<string, string> = {
            apiKey: API_KEY,
            language: 'pt', // Idioma português
        };

        // Se houver termo de busca, usa-o; caso contrário, busca por "brasil"
        if (search) {
            params.q = search;
        } else {
            params.q = 'brasil';
        }

        // Define o limite de resultados
        if (limit) {
            params.pageSize = limit.toString();
        }

        const response = await axios.get<NewsApiResponse>(url, { params });
        // Retorna o array de artigos da resposta da API
        return response.data.articles || [];
    }
}

