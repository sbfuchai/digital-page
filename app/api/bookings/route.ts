import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Generate booking ID
function generateBookingId(): string {
  return "AAD" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingId = generateBookingId();
    
    const stmt = db.prepare(`
      INSERT INTO bookings (bookingId, name, phone, email, aadharNumber, serviceType, date, timeSlot)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      bookingId,
      body.name,
      body.phone,
      body.email || null,
      body.aadharNumber,
      body.serviceType,
      body.date,
      body.timeSlot
    );

    return NextResponse.json({
      success: true,
      bookingId: bookingId,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Booking failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stmt = db.prepare("SELECT * FROM bookings ORDER BY createdAt DESC");
    const bookings = stmt.all();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ bookings: [] });
  }
}
