import axios from 'axios';
import { Post } from '../entities/post';

export class PostService {
  static async getPosts(): Promise<Post[]> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
}
