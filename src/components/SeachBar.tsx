'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineSearch } from "react-icons/ai" // Importing the magnifying glass icon

export default function SearchBar() {
    const [pkg, setPkg] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/${pkg.trim()}`);
    }

    return (
        <form className="flex items-center gap-3 mt-4" onSubmit={handleSubmit}>
            <input
                value={pkg}
                onChange={(e) => setPkg(e.target.value)}
                placeholder="Enter npm package"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-300"
                autoFocus
            />
            <button
                className={`p-2 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 transition-all duration-300 ${!pkg ? 'cursor-not-allowed' : ''}`}
                type="submit"
                disabled={!pkg}
            >
                <AiOutlineSearch className="text-white text-lg" /> {/* Magnifying glass icon */}
            </button>
        </form>
    )
}
