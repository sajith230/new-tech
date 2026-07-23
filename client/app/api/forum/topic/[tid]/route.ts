import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { tid: string } }
) {
  try {
    const tid = params.tid;
    
    const response = await fetch(`https://forum.techcd.lk/api/topic/${tid}`, {
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
    console.error('Forum topic API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic data' },
      { status: 500 }
    );
  }
}
