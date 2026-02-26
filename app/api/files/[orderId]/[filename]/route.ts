import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string; filename: string }> }
) {
  try {
    const { orderId, filename } = await params;
    const filePath = path.join(process.cwd(), "data", "uploads", orderId, filename);
    
    const file = await readFile(filePath);
    
    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
