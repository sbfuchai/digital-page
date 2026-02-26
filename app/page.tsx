"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, CheckCircle, Printer, Clock, Shield, MapPin, Phone, Mail, ChevronRight, Sparkles, Zap, Award, FileText, IdCard } from "lucide-react";
import Link from "next/link";

interface UploadResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    copies: "1",
    color: "bw",
    notes: "",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 50 * 1024 * 1024,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    
    const data = new FormData();
    files.forEach((file) => data.append("files", file));
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("copies", formData.copies);
    data.append("color", formData.color);
    data.append("notes", formData.notes);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result: UploadResponse = await res.json();
      
      if (result.success) {
        setOrderId(result.orderId || "");
        setUploaded(true);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (uploaded) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-12 h-12 text-orange-600" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-serif text-stone-800">Order Received</h1>
            <p className="text-stone-500">
              Your order ID is{" "}
              <span className="font-mono font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                {orderId}
              </span>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4">
            <div className="flex items-center gap-3 text-stone-600">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>We&apos;ll notify you when ready for pickup</span>
            </div>
            <div className="flex items-center gap-3 text-stone-600">
              <Phone className="w-5 h-5 text-orange-500" />
              <span>Questions? Call us anytime</span>
            </div>
          </div>
          <button
            onClick={() => {
              setUploaded(false);
              setFiles([]);
              setFormData({ name: "", email: "", phone: "", copies: "1", color: "bw", notes: "" });
            }}
            className="text-stone-400 hover:text-orange-600 transition-colors font-medium"
          >
            ← Send another file
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-serif font-semibold text-stone-800">Digital Page</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-stone-400 uppercase tracking-wider">Professional Services</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/services/forms" className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors">
                Gov't Forms
              </Link>
              <Link href="/services/aadhar" className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors">
                Aadhaar
              </Link>
            </nav>
            <Link
              href="/owner"
              className="text-sm text-stone-500 hover:text-orange-600 transition-colors font-medium"
            >
              Owner Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">Fast • Reliable • Local</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight">
                Print Your{" "}
                <span className="gradient-text">Documents</span>{" "}
                With Ease
              </h1>
              
              <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                Upload your files, choose your preferences, and pick up your prints when they&apos;re ready. 
                Professional quality printing right here in Dubai.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="#upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Printing
                  <ChevronRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 text-stone-500">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Secure file handling</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rounded-full opacity-10"></div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <File className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">Document.pdf</p>
                        <p className="text-sm text-stone-400">2.4 MB</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <File className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">Presentation.pptx</p>
                        <p className="text-sm text-stone-400">5.1 MB</p>
                      </div>
                      <div className="ml-auto">
                        <div className="px-3 py-1 bg-orange-100 rounded-full">
                          <span className="text-xs font-medium text-orange-700">Printing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-sm">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span>Ready for pickup in 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <section id="upload" className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-3">Upload Your Files</h2>
            <p className="text-stone-500">Drag and drop or click to browse. We accept PDF, Word, and images.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                  transition-all-300
                  ${isDragActive 
                    ? "border-orange-500 bg-orange-50 animate-pulse-ring" 
                    : "border-stone-300 hover:border-orange-400 hover:bg-stone-50"
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-orange-500" />
                </div>
                <p className="text-lg font-medium text-stone-700 mb-2">
                  {isDragActive ? "Drop files here" : "Drag & drop files"}
                </p>
                <p className="text-stone-400">
                  or click to browse from your computer
                </p>
                <p className="text-stone-400 text-sm mt-4">
                  PDF, Word (.doc, .docx), Images (PNG, JPG) up to 50MB
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-stone-600 mb-3">Selected files:</p>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <File className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-700">{file.name}</p>
                          <p className="text-xs text-stone-400">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact & Options */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 space-y-6">
              <h3 className="text-lg font-semibold text-stone-800">Your Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>

              <h3 className="text-lg font-semibold text-stone-800 pt-4">Print Options</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">
                    Number of Copies
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.copies}
                    onChange={(e) => setFormData({ ...formData, copies: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">
                    Print Type
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  >
                    <option value="bw">⬛ Black & White</option>
                    <option value="color">🎨 Color</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all resize-none"
                  placeholder="Any specific requirements? (e.g., double-sided, binding, paper type)"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="w-full py-4 px-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-xl font-semibold text-lg hover:from-stone-800 hover:to-stone-700 disabled:from-stone-300 disabled:to-stone-300 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                `Submit Order${files.length > 0 ? ` (${files.length} file${files.length > 1 ? 's' : ''})` : ''}`
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-medium text-sm uppercase tracking-wider">More Services</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2 mb-4">Government Services</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">We also assist with government documentation and Aadhaar services.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/services/forms" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 hover:border-orange-300 hover:shadow-xl transition-all h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">West Bengal</span>
                    </div>
                    <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-blue-600 transition-colors">Government Grant Forms</h3>
                    <p className="text-stone-500 mb-4">Download official application forms for Kanyashree, Rupashree, Lakshmir Bhandar, Student Credit Card, and other West Bengal government schemes.</p>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
                      Browse Forms 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/services/aadhar" className="group">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 hover:border-orange-300 hover:shadow-xl transition-all h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IdCard className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Authorized Center</span>
                    </div>
                    <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-green-600 transition-colors">Aadhaar Update Services</h3>
                    <p className="text-stone-500 mb-4">Book appointments for biometric updates, address changes, mobile number updates, and other Aadhaar services at our authorized enrollment center.</p>
                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                      Book Appointment
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Why Choose Digital Page?</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Professional printing services trusted by businesses and individuals across Dubai.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-stone-100 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Easy Upload</h3>
              <p className="text-stone-500 leading-relaxed">Drag and drop your files instantly. No account required. Just upload and go.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-stone-100 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Fast Turnaround</h3>
              <p className="text-stone-500 leading-relaxed">Most orders ready within 24 hours. Rush service available for urgent prints.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-stone-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-stone-100 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Premium Quality</h3>
              <p className="text-stone-500 leading-relaxed">High-quality paper and professional printers ensure crisp, vibrant results every time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-400 font-medium text-sm uppercase tracking-wider">Visit Us</span>
              <h2 className="text-4xl font-serif font-bold mt-3 mb-6">Pick Up Your Prints</h2>
              <p className="text-stone-400 mb-8 leading-relaxed">
                Conveniently located in the heart of Dubai. Come by and collect your prints when they&apos;re ready.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-stone-400">Dubai, United Arab Emirates</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-stone-400">Sun - Thu: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-stone-400">hello@digitalpage.ae</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-stone-800 rounded-3xl p-8">
              <div className="aspect-video bg-stone-700 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <p className="text-stone-300">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Printer className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-serif font-semibold text-white">Digital Page</span>
            </div>
            
            <p className="text-sm">© {new Date().getFullYear()} Digital Page. Professional printing services in Dubai.</p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Upload</Link>
              <Link href="/owner" className="hover:text-white transition-colors">Owner</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
