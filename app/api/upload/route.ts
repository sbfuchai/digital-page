import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import db from "@/lib/db";

const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");

// Generate random order ID
function generateOrderId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    
    // Ensure uploads directory exists
    await mkdir(UPLOADS_DIR, { recursive: true });
    
    const orderId = generateOrderId();
    const orderDir = path.join(UPLOADS_DIR, orderId);
    await mkdir(orderDir, { recursive: true });

    const fileNames: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(orderDir, file.name);
      await writeFile(filePath, buffer);
      fileNames.push(file.name);
    }

    // Insert into SQLite
    const stmt = db.prepare(`
      INSERT INTO orders (orderId, name, email, phone, copies, color, notes, files, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      orderId,
      formData.get("name") as string,
      formData.get("email") as string,
      (formData.get("phone") as string) || null,
      (formData.get("copies") as string) || "1",
      (formData.get("color") as string) || "bw",
      (formData.get("notes") as string) || null,
      JSON.stringify(fileNames),
      "pending"
    );

    return NextResponse.json({
      success: true,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
