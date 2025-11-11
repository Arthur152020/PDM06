import React, { useState } from 'react';
import { View } from 'react-native';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import { News } from './model/entities/news';


export default function App() {
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    const handleNewsPress = (news: News) => {
        setSelectedNews(news);
    };

    const handleBack = () => {
        setSelectedNews(null);
    };

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
