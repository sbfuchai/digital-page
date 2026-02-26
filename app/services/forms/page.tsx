"use client";

import { useState } from "react";
import { FileText, Download, Search, Printer, ArrowLeft, ExternalLink, Building2, GraduationCap, HeartHandshake, Sprout, Users, Banknote } from "lucide-react";
import Link from "next/link";

interface Form {
  id: string;
  title: string;
  category: string;
  department: string;
  description: string;
  downloadUrl: string;
  fileSize: string;
  language: string;
}

const governmentForms: Form[] = [
  {
    id: "kanyashree",
    title: "Kanyashree Prakalpa Application",
    category: "women",
    department: "Women & Child Development",
    description: "Financial assistance for unmarried girls aged 13-18 to continue education. Annual scholarship of ₹750 and one-time grant of ₹25,000 at age 18.",
    downloadUrl: "/forms/kanyashree-prakalpa.pdf",
    fileSize: "245 KB",
    language: "Bengali / English"
  },
  {
    id: "rupashree",
    title: "Rupashree Prakalpa Application",
    category: "women",
    department: "Women & Child Development",
    description: "One-time financial grant of ₹25,000 for marriage of girls aged 18+ from economically weaker families.",
    downloadUrl: "/forms/rupashree-prakalpa.pdf",
    fileSize: "198 KB",
    language: "Bengali / English"
  },
  {
    id: "lakshmir-bhandar",
    title: "Lakshmir Bhandar Scheme Form",
    category: "women",
    department: "Women & Child Development",
    description: "Monthly financial assistance of ₹1,000 (general) or ₹1,200 (SC/ST) for female heads of households.",
    downloadUrl: "/forms/lakshmir-bhandar.pdf",
    fileSize: "312 KB",
    language: "Bengali"
  },
  {
    id: "student-credit-card",
    title: "Student Credit Card Application",
    category: "education",
    department: "Higher Education",
    description: "Soft loan up to ₹10 lakh at 4% interest for higher education in India or abroad.",
    downloadUrl: "/forms/student-credit-card.pdf",
    fileSize: "425 KB",
    language: "Bengali / English"
  },
  {
    id: "sikshashree",
    title: "Sikshashree Scheme Form",
    category: "education",
    department: "Backward Classes Welfare",
    description: "Annual stipend for SC/ST students in classes V-VIII. Amount: ₹750-₹1,500 per year.",
    downloadUrl: "/forms/sikshashree.pdf",
    fileSize: "156 KB",
    language: "Bengali"
  },
  {
    id: "krishak-bandhu",
    title: "Krishak Bandhu Application",
    category: "agriculture",
    department: "Agriculture",
    description: "Annual financial assistance of ₹10,000 (₹5,000 twice yearly) for farmers. Also includes death benefit of ₹2 lakh.",
    downloadUrl: "/forms/krishak-bandhu.pdf",
    fileSize: "378 KB",
    language: "Bengali"
  },
  {
    id: "cooch-behar-pension",
    title: "Old Age Pension Form",
    category: "social",
    department: "Social Welfare",
    description: "Monthly pension of ₹1,000 for senior citizens above 60 years from economically weaker sections.",
    downloadUrl: "/forms/old-age-pension.pdf",
    fileSize: "234 KB",
    language: "Bengali"
  },
  {
    id: "disability-pension",
    title: "Disability Pension Application",
    category: "social",
    department: "Social Welfare",
    description: "Monthly pension of ₹1,000 for persons with 40% or more disability.",
    downloadUrl: "/forms/disability-pension.pdf",
    fileSize: "267 KB",
    language: "Bengali"
  },
  {
    id: "widow-pension",
    title: "Widow Pension Form",
    category: "social",
    department: "Social Welfare",
    description: "Monthly pension of ₹1,000 for widows aged 18-60 years.",
    downloadUrl: "/forms/widow-pension.pdf",
    fileSize: "189 KB",
    language: "Bengali"
  },
  {
    id: " Swasthya-sathi",
    title: "Swasthya Sathi Enrollment",
    category: "health",
    department: "Health & Family Welfare",
    description: "Health insurance card providing cashless treatment up to ₹5 lakh per family per year.",
    downloadUrl: "/forms/swasthya-sathi.pdf",
    fileSize: "445 KB",
    language: "Bengali / English"
  },
  {
    id: "yuvasree",
    title: "Yuvasree Prakalpa Form",
    category: "employment",
    department: "Labour",
    description: "Unemployment allowance of ₹1,500/month for registered unemployed youth (18-45 years).",
    downloadUrl: "/forms/yuvasree.pdf",
    fileSize: "298 KB",
    language: "Bengali"
  },
  {
    id: "geetanjali",
    title: "Geetanjali Housing Scheme",
    category: "housing",
    department: "Housing",
    description: "Housing assistance for homeless families. Grant up to ₹1.2 lakh for house construction.",
    downloadUrl: "/forms/geetanjali-housing.pdf",
    fileSize: "356 KB",
    language: "Bengali"
  }
];

const categories = [
  { id: "all", label: "All Forms", icon: FileText },
  { id: "women", label: "Women Welfare", icon: HeartHandshake },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "agriculture", label: "Agriculture", icon: Sprout },
  { id: "social", label: "Social Welfare", icon: Users },
  { id: "health", label: "Health", icon: Building2 },
  { id: "employment", label: "Employment", icon: Banknote },
  { id: "housing", label: "Housing", icon: Building2 },
];

export default function GovernmentForms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredForms = governmentForms.filter((form) => {
    const matchesSearch = 
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <span className="hidden sm:inline-block ml-2 text-xs text-stone-400 uppercase tracking-wider">Govt. Services</span>
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
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-orange-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">West Bengal Government</span>
            <span className="px-3 py-1 bg-orange-500/20 rounded-full text-sm font-medium text-orange-300">Digital Services</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Government Grant Forms
          </h1>
          
          <p className="text-xl text-stone-300 max-w-2xl">
            Download official application forms for West Bengal government schemes. 
            Print, fill, and submit with ease.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search forms by name, department, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
                    ${selectedCategory === cat.id
                      ? "bg-stone-900 text-white shadow-lg"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Forms List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-stone-800">
            {filteredForms.length} Form{filteredForms.length !== 1 ? 's' : ''} Available
          </h2>
          
          <p className="text-sm text-stone-500">
            Showing forms for West Bengal state schemes
          </p>
        </div>

        <div className="grid gap-4">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-orange-600" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-stone-800 group-hover:text-orange-600 transition-colors">
                        {form.title}
                      </h3>
                      <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600 whitespace-nowrap">
                        {form.department}
                      </span>
                    </div>
                    
                    <p className="text-stone-600 mt-2">{form.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      PDF • {form.fileSize}
                    </span>
                    <span className="text-stone-300">|</span>
                    <span>Available in: {form.language}</span>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={form.downloadUrl}
                  download
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredForms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <p className="text-stone-500">No forms found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="text-orange-600 font-medium mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Info Section */}
      <section className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Print & Fill</h3>
              <p className="text-sm text-stone-500">Download forms, print them, and fill out manually or type digitally.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Submit to Office</h3>
              <p className="text-sm text-stone-500">Submit completed forms at the respective government office or Common Service Centre.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">Track Status</h3>
              <p className="text-sm text-stone-500">Use your application number to track status on the official government portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Forms are sourced from official West Bengal Government websites. 
            Always verify current versions at <a href="https://wb.gov.in" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">wb.gov.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
