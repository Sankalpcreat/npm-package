import SearchBar from '@/components/SearchBar';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">NPM Package Search</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
