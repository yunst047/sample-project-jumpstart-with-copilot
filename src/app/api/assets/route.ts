import { NextResponse } from 'next/server';
import { getAllAssets, createAsset, getPersonById } from '@/lib/db';

export async function GET() {
  try {
    const assets = getAllAssets();
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { person_id, name, description, value, acquired_date } = body;

    if (!person_id || !name || value === undefined || !acquired_date) {
      return NextResponse.json(
        { error: 'Person ID, name, value, and acquired date are required' },
        { status: 400 }
      );
    }

    // Verify person exists
    const person = getPersonById(person_id);
    if (!person) {
      return NextResponse.json(
        { error: 'Person not found' },
        { status: 404 }
      );
    }

    const asset = createAsset(person_id, name, description, value, acquired_date);
    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error('Error creating asset:', error);
    return NextResponse.json(
      { error: 'Failed to create asset' },
      { status: 500 }
    );
  }
}
