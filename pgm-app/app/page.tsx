"use client";

import MapEmbed from "@/components/MapEmbed";
import { useState, useEffect } from "react";
import FirebaseTest from "../components/FirebaseTest.jsx";
import Link from "next/link";
import profileIcon from "../public/PGM Icon.png"
import Image from "next/image.js";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  contactInfo: string;
  createdAt: any;
}

export default function Home() {
  const [query, setQuery] = useState("USA");
  const [showFirebaseTest, setShowFirebaseTest] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings from Firebase
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const snapshot = await getDocs(listingsRef);
        const listingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];
        setListings(listingsData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Firebase Test Modal */}
      {showFirebaseTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg bg-white p-6 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowFirebaseTest(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              X
            </button>

            {/* Modal Content */}
            <FirebaseTest />
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between border-b border-gray-400 bg-pastel px-6 py-4">
        <h1 className="text-2xl font-bold">Post-Grad Matcher</h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <span onClick={() => setShowFirebaseTest(true)} className="text-gray-700 hover:text-gray-900 cursor-pointer">Firebase Test</span>
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/post" className="text-gray-700 hover:text-gray-900">Post</Link>
          <Link href="/messages" className="text-gray-700 hover:text-gray-900">Messages</Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">Help</Link>
          <Image 
            src={profileIcon} 
            alt="Profile" 
            width={30} 
            height={30} 
            className="rounded-full border border-gray-600"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Listings */}
        <div className="w-96 border-r border-gray-400 bg-pastel">
          {/* Search Area */}
          <div className="border-b border-gray-400 p-4">
            <h2 className="font-semibold text-gray-800">
              {query === "USA" ? `Enter a search area to look for listings...` : `Listings near ${query}`}
            </h2>
            <input
              type="text"
              placeholder="Enter zip code or city"
              className="w-full border-b border-gray-400 px-1 outline-none mt-2"
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  setQuery(e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Scrollable Listings */}
          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading listings...</div>
            ) : listings.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No listings found</div>
            ) : (
              listings.map((listing) => (
                <div key={listing.id} className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{listing.bedrooms} bed, {listing.bathrooms} bath • ${listing.price}/mo</p>
                  <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 bg-gray-100">
          <MapEmbed query={query} listings={listings} />
        </div>
      </div>
    </div>
  );
}
