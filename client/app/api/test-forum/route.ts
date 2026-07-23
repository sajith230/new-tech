import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      "https://forum.techcd.lk/api/recent?page=1",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Forum API error: ${response.status}`,
        status: response.status,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      topicsCount: data.topics?.length || 0,
    });
  } catch (error) {
    console.error("Forum API test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
      { status: 500 },
    );
  }
}
