import React, { useEffect, useState } from 'react';
import useStore from './Zustand/store';
import { Post } from './Zustand/store';
import axios from 'axios';

function App() {
  const { posts, fetchPosts, updatePost } = useStore();
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleUpdate = async (id: number, updatedData: Partial<Post>) => {
    await updatePost(id, updatedData);
  };
  

  // const handleDelete = async (id) => {
  //   await deletePost(id);
  // };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/posts', newPost);
      fetchPosts();
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button onClick={handleCreate}>Add Post</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleUpdate(post.id, { title: 'Updated Title' })}>Update</button>
          {/* <button onClick={() => handleDelete(post.id)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
}

export default App;
