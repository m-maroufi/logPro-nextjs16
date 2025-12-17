import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("api is here", request);
  return NextResponse.json({ message: "Blog created" });
}
