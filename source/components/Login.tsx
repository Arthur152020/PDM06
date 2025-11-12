import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useLoginViewModel } from '../viewmodel/useLoginViewModel';

interface LoginProps {
    onLoginSuccess: () => void;
}

// Componente de tela de login
export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { userId, loading, error, handleLogin } = useLoginViewModel();

    // Quando o login é bem-sucedido (userId é definido), chama o callback e limpa os campos
    React.useEffect(() => {
        if (userId) {
            onLoginSuccess();
            setEmail('');
            setPassword('');
        }
    }, [userId, onLoginSuccess]);

    // Exibe indicador de carregamento durante o processo de login
    if (loading) {
        return (
            <View style={styles.containerSpinner}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Login"
                onPress={() => handleLogin(email, password)}
            />
            {error && <Text style={styles.errorText}>Erro: {error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    containerSpinner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    errorText: {
        color: '#ff0000',
        marginTop: 12,
        textAlign: 'center',
    },
});

