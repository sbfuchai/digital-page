import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const stmt = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC");
    const rows = stmt.all() as any[];
    
    const orders = rows.map(row => ({
      ...row,
      files: JSON.parse(row.files)
    }));
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ orders: [] });
  }
}
