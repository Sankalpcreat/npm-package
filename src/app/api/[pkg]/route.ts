
import { NextResponse } from 'next/server';
import { fetchNpmPackage } from '@/lib/fetchNpmPackage';

export async function GET(request: Request, { params }: { params: { pkg: string } }) {
  const data = await fetchNpmPackage(params.pkg);
  return NextResponse.json(data);
}
