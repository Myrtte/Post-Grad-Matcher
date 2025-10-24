"use client";

import MapEmbed from "@/components/MapEmbed";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Link from "next/link";

import { db } from "@/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

type ListingDoc = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  availableRooms: number;
  availableBathrooms: number;
  description?: string;
  createdAt?: unknown;
}
export default function Home() {
  const [queryText, setQueryText] = useState("USA");
  const [listings, setListings] = useState<ListingDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "listings"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() as any })) as ListingDoc[];
      setListings(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Mock data for listings
  // const listings = [
    // { id: 1, name: "Sammy W.", beds: 2, baths: 2, location: "Brooklyn, NY", price: 1200, distance: 0.1, hasPhoto: true, tags: [] },
    // { id: 2, name: "Tom D.", beds: 3, baths: 2, location: "Manhattan, NY", price: 1500, distance: 0.2, hasPhoto: true, tags: [] },
    // { id: 3, name: "Julia B.", beds: 2, baths: 1, location: "Times Square", price: 1350, distance: 0.3, hasPhoto: true, tags: ["Studio"] },
    // { id: 4, name: "Brian B.", beds: 2, baths: 2, location: "Manhattan, NY", price: 1400, distance: 0.4, hasPhoto: true, tags: ["Dog ⭐"] },
    // { id: 5, name: "Sarah K.", beds: 1, baths: 1, location: "Queens, NY", price: 950, distance: 0.5, hasPhoto: true, tags: [] },
    // { id: 6, name: "Mike R.", beds: 3, baths: 2, location: "Bronx, NY", price: 1100, distance: 0.6, hasPhoto: true, tags: [] },
    // { id: 7, name: "Emma L.", beds: 2, baths: 1, location: "Staten Island, NY", price: 1050, distance: 0.7, hasPhoto: true, tags: ["Cat"] },
    // { id: 8, name: "Chris P.", beds: 2, baths: 1, location: "Brooklyn, NY", price: 1250, distance: 0.8, hasPhoto: true, tags: [] },
  // ];

  const formatQuery = (q: string) => {
    if(q === "USA") return "New York, New York";

    return q
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  return (
    <div className="flex h-screen w-full flex-col bg-pastel">
      <Navbar selectedPage={"Home"}/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Listings - Narrower like the prototype */}
        <div className="w-80 border-r-2 border-gray-700 bg-pastel">
          {/* Search Area */}
          <div className="border-b-2 border-gray-700 bg-pastel p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter a search area
            </label>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {queryText === "USA" ? "Listings Near" : `Listings Near`}
            </h2>
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              {queryText ? formatQuery(queryText) : ""}
            </h3>
            <input
              type="text"
              placeholder="Enter zip code or city"
              className="w-full border-2 border-gray-700 bg-white px-3 py-2 outline-none transition-colors rounded-sm"
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  setQueryText(e.currentTarget.value);
                }
              }}
            />
          </div>

          {/* Scrollable Listings */}
          <div className="overflow-y-auto pb-4" style={{ height: 'calc(100vh - 240px)' }}>
            {listings.map((listing) => (
              <div 
                key={listing.id} 
                className="border-b-2 border-gray-300 bg-pastel-light p-4 hover:bg-pastel-hover transition-colors cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  {/* Thumbnail placeholder */}
                  <div className="shrink-0">
                    <div className="w-20 h-25 border-2 border-gray-700 bg-white flex items-center justify-center rounded-sm">
                      <span className="text-xs text-gray-500 text-center px-1">
                        Pic of<br/>Apartment
                      </span>
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-base mb-1">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      {listing.bedrooms} bed, {listing.bathrooms} bath
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {(() => {
                        if (listing.address) {
                          return `${listing.address}, ${listing.city}, ${listing.state}`;
                        } else {
                          return `${listing.city}, ${listing.state} ${listing.zipcode}`;
                        }
                        })()}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold mb-2">
                      ${listing.price ?? 0} / mo
                    </p>
                    <div>
                    <button className="mt-2 border-2 border-gray-700 bg-white px-3 py-1 text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer rounded-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 bg-[#e8dfc8] relative">
          <MapEmbed query={queryText ? queryText : "USA"} />
        </div>
      </div>
    </div>
  );
}
