// Interface que define a estrutura de uma notícia retornada pela NewsAPI
export interface News {
    title: string;
    description: string;
    url: string;
    urlToImage: string | null; // URL da imagem da notícia (pode ser null)
    publishedAt: string; // Data de publicação no formato ISO
    source: {
        id: string | null; // ID da fonte (pode ser null)
        name: string; // Nome da fonte de notícias
    };
    author: string | null; // Autor do artigo (pode ser null)
    content: string | null; // Conteúdo completo do artigo (pode ser null)
}

