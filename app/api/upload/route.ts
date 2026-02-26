import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { createOrder, initDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Initialize DB (creates tables if not exist)
    await initDB();
    
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    
    // Upload files to Vercel Blob
    const fileNames: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const blob = await put(file.name, bytes, {
        access: "public",
      });
      fileNames.push(blob.url); // Store the blob URL
    }

    // Create order in database
    const order = await createOrder({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      copies: (formData.get("copies") as string) || "1",
      color: (formData.get("color") as string) || "bw",
      notes: (formData.get("notes") as string) || undefined,
      files: fileNames,
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}
