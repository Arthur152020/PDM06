import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import { News } from './model/entities/news';

// Componente raiz da aplicação - gerencia a navegação entre telas
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    // Callback chamado quando o login é bem-sucedido
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    // Callback chamado quando uma notícia é selecionada
    const handleNewsPress = (news: News) => {
        setSelectedNews(news);
    };

    // Callback chamado para voltar da tela de detalhes
    const handleBack = () => {
        setSelectedNews(null);
    };

    // Se não estiver logado, exibe a tela de login
    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    // Se estiver logado, exibe Home ou NewsDetail dependendo do estado
    return (
        <View style={{ flex: 1 }}>
            {selectedNews ? (
                <NewsDetail news={selectedNews} onBack={handleBack} />
            ) : (
                <Home onNewsPress={handleNewsPress} />
            )}
        </View>
    );
}
