import { useEffect, useState } from 'react';
import { News } from '../model/entities/news';
import { NewsService } from '../model/services/newsService';

export interface UseNewsState {
    news: News[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
}

export interface UseNewsActions {
    refresh: () => Promise<void>;
    search: (term: string) => Promise<void>;
    setSearchTerm: (term: string) => void;
}

export function useNews(): UseNewsState & UseNewsActions {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const refresh = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await NewsService.getNews(searchTerm || undefined);
            setNews(data);
        } catch (err) {
            setError('Erro ao carregar as notícias');
        } finally {
            setLoading(false);
        }
    };

    const search = async (term: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await NewsService.getNews(term || undefined);
            setNews(data);
        } catch (err) {
            setError('Erro ao buscar notícias');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { news, loading, error, searchTerm, refresh, search, setSearchTerm };
}

