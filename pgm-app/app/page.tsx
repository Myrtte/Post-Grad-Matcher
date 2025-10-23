"use client";

import MapEmbed from "@/components/MapEmbed";
import { useState } from "react";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  const [query, setQuery] = useState("USA");

  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar selectedPage={"Home"}/>

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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
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
