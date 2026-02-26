import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings, initDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await initDB();
    const body = await request.json();
    
    const booking = await createBooking({
      name: body.name,
      phone: body.phone,
      email: body.email,
      aadharNumber: body.aadharNumber,
      serviceType: body.serviceType,
      date: body.date,
      timeSlot: body.timeSlot,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.bookingId,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Booking failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initDB();
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ bookings: [] });
  }
}
