import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { chatbotBrainQuery } from "@/sanity/queries";

export const revalidate = 60; // ISR — cache 60 s

export async function GET() {
  try {
    const brain = await client.fetch<{ greeting: string }>(chatbotBrainQuery);
    return NextResponse.json({ greeting: brain?.greeting ?? null });
  } catch {
    return NextResponse.json({ greeting: null });
  }
}
