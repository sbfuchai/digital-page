import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const stmt = db.prepare("UPDATE orders SET status = ? WHERE orderId = ?");
    const result = stmt.run("printed", id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
