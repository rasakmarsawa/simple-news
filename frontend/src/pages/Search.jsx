import React, { useState } from 'react';
import { api } from '../api/api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await api.get(`/users/search?username=${query}`);
    setResults(res.data);
  };

  const handleFollow = async (userId) => {
    await api.post(`/users/${userId}/follow`);
    alert('Followed!');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Users</h2>
      <input
        placeholder="Search username"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: '0.5rem' }}>Search</button>

      <div style={{ marginTop: '1rem' }}>
        {results.map(user => (
          <div key={user.id} style={{ marginBottom: '0.5rem' }}>
            {user.username} <button onClick={() => handleFollow(user.id)}>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}
