import { NextResponse } from "next/server";
import { updateOrderStatus, initDB } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await initDB();
    await updateOrderStatus(id, "printed");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
