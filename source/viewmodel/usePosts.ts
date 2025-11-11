import { useEffect, useState } from 'react';
import { Post } from '../model/entities/post';
import { PostService } from '../model/services/postService';

export interface UsePostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface UsePostsActions {
  refresh: () => Promise<void>;
}

export function usePosts(): UsePostsState & UsePostsActions {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    //await new Promise(resolve => setTimeout(resolve, 1000));
    setError(null);
    try {
      const data = await PostService.getPosts();
      setPosts(data);
    } catch (err) {
      setError('Erro ao carregar os posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, loading, error, refresh };
}