import Chart from '@/components/Chart';

const PackagePage = async ({ params }: { params: { name: string } }) => {
  const packageName = params.name;

  // Use Vercel production URL directly, no need for environment variable check
  const baseUrl = 'https://npmpackage.vercel.app'; // Direct Vercel application URL

  // Fetch package details with absolute URL
  const detailsRes = await fetch(`${baseUrl}/api/npm/details?name=${packageName}`);
  const details = await detailsRes.json();

  // Fetch download stats with absolute URL
  const downloadsRes = await fetch(`${baseUrl}/api/npm/downloads?name=${packageName}`);
  const downloadData = await downloadsRes.json();

  // Get the package release date from the details (assuming it's available in the response)
  const releaseDate = new Date(details.date); // Assuming `details.date` contains the release date

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
          <pattern id="chart" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 0 L50 100 L100 50 L150 120 L200 80" fill="none" stroke="rgba(255,0,0,0.1)" strokeWidth="2"/>
            <circle cx="50" cy="100" r="3" fill="rgba(255,0,0,0.2)"/>
            <circle cx="100" cy="50" r="3" fill="rgba(255,0,0,0.2)"/>
            <circle cx="150" cy="120" r="3" fill="rgba(255,0,0,0.2)"/>
          </pattern>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#chart)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Main container for package details, set width to half */}
      <div className="relative z-10 p-8 max-w-2xl mx-auto bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-xl shadow-2xl mb-8 border border-gray-800">

        <h1 className="text-4xl font-bold text-white">{details.name}</h1>
        <p className="text-gray-300">Version: {details.version}</p>
        <p className="text-gray-300">{details.description}</p>
        <div className="mt-4 bg-gray-700 p-4 rounded-lg">
          <p className="text-white">Total Downloads: {downloadData.totalDownloads.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart section centered below the main container */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <div className="flex justify-center">
          <Chart downloads={downloadData.downloads} releaseDate={releaseDate} className="w-full h-64 md:h-96" />
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
