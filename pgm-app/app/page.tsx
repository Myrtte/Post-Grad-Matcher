"use client";

import GoogleMapMulti from "@/components/GoogleMapMulti";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Link from "next/link";

import { db } from "@/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

type ListingDoc = {
  id: string;
  title: string;
  name?: string;
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
  const [selectedListing, setSelectedListing] = useState<ListingDoc | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const filteredListings = useMemo(() => {
    const raw = (queryText || "").trim();
    if (!raw || raw.toUpperCase() === "USA") return listings;
    const lower = raw.toLowerCase();
    const zipDigits = /^[0-9]{3,}$/.test(raw) ? raw.replace(/\D/g, "") : null;
    return listings.filter((l) => {
      const cityMatch = (l.city || "").toLowerCase().includes(lower);
      const listingZip = (l as any).zipcode;
      const listingZipStr = typeof listingZip === "number" ? String(listingZip) : (listingZip || "");
      const listingZipDigits = String(listingZipStr).replace(/\D/g, "");
      const zipMatch = zipDigits !== null ? listingZipDigits === zipDigits : false;
      return cityMatch || zipMatch;
    });
  }, [listings, queryText]);

  useEffect(() => {
    if (!db) {
      console.error("Firebase database not initialized");
      setLoading(false);
      return;
    }

    try {
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
    } catch (error) {
      console.error("Error setting up Firebase listener:", error);
      setLoading(false);
    }
  }, []);

  const formatQuery = (q: string) => {
    if(q === "USA") return "Showing All Listings";

    return q
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const openModal = (listing: ListingDoc) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  const handleGetInContact = () => {
    if(selectedListing){
      const makeChatId = (id: string) => {
        const digits = id.replace(/\D/g, "");
        if (digits.length > 0) {
          const n = parseInt(digits, 10);
          return isNaN(n) ? 100 : n + 100;
        }
        let acc = 0 >>> 0;
        for (let i = 0; i < id.length; i++) {
          acc = (((acc * 31) >>> 0) + id.charCodeAt(i)) >>> 0;
        }
        return (acc % 100000000) + 100;
      };
      const chatId = makeChatId(selectedListing.id);
      const contactName = selectedListing.name || selectedListing.title;
      window.location.href = `/messages?chat=${chatId}&name=${encodeURIComponent(contactName)}`;
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-pastel">
      <Navbar selectedPage={"Home"}/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Listings - Narrower like the prototype */}
        <div className="w-80 border-r-2 border-gray-700 bg-pastel-light">
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  const next = (searchInput || "").trim();
                  setQueryText(next.length ? next : "USA");
                  setSearchInput("");
                }
              }}
            />
          </div>

          {/* Scrollable Listings */}
          <div className="overflow-y-auto pb-4" style={{ height: 'calc(100vh - 240px)' }}>
            {filteredListings.map((listing) => (
              <div 
                key={listing.id} 
                className="border-b-2 border-gray-300 bg-pastel-light p-4 hover:bg-pastel-hover transition-colors cursor-pointer"
                onClick={() => setSelectedMapId(listing.id)}
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
                      {listing.city}, {listing.state} {listing.zipcode}
                    </p>
                    <p className="text-sm text-green-600 font-medium mb-1">
                      ${listing.price}/month
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); openModal(listing); }}
                      className="mt-2 border-2 border-gray-700 bg-white px-3 py-1 text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer rounded-sm"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredListings.length === 0 && (
              <div className="p-4 text-sm text-gray-600">No listings match your search.</div>
            )}
            {queryText && queryText.toUpperCase() !== "USA" && (
              <div className="p-4">
                <button
                  onClick={() => { setQueryText("USA"); setSearchInput(""); }}
                  className="w-full border-2 border-gray-700 bg-white px-3 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer rounded-sm"
                >
                  Show All Listings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map Area */}
        <div className="flex-1 bg-[#e8dfc8] relative">
          <GoogleMapMulti 
            listings={listings} 
            queryText={queryText ? queryText : "USA"} 
            selectedId={selectedMapId}
            onSelectId={setSelectedMapId}
          />
        </div>
      </div>

      {/* Listing Modal */}
      {isModalOpen && selectedListing && (
        <div 
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-pastel-light border-3 border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="clear-both">
              <div className="flex w-full justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedListing.title}
                </h2>

                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-red-500/70 text-2xl font-bold -mt-[1] mr-2.5 cursor-pointer"
                >
                  x
                </button>
              </div>

              <div className="space-y-3">
                {selectedListing.name && (
                  <div>
                    <span className="font-semibold text-gray-700">Contact: </span>
                    <span className="text-gray-600">{selectedListing.name}</span>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-gray-700">Address: </span>
                  <span className="text-gray-600">
                    {selectedListing.address}, {selectedListing.city}, {selectedListing.state} {selectedListing.zipcode}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Price: </span>
                  <span className="text-green-600 font-semibold text-lg">
                    ${selectedListing.price}/month
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">Bedrooms: </span>
                    <span className="text-gray-600">{selectedListing.bedrooms}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Bathrooms: </span>
                    <span className="text-gray-600">{selectedListing.bathrooms}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Available Rooms: </span>
                    <span className="text-gray-600">{selectedListing.availableRooms}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Available Bathrooms: </span>
                    <span className="text-gray-600">{selectedListing.availableBathrooms}</span>
                  </div>
                </div>

                {selectedListing.description && (
                  <div>
                    <span className="font-semibold text-gray-700 block mb-2">Description: </span>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {selectedListing.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleGetInContact}
                className="mt-6 w-full border-2 border-gray-700 bg-green-100 hover:bg-green-200 px-6 py-3 text-base font-bold transition-colors cursor-pointer rounded-sm"
              >
                Get in Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
