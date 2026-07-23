import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    
    const response = await fetch(`https://forum.techcd.lk/api/recent?page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Forum API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Forum API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forum data' },
      { status: 500 }
    );
  }
}
