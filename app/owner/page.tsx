"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Printer, CheckCircle, Clock, LogOut, Search, Filter, Sparkles, Users, Calendar } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  orderId: string;
  name: string;
  email: string;
  phone: string | null;
  copies: string;
  color: string;
  notes: string | null;
  files: string[];
  status: "pending" | "printed";
  createdAt: string;
}

interface Booking {
  id: string;
  bookingId: string;
  name: string;
  phone: string;
  email: string | null;
  aadharNumber: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: string;
}

export default function OwnerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "aadhar">("orders");
  const [filter, setFilter] = useState<"all" | "pending" | "printed">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (authenticated) {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  const fetchData = async () => {
    try {
      const [ordersRes, bookingsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/bookings"),
      ]);
      
      const ordersData = await ordersRes.json();
      const bookingsData = await bookingsRes.json();
      
      setOrders(ordersData.orders || []);
      setBookings(bookingsData.bookings || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsPrinted = async (orderId: string) => {
    try {
      await fetch(`/api/orders/${orderId}/print`, { method: "POST" });
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, status: "printed" } : o
        )
      );
    } catch (error) {
      console.error("Failed to mark as printed:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "digitalpage2024") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const filteredOrders = orders
    .filter((o) => filter === "all" || o.status === filter)
    .filter((o) => 
      search === "" || 
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId.toLowerCase().includes(search.toLowerCase())
    );

  const filteredBookings = bookings.filter((b) =>
    search === "" || 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.phone.includes(search) ||
    b.bookingId.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const todayBookings = bookings.filter((b) => {
    const today = new Date().toISOString().split('T')[0];
    return b.date === today;
  }).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-orange-50/30 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-3xl shadow-xl border border-stone-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Printer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-800">Digital Page</h1>
            <p className="text-stone-400 mt-1">Owner Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl font-medium hover:from-stone-800 hover:to-stone-700 transition-all"
            >
              Access Dashboard
            </button>
          </form>
          
          <Link
            href="/"
            className="block text-center text-stone-400 text-sm mt-6 hover:text-orange-600 transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl flex items-center justify-center">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif font-semibold text-lg">Digital Page</span>
              <span className="text-xs text-stone-400 ml-2">Owner</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {pendingCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">{pendingCount} pending orders</span>
              </div>
            )}
            
            <Link
              href="/"
              className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-stone-50 rounded-2xl p-4">
              <p className="text-sm text-stone-500">Total Orders</p>
              <p className="text-3xl font-bold text-stone-800">{orders.length}</p>
            </div>
            
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-sm text-orange-600">Pending</p>
              <p className="text-3xl font-bold text-orange-700">{pendingCount}</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-sm text-blue-600">Aadhaar Bookings</p>
              <p className="text-3xl font-bold text-blue-700">{bookings.length}</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <p className="text-sm text-green-600">Today's Bookings</p>
              <p className="text-3xl font-bold text-green-700">{todayBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === "orders"
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
              }
            `}
          >
            <Printer className="w-4 h-4" />
            Print Orders
          </button>
          
          <button
            onClick={() => setActiveTab("aadhar")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === "aadhar"
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
              }
            `}
          >
            <Users className="w-4 h-4" />
            Aadhaar Bookings
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab === "orders" ? "orders" : "bookings"}...`}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          {activeTab === "orders" && (
            <div className="flex gap-2">
              {(["all", "pending", "printed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-4 py-2 rounded-xl font-medium text-sm transition-colors
                    ${filter === f
                      ? "bg-stone-900 text-white"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
                    }
                  `}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : activeTab === "orders" ? (
            filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-stone-400" />
                </div>
                <p className="text-stone-500">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className={`
                    bg-white rounded-2xl border p-6 transition-all
                    ${order.status === "pending" 
                      ? "border-orange-200 shadow-sm" 
                      : "border-stone-200 opacity-60"
                    }
                  `}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-lg font-bold text-stone-800 bg-stone-100 px-3 py-1 rounded-lg">
                              #{order.orderId}
                            </span>
                            <span
                              className={`
                                px-3 py-1 rounded-full text-xs font-medium
                                ${order.status === "pending"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-green-100 text-green-700"
                                }
                              `}
                            >
                              {order.status === "pending" ? "Pending" : "Printed"}
                            </span>
                          </div>
                          <p className="text-sm text-stone-400">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Users className="w-5 h-5 text-stone-400" />
                          </div>
                          <div>
                            <p className="font-medium text-stone-800">{order.name}</p>
                            <p className="text-sm text-stone-500">{order.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-stone-100 rounded-lg text-sm">
                          {order.copies} {order.copies === "1" ? "copy" : "copies"}
                        </span>
                        <span className={`
                          px-3 py-1 rounded-lg text-sm
                          ${order.color === "color" 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-stone-200 text-stone-700"
                          }
                        `}>
                          {order.color === "color" ? "🎨 Color" : "⬛ B&W"}
                        </span>
                      </div>

                      {order.notes && (
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                          <p className="text-sm text-amber-800">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="lg:w-72 space-y-3">
                      <p className="text-sm font-medium text-stone-600">Files ({order.files.length})</p>
                      
                      <div className="space-y-2">
                        {order.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <FileText className="w-4 h-4 text-orange-500" />
                              </div>
                              <span className="text-sm text-stone-700 truncate">{file}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.status === "pending" && (
                        <button
                          onClick={() => markAsPrinted(order.orderId)}
                          className="w-full py-3 px-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl font-medium hover:from-stone-800 hover:to-stone-700 transition-all flex items-center justify-center gap-2"
                        >
                          <Printer className="w-4 h-4" />
                          Mark as Printed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-stone-400" />
                </div>
                <p className="text-stone-500">No bookings found.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-lg font-bold text-stone-800 bg-blue-100 px-3 py-1 rounded-lg">
                              #{booking.bookingId}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Aadhaar
                            </span>
                          </div>
                          <p className="text-sm text-stone-400">
                            Booked: {new Date(booking.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-stone-50 rounded-xl">
                          <p className="text-sm text-stone-500 mb-1">Name</p>
                          <p className="font-medium text-stone-800">{booking.name}</p>
                        </div>
                        
                        <div className="p-4 bg-stone-50 rounded-xl">
                          <p className="text-sm text-stone-500 mb-1">Phone</p>
                          <p className="font-medium text-stone-800">{booking.phone}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-600 mb-1">Service</p>
                        <p className="font-medium text-stone-800">{booking.serviceType}</p>
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Appointment</span>
                        </div>
                        <p className="text-2xl font-bold text-stone-800">{booking.date}</p>
                        <p className="text-lg text-stone-600">{booking.timeSlot}</p>
                      </div>

                      <div className="p-4 bg-stone-100 rounded-xl">
                        <p className="text-sm text-stone-500 mb-1">Aadhaar Number</p>
                        <p className="font-mono font-medium text-stone-800">XXXX XXXX {booking.aadharNumber.slice(-4)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
