import { NextResponse } from "next/server";
import { getOrders, initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const orders = await getOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ orders: [] });
  }
}
