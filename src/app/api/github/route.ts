
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello World from GET" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Hello World from POST" });
}