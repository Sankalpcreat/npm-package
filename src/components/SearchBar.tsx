"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const packages = ['vue', 'react', 'svelte', '@angular/core', 'solid-js', 'next', 'hono', 'fastify', 'nuxt', 'astro', 'supabase', 'express', 'typescript', 'vite'];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [randomPackages] = useState(() => packages.sort(() => 0.5 - Math.random()).slice(0, 4));
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/package/${query.trim()}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
      <div className="text-center space-y-2">
        <Package className="mx-auto h-12 w-12 text-red-600" />
        <h1 className="text-4xl font-bold text-gray-100">NPM Chart</h1>
        <p className="text-sm text-gray-400">
          Search for a package to see its download stats over time.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter npm package"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 bg-opacity-70 border-2 border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
        <Button
          className="w-full bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
          type="submit"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </form>
      <div className="flex flex-wrap justify-center gap-2">
        {randomPackages.map((pkg) => (
          <Button
            key={pkg}
            onClick={() => router.push(`/package/${pkg.trim()}`)}
            variant="outline"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-800 bg-opacity-70 text-gray-300 hover:bg-opacity-100 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
          >
            {pkg}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;