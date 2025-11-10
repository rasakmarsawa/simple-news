import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api/api';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const feedRef = useRef(null); // Scrollable feed reference
  const maxLength = 200;
  const limit = 10;

  const fetchPosts = async (pageNum = 1) => {
    try {
      const res = await api.get(`/feed?page=${pageNum}&limit=${limit}`);
      setPosts(res.data.posts);
      setHasMore(res.data.posts.length === limit);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await api.post('/posts', { content });
      setContent('');
      fetchPosts(page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts(page);

    // Scroll feed container to top on page change
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [page]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now - created;

    const mins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center pt-16 overflow-hidden">
      {/* Fixed Post Input */}
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md fixed top-16 z-10 transition-all duration-300 ${
          collapsed ? 'p-3 h-14' : 'p-6 h-auto'
        }`}
      >
        {!collapsed && (
          <>
            <textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) setContent(e.target.value);
              }}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={3}
            />

            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{content.length}/{maxLength}</span>
              {content.length === maxLength && (
                <span className="text-red-500 font-medium">Character limit reached</span>
              )}
            </div>

            {/* Post + Collapse Buttons Inline */}
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={handlePost}
                disabled={!content.trim()}
                className={`px-4 py-2 rounded transition-colors ${
                  content.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Post
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-blue-600 text-lg hover:text-blue-800"
                title="Collapse"
              >
                ▲
              </button>
            </div>
          </>
        )}

        {/* Collapsed State */}
        {collapsed && (
          <div
            className="flex justify-center items-center cursor-pointer text-blue-600 text-sm hover:underline"
            onClick={() => setCollapsed(false)}
          >
            <span className="text-lg mr-1">▼</span>
            <span className="font-medium">Create new post</span>
          </div>
        )}
      </div>

      {/* Scrollable Feed */}
      <div
        ref={feedRef}
        className={`w-full max-w-md flex flex-col flex-1 overflow-y-auto pb-8 transition-all duration-300 ${
          collapsed ? 'mt-[100px]' : 'mt-[250px]'
        }`}
      >
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow mb-4 break-words whitespace-pre-wrap"
            >
              <div className="flex justify-between items-center mb-2">
                <strong>{post.user.username}</strong>
                <span className="text-sm text-gray-500">{formatTimeAgo(post.created_at)}</span>
              </div>
              <p className="text-gray-800 break-words whitespace-pre-wrap">{post.content}</p>
            </div>
          ))
        )}

        {/* Pagination */}
        {posts.length > 0 && (page > 1 || hasMore) && (
          <div className="flex items-center justify-center space-x-4 mt-8 mb-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded border transition-colors ${
                page === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-500 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">Page {page}</span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMore}
              className={`px-4 py-2 rounded border transition-colors ${
                !hasMore
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-blue-500 hover:bg-blue-50'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
