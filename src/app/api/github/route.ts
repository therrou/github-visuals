
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World from GET" });
}

export async function POST(request: Request, response: Response) {
  console.log("HERE ====================== REQUEST", request);
  return new Response('Success from NEXT JS', {
    status: 200,
  })
}