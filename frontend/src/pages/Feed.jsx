import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts/feed');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    if (!content) return;
    try {
      await api.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16 flex flex-col items-center">
      {/* Post creation form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={3}
        />
        <button
          onClick={handlePost}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </div>

      {/* Posts feed */}
      <div className="w-full max-w-md flex flex-col space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <strong className="block mb-2">{post.user.username}</strong>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
