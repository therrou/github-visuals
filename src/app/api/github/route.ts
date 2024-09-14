
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World from GET" });
}

export async function POST() {
  return NextResponse.json({ message: "Hello World from POST" });
}