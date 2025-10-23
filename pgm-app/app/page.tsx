"use client";

import MapEmbed from "@/components/MapEmbed";
import { useState } from "react";
import FirebaseTest from "../components/FirebaseTest.jsx";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("Los Angeles");

  return (
    <div className="flex h-screen w-full flex-col">
      <FirebaseTest />
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">Post-Grad Matcher</h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/post" className="text-gray-700 hover:text-gray-900">Post</Link>
          <Link href="/messages" className="text-gray-700 hover:text-gray-900">Messages</Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">Help</Link>
          <div className="h-10 w-10 rounded-full bg-gray-400"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Listings */}
        <div className="w-96 border-r border-gray-300 bg-gray-50">
          {/* Search Area */}
          <div className="border-b border-gray-300 p-4">
            <input
              type="text"
              placeholder="Enter zip code or city"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Listings Header */}
          <div className="border-b border-gray-300 bg-white px-4 py-3 ml-1">
            <h2 className="font-semibold text-gray-800">Listings near Boston, MA</h2>
          </div>

          {/* Scrollable Listings */}
          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="border-b border-gray-200 bg-white p-4 hover:bg-gray-50 ml-1">
                <h3 className="font-semibold">Roommate Listing {i}</h3>
                <p className="text-sm text-gray-600 mt-1">2 bed, 1 bath • $1,200/mo</p>
                <p className="text-sm text-gray-500 mt-1">0.{i} miles away</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 bg-gray-100">
          <MapEmbed query={query} />
        </div>
      </div>
    </div>
  );
}
