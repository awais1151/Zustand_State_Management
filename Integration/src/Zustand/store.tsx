import { create } from 'zustand';
import axios from 'axios';

export interface Post{
    userId:number;
    id:number;
    title:string;
    body:string;
}

interface Store{

posts:Post[];
fetchPosts:()=>Promise<void>;
updatePost: (id: number, updatedData: Partial<Post>) => void;
}

const useStore = create<Store>((set) => ({
  posts:[] ,
  fetchPosts: async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
      set({ posts: response.data });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },

  updatePost: async (id, updatedData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        ),
      }));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },

}));

export default useStore;
