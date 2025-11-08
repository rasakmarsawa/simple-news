import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import ErrorAlert from "../components/ErrorAlert";

export default function Search({ user }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a username.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get(
        `/users/search?username=${encodeURIComponent(searchQuery)}`
      );
      const users = Array.isArray(res.data) ? res.data : res.data.users || [];
      setResults(users);

      if (users.length === 0) setError("No users found.");
    } catch (err) {
      setError(err.response?.data?.message || "Error searching users");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) fetchUsers(query);
      else setResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) await api.delete(`/follow/${userId}`);
      else await api.post(`/follow/${userId}`);

      setResults((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
        )
      );
    } catch (err) {
      console.error("Follow error:", err);
      setError("Failed to follow/unfollow user.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center pt-16 overflow-hidden">
      {/* Error Alert */}
      <div className="absolute top-16 w-full flex justify-center z-50">
        <ErrorAlert message={error} onClose={() => setError("")} />
      </div>

      {/* Fixed Search Input */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md fixed top-16 z-10 p-6 flex items-center">
        <input
          type="text"
          placeholder="Search username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {loading && (
          <div className="ml-2 w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {/* Scrollable Search Results */}
      <div
        className="w-full max-w-md flex flex-col flex-1 overflow-y-auto mt-[120px] pb-8 space-y-3"
      >
        {results.length === 0 && !error && !loading && (
          <p className="text-gray-500 text-center mt-4">No users found.</p>
        )}

        {results.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-lg shadow mb-2 flex justify-between items-center break-words"
          >
            <span className="font-medium">@{u.username}</span>

            {u.id !== user?.id && (
              <button
                onClick={() => handleFollow(u.id, u.isFollowing)}
                className={`px-3 py-1 rounded transition-colors ${
                  u.isFollowing
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {u.isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
