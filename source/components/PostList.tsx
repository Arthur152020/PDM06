import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { usePosts } from '../viewmodel/usePosts';

export default function PostList() {
    const { posts, loading, error, refresh } = usePosts();

    if (loading)
        return (
            <View style={styles.containerSpinner}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Carregando</Text>
            </View>
        );

    if (error)
        return (
            <View style={styles.containerSpinner}>
                <Text>{error}</Text>
                <Button title="Recarregar" onPress={refresh} />
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={{height: 80}}></View>
            <Button title="Recarregar" onPress={refresh} />
            {posts.map((post) => (
                <View key={post.id} style={styles.card}>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.body}>{post.body}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSpinner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 15,
        margin: 15,
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    body: {
        fontSize: 14,
        color: '#555',
    },
});
