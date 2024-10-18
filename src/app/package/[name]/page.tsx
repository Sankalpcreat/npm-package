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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{details.name}</h1>
      <p>Version: {details.version}</p>
      <p>{details.description}</p>
      <p>Total Downloads: {downloadData.totalDownloads.toLocaleString()}</p>

      <div className="mt-8">
        <Chart downloads={downloadData.downloads} releaseDate={new Date(releaseDate)} />
      </div>
    </div>
  );
};

export default PackagePage;
