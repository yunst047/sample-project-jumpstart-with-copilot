import { NextResponse } from 'next/server';
import { getPersonById, updatePerson, deletePerson } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const personId = parseInt(id, 10);
    
    if (isNaN(personId)) {
      return NextResponse.json(
        { error: 'Invalid person ID' },
        { status: 400 }
      );
    }

    const person = getPersonById(personId);
    
    if (!person) {
      return NextResponse.json(
        { error: 'Person not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    return NextResponse.json(
      { error: 'Failed to fetch person' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const personId = parseInt(id, 10);
    
    if (isNaN(personId)) {
      return NextResponse.json(
        { error: 'Invalid person ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const person = updatePerson(personId, name, email, phone);
    return NextResponse.json(person);
  } catch (error) {
    console.error('Error updating person:', error);
    return NextResponse.json(
      { error: 'Failed to update person' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const personId = parseInt(id, 10);
    
    if (isNaN(personId)) {
      return NextResponse.json(
        { error: 'Invalid person ID' },
        { status: 400 }
      );
    }

    deletePerson(personId);
    return NextResponse.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json(
      { error: 'Failed to delete person' },
      { status: 500 }
    );
  }
}
