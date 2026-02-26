import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string; filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Since files are now stored as blob URLs in the database,
    // we need to get the order and redirect to the blob URL
    // For now, we'll assume the filename contains the blob URL or is a direct link
    
    // If it's already a full URL, redirect to it
    if (filename.startsWith('http')) {
      return NextResponse.redirect(filename);
    }
    
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
