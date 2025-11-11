import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, FlatList, TextInput, TouchableOpacity, Image, RefreshControl, StatusBar, Platform } from 'react-native';
import { useNews } from '../viewmodel/useNews';
import { News } from '../model/entities/news';

interface HomeProps {
    onNewsPress: (news: News) => void;
}

export default function Home({ onNewsPress }: HomeProps) {
    const { news, loading, error, searchTerm, refresh, search, setSearchTerm } = useNews();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleSearch = async () => {
        await search(searchTerm);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await refresh();
        setRefreshing(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const renderNewsItem = ({ item }: { item: News }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onNewsPress(item)}
            activeOpacity={0.7}
        >
            {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.image} />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.snippet} numberOfLines={2}>
                    {item.snippet || item.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.source}>{item.source}</Text>
                    <Text style={styles.date}>{formatDate(item.published_at)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading && news.length === 0)
        return (
            <View style={styles.containerSpinner}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Carregando</Text>
            </View>
        );

    if (error && news.length === 0)
        return (
            <View style={styles.containerSpinner}>
                <Text>{error}</Text>
                <Button title="Recarregar" onPress={refresh} />
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar notícias..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                />
                <View style={{ marginLeft: 10 }}>
                    <Button title="Buscar" onPress={handleSearch} />
                </View>
            </View>
            {news.length === 0 && !loading ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhuma notícia encontrada</Text>
                    <Button title="Recarregar" onPress={refresh} />
                </View>
            ) : (
                <FlatList
                    data={news}
                    renderItem={renderNewsItem}
                    keyExtractor={(item) => item.uuid}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#00ff00']}
                        />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerSpinner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 15,
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 40 : 70,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 15,
    },
    card: {
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    snippet: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    source: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    emptyContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
});

