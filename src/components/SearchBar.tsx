"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/package/${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-md"
        placeholder="Enter NPM package name"
      />
      <button type="submit" className="ml-2 p-2 bg-purple-600 text-white rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
