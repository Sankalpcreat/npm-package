import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
  
      const response = await fetch(`/api/npm-stats?query=${value}`);
      const data = await response.json();
      setResults(data.packages);
    }
  };

  const handleSelectPackage = (packageName: string) => {
    router.push(`/npm-stats/${packageName}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded"
        placeholder="Search NPM packages..."
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 mt-2 w-full z-10">
          {results.map((pkg: any) => (
            <li
              key={pkg.name}
              onClick={() => handleSelectPackage(pkg.name)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {pkg.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
