import { useEffect, useState } from 'react';
import { News } from '../model/entities/news';
import { NewsService } from '../model/services/newsService';

// Interface que define o estado exposto pelo ViewModel
export interface UseNewsState {
    news: News[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
}

// Interface que define as ações expostas pelo ViewModel
export interface UseNewsActions {
    refresh: () => Promise<void>;
    search: (term: string) => Promise<void>;
    setSearchTerm: (term: string) => void;
}

// ViewModel responsável por gerenciar o estado das notícias
export function useNews(): UseNewsState & UseNewsActions {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Recarrega as notícias usando o termo de busca atual (ou busca padrão)
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

    // Busca notícias por um termo específico
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

    // Carrega notícias automaticamente ao montar o componente
    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { news, loading, error, searchTerm, refresh, search, setSearchTerm };
}

