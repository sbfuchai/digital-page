"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, Printer, ArrowLeft, IdCard, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  aadharNumber: string;
  serviceType: string;
  date: string;
  timeSlot: string;
}

const services = [
  { id: "biometric", label: "Biometric Update (Fingerprint/Iris)", description: "Update your fingerprints or iris scan" },
  { id: "mobile", label: "Mobile Number Update", description: "Add or update linked mobile number" },
  { id: "address", label: "Address Update", description: "Update your residential address" },
  { id: "name", label: "Name Correction", description: "Correct spelling mistakes in name" },
  { id: "dob", label: "Date of Birth Update", description: "Update or correct date of birth" },
  { id: "gender", label: "Gender Update", description: "Update gender information" },
  { id: "photo", label: "Photograph Update", description: "Get a new photograph taken" },
];

const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
  { time: "05:00 PM", available: true },
];

// Generate dates for next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays
    if (date.getDay() !== 0) {
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        dayName: date.toLocaleDateString('en-IN', { weekday: 'long' }),
      });
    }
  }
  return dates;
};

export default function AadharAppointment() {
  const [formData, setFormData] = useState<BookingForm>({
    name: "",
    phone: "",
    email: "",
    aadharNumber: "",
    serviceType: "",
    date: "",
    timeSlot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const availableDates = generateDates();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const result = await res.json();
      
      if (result.success) {
        setBookingId(result.bookingId);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">Appointment Booked!</h2>
          
          <p className="text-stone-500 mb-6">
            Your Aadhaar service appointment has been confirmed.
          </p>
          
          <div className="bg-stone-50 rounded-2xl p-6 space-y-4 text-left mb-6">
            <div className="flex justify-between">
              <span className="text-stone-500">Booking ID</span>
              <span className="font-mono font-bold text-stone-800">{bookingId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-stone-500">Date</span>
              <span className="font-medium text-stone-800">
                {availableDates.find(d => d.value === formData.date)?.label}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-stone-500">Time</span>
              <span className="font-medium text-stone-800">{formData.timeSlot}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-stone-500">Service</span>
              <span className="font-medium text-stone-800">
                {services.find(s => s.id === formData.serviceType)?.label}
              </span>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-left text-sm text-amber-800">
                <p className="font-medium mb-1">Please bring:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Original Aadhaar Card</li>
                  <li>One Photo ID Proof</li>
                  <li>Supporting documents for update</li>
                  <li>Appointment confirmation (SMS)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 bg-stone-100 text-stone-700 rounded-xl font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            
            <Link
              href="/"
              className="flex-1 py-3 px-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors text-center"
            >
              Done
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl flex items-center justify-center shadow-lg">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-serif font-semibold text-stone-800">Digital Page</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-stone-400 uppercase tracking-wider">Aadhaar Services</span>
            </div>
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-stone-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Authorized Center</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">West Bengal</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Aadhaar Update Services
          </h1>
          
          <p className="text-xl text-orange-100 max-w-2xl">
            Book an appointment for biometric updates, address changes, and other Aadhaar services. 
            Quick, hassle-free service at our authorized center.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-stone-600" />
              </div>
              <h2 className="text-xl font-semibold text-stone-800">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Full Name (as per Aadhaar) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Aadhaar Number (12 digits) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  pattern="\d{12}"
                  value={formData.aadharNumber}
                  onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-mono tracking-wider"
                  placeholder="XXXX XXXX XXXX"
                />
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                <IdCard className="w-5 h-5 text-stone-600" />
              </div>
              <h2 className="text-xl font-semibold text-stone-800">Select Service</h2>
            </div>

            <div className="grid gap-3">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`
                    flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.serviceType === service.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={formData.serviceType === service.id}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <p className="font-medium text-stone-800">{service.label}</p>
                    <p className="text-sm text-stone-500">{service.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-stone-600" />
              </div>
              <h2 className="text-xl font-semibold text-stone-800">Select Date & Time</h2>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-600 mb-3">
                Preferred Date *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, date: date.value, timeSlot: "" })}
                    className={`
                      p-3 rounded-xl text-center transition-all
                      ${formData.date === date.value
                        ? "bg-stone-900 text-white"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-700"
                      }
                    `}
                  >
                    <span className="block text-xs opacity-70">{date.label.split(' ')[0]}</span>
                    <span className="block font-semibold">{date.label.split(' ')[2]}</span>
                    <span className="block text-xs opacity-70">{date.label.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-3">
                  Available Time Slots *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                      className={`
                        py-3 px-2 rounded-xl text-sm font-medium transition-all
                        ${!slot.available
                          ? "bg-stone-100 text-stone-300 cursor-not-allowed"
                          : formData.timeSlot === slot.time
                            ? "bg-orange-500 text-white"
                            : "bg-stone-50 hover:bg-orange-100 text-stone-700"
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center Information */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-semibold">Center Location</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Digital Page Aadhaar Center</p>
                    <p className="text-stone-400 text-sm">West Bengal, India</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-stone-400 text-sm">Mon - Sat: 9:00 AM - 5:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-stone-400 text-sm">+91 XXXXX XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-2">Important Information</p>
                    <ul className="space-y-1 text-stone-400">
                      <li>• Please arrive 15 minutes early</li>
                      <li>• Bring original Aadhaar card</li>
                      <li>• Photo ID proof mandatory</li>
                      <li>• Mask recommended</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.name || !formData.phone || !formData.aadharNumber || !formData.serviceType || !formData.date || !formData.timeSlot}
            className="w-full py-4 px-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl font-semibold text-lg hover:from-stone-800 hover:to-stone-700 disabled:from-stone-300 disabled:to-stone-300 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Confirm Appointment
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Authorized Aadhaar Enrollment/Update Center. 
            For more info visit <a href="https://uidai.gov.in" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">uidai.gov.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
