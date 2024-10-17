import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get('name');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.npmjs.org/downloads/range/2005-01-01:2023-12-31/${packageName}`
  );
  const data = await res.json();

  const cumulativeDownloads = data.downloads.reduce((acc, curr) => acc + curr.downloads, 0);

  return NextResponse.json({
    totalDownloads: cumulativeDownloads,
    downloads: data.downloads,  // For chart data
  });
}
