import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } },
) {
  try {
    const uid = params.uid;

    // Try different user API endpoints
    const endpoints = [
      `https://forum.techcd.lk/api/user/${uid}`,
      `https://forum.techcd.lk/user/${uid}`,
      `https://forum.techcd.lk/api/users/${uid}`,
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();

          return NextResponse.json({
            success: true,
            endpoint: endpoint,
            data: userData,
          });
        }
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      success: false,
      error: "No working user endpoint found",
      uid: uid,
    });
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
