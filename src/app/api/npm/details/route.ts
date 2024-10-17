import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get('name');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
  }

  const res = await fetch(`https://registry.npmjs.org/${packageName}`);
  const data = await res.json();

  const latestVersion = data['dist-tags'].latest;
  const description = data.description;

  return NextResponse.json({
    name: data.name,
    version: latestVersion,
    description: description,
  });
}
