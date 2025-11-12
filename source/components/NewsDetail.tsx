import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { News } from '../model/entities/news';

interface NewsDetailProps {
    news: News;
    onBack: () => void;
}

// Componente da tela de detalhes de uma notícia
export default function NewsDetail({ news, onBack }: NewsDetailProps) {
    // Formata a data para exibição no formato brasileiro com hora
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Imagem da notícia (se disponível) */}
            {news.urlToImage && (
                <Image source={{ uri: news.urlToImage }} style={styles.image} />
            )}
            <View style={styles.content}>
                <Text style={styles.title}>{news.title}</Text>
                {/* Metadados: fonte e data */}
                <View style={styles.meta}>
                    <Text style={styles.source}>{news.source.name}</Text>
                    <Text style={styles.date}>{formatDate(news.publishedAt)}</Text>
                </View>
                {/* Descrição ou conteúdo da notícia */}
                <Text style={styles.description}>{news.description || news.content}</Text>
                {/* URL da fonte original */}
                {news.url && (
                    <Text style={styles.url}>Fonte: {news.url}</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={onBack} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    source: {
        fontSize: 14,
        color: '#888',
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
    },
    url: {
        fontSize: 12,
        color: '#0066cc',
        marginTop: 10,
    },
    buttonContainer: {
        padding: 15,
    },
});

