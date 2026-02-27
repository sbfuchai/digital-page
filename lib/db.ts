import { sql } from '@vercel/postgres';

// Initialize database tables
export async function initDB() {
  try {
    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        copies VARCHAR(10) DEFAULT '1',
        color VARCHAR(10) DEFAULT 'bw',
        notes TEXT,
        files TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_id VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        aadhar_number VARCHAR(12) NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        date VARCHAR(20) NOT NULL,
        time_slot VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Create a new order
export async function createOrder(data: {
  name: string;
  email: string;
  phone?: string;
  copies?: string;
  color?: string;
  notes?: string;
  files: string[];
}) {
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  await sql`
    INSERT INTO orders (order_id, name, email, phone, copies, color, notes, files)
    VALUES (${orderId}, ${data.name}, ${data.email}, ${data.phone || null}, 
            ${data.copies || '1'}, ${data.color || 'bw'}, ${data.notes || null}, 
            ${JSON.stringify(data.files)})
  `;
  
  return { orderId };
}

// Get all orders
export async function getOrders() {
  const result = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return result.rows.map(row => ({
    ...row,
    files: JSON.parse(row.files || '[]')
  }));
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  await sql`UPDATE orders SET status = ${status} WHERE order_id = ${orderId}`;
}

// Create a new booking
export async function createBooking(data: {
  name: string;
  phone: string;
  email?: string;
  aadharNumber: string;
  serviceType: string;
  date: string;
  timeSlot: string;
}) {
  const bookingId = 'AAD' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  await sql`
    INSERT INTO bookings (booking_id, name, phone, email, aadhar_number, service_type, date, time_slot)
    VALUES (${bookingId}, ${data.name}, ${data.phone}, ${data.email || null}, 
            ${data.aadharNumber}, ${data.serviceType}, ${data.date}, ${data.timeSlot})
  `;
  
  return { bookingId };
}

// Get all bookings
export async function getBookings() {
  const result = await sql`SELECT * FROM bookings ORDER BY created_at DESC`;
  return result.rows;
}
