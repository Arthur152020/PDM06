import { useState } from 'react';

// Interface que define o estado exposto pelo ViewModel de login
export interface UseLoginViewModelState {
    userId: string | null;
    loading: boolean;
    error: string | null;
}

// Interface que define as ações expostas pelo ViewModel de login
export interface UseLoginViewModelActions {
    handleLogin: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// ViewModel responsável por gerenciar o estado de autenticação
export function useLoginViewModel(): UseLoginViewModelState & UseLoginViewModelActions {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Processa o login do usuário
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // Simulação de login - em produção, chamaria um serviço de autenticação
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (email && password) {
                // Login bem-sucedido - gera um ID de usuário simples
                const generatedUserId = `user_${Date.now()}`;
                setUserId(generatedUserId);
            } else {
                setError('Email e senha são obrigatórios');
            }
        } catch (err) {
            setError('Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    // Faz logout do usuário, limpando o estado
    const logout = () => {
        setUserId(null);
        setError(null);
    };

    return { userId, loading, error, handleLogin, logout };
}

