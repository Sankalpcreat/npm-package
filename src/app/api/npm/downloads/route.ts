import { NextResponse } from 'next/server';
interface DownloadData {
  downloads: number;
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get('name');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
  }

  // Fetch package metadata to get the first release date
  const metadataRes = await fetch(`https://registry.npmjs.org/${packageName}`);
  if (!metadataRes.ok) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }
  const metadata = await metadataRes.json();
  const firstReleaseDate = metadata.time?.created;

  if (!firstReleaseDate) {
    return NextResponse.json({ error: 'Package launch date not found' }, { status: 404 });
  }

  // Get the current date
  const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

  // Use the first release date to build the range
  const startDate = firstReleaseDate.split('T')[0]; // format: YYYY-MM-DD
  const endDate = today;

  // Fetch download statistics within the dynamic date range
  const res = await fetch(
    `https://api.npmjs.org/downloads/range/${startDate}:${endDate}/${packageName}`
  );
  const data = await res.json();

  // Calculate the cumulative downloads
  const cumulativeDownloads = data.downloads.reduce((acc: number, curr: DownloadData) => acc + curr.downloads, 0);

  return NextResponse.json({
    totalDownloads: cumulativeDownloads,
    downloads: data.downloads,  // For chart data
  });
}
