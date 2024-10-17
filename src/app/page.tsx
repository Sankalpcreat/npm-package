// src/app/page.tsx
'use client';

import { useState } from 'react';
import SearchBar from '@/components/SeachBar';

const packages = ['vue', 'react', 'svelte', '@angular/core', 'solid-js', 'next', 'hono', 'fastify', 'nuxt', 'astro', 'supabase', 'express', 'typescript', 'vite'];

export default function Home() {
  const [randomPackages] = useState(() => packages.sort(() => 0.5 - Math.random()).slice(0, 4));
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold uppercase">NPM Chart</h1>
      <p className="text-sm text-gray-500 mt-1 text-center">Search for a package to see its download stats over time.</p>
      <SearchBar />
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {randomPackages.map((pkg) => (
          <button 
          key={pkg} 
          onClick={() => navigateTo(`/${pkg.trim()}`)} 
          className=" mt-2 px-4 py-2 rounded-full text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 disabled:bg-gray-300 transition-all duration-300">
          {pkg}
      </button>
      
        ))}
      </div>
    </div>
  );
}
