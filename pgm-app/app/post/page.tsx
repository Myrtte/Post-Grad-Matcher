"use client";

import { useState } from "react";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    availableRooms: "",
    availableBathrooms: "",
    description: "",
    contactInfo: "",
    amenities: {
      pool: false,
      workStudySpace: false,
      laundryInUnit: false,
      ac: false,
      yard: false,
      freeParking: false,
      cityCenter: false,
      other: false,
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Mock saved/expired listings
  const savedListings = [
    { id: 1, title: "Cozy apartment in Brooklyn", beds: 2, baths: 2, location: "Brooklyn, NY", saved: 4 }
  ];
  
  const expiredListings = [
    { id: 2, title: "Spacious studio", beds: 3, baths: 3, location: "Apt NYC", studio: true }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
  
    const price = Number(formData.price);
    const bedrooms = Number(formData.bedrooms);
    const bathrooms = Number(formData.bathrooms);
    const availableRooms = Number(formData.availableRooms);
    const availableBathrooms = Number(formData.availableBathrooms);

    await addDoc(collection(db, "listings"), {
        title: formData.title.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zipcode: formData.zipcode.trim(),
        price: isNaN(price) ? 0 : price,
        bedrooms: isNaN(bedrooms) ? 0 : bedrooms,
        bathrooms: isNaN(bathrooms) ? 0 : bathrooms,
        availableRooms: isNaN(availableRooms) ? 0 : availableRooms,
        availableBathrooms: isNaN(availableBathrooms) ? 0 : availableBathrooms,
        amenities: formData.amenities,
        description: formData.description.trim(),
        contactInfo: formData.contactInfo.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccessMsg("Listing created!");
      setFormData({
        title: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        availableRooms: "",
        availableBathrooms: "",
        description: "",
        contactInfo: "",
        amenities: {
          pool: false,
          workStudySpace: false,
          laundryInUnit: false,
          ac: false,
          yard: false,
          freeParking: false,
          cityCenter: false,
          other: false,
        }
      });
      
      setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity as keyof typeof prev.amenities]
      }
    }));
  };

  return (
    <div className="flex h-screen w-full flex-col bg-pastel">
      <Navbar selectedPage={"Post"}/>

      {/* Main Content - Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Existing Listings */}
        <div className="w-64 border-r-2 border-gray-700 bg-pastel-light overflow-y-auto">
          {/* Posts Section */}
          <div className="border-b-2 border-gray-700 bg-pastel p-4">
            <h2 className="text-xl font-bold">Current Listings</h2>
          </div>

          {/* Current Listings */}
          <div className="border-b-2 border-gray-700 bg-pastel-light p-4">
            {savedListings.map(listing => (
              <div key={listing.id} className="mb-0">
                <p className="text-sm font-semibold">{listing.beds} br, {listing.baths} bath, complex</p>
                <p className="text-sm">{listing.location}</p>
                <p className="text-xs text-gray-600 mt-1">• {listing.saved} people saved</p>
              </div>
            ))}
          </div>

          <div className="border-b-2 border-gray-700 bg-pastel p-4">
            <h2 className="text-xl font-bold">Expired Listings</h2>
          </div>

          {/* Expired Listings */}
          <div className="border-b-2 border-gray-700 bg-pastel-light p-4">
            {expiredListings.map(listing => (
              <div key={listing.id} className="mb-1">
                <p className="text-sm font-semibold">
                  {listing.beds} br, {listing.baths} bath{listing.studio ? ', studio' : ''}
                </p>
                <p className="text-sm">{listing.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 overflow-y-auto bg-pastel-light p-8">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 my-10">Create a new listing</h2>

            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl">
              {/* Title */}
              <div className="flex items-baseline space-x-3 px-2">
                <label className="text-xl font-bold text-gray-800">Title: </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex items-baseline space-x-3 px-2">
                <label className="block text-lg font-bold text-gray-800 mb-2">Address:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                  required
                />
              </div>

              {/* Two Column Layout for Address Info */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    City:
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>

                {/* Right Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    State:
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Two Column Layout for Address Info/Price */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Zipcode:
                  </label>
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>

                {/* Right Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Price/Month:
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="w-full text-center text-2xl font-bold text-gray-900 mt-15 mb-10">
                Details
              </div>

              {/* Two Column Layout for Bedrooms/Bathrooms */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Amount of rooms (total):
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>

                {/* Right Column */}
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Amount of Bathrooms (total):
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Available Rooms */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Available rooms:
                  </label>
                  <input
                    type="number"
                    name="availableRooms"
                    value={formData.availableRooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>

                <div className="flex items-baseline space-x-3 px-2 justify-between">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Available Bathrooms:
                  </label>
                  <input
                    type="number"
                    name="availableBathrooms"
                    value={formData.availableBathrooms}
                    onChange={handleChange}
                    className="w-fit text-center border-b-2 border-gray-700 bg-transparent px-0 py-2 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div className="px-2">
                <label className="block text-lg font-bold text-gray-800 mb-4">Amenities</label>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.pool}
                      onChange={() => handleCheckboxChange('pool')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>pool</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.yard}
                      onChange={() => handleCheckboxChange('yard')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>yard</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.workStudySpace}
                      onChange={() => handleCheckboxChange('workStudySpace')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>work/study space</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.freeParking}
                      onChange={() => handleCheckboxChange('freeParking')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>free parking</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.laundryInUnit}
                      onChange={() => handleCheckboxChange('laundryInUnit')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>laundry in unit</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.cityCenter}
                      onChange={() => handleCheckboxChange('cityCenter')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>city center</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.ac}
                      onChange={() => handleCheckboxChange('ac')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>A/C</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.other}
                      onChange={() => handleCheckboxChange('other')}
                      className="w-5 h-5 border-2 border-gray-700"
                    />
                    <span>other (list in description)</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="px-2">
                <label className="block text-lg font-bold text-gray-800 mb-2">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-2 border-gray-700 bg-white px-3 py-2 outline-none rounded-sm"
                  required
                />
              </div>

              {/* Attach Photos */}
              <div className="px-2">
                <label className="block text-lg font-bold text-gray-800 mb-2">Attach photos:</label>
                <div className="border-2 border-gray-700 bg-white px-3 py-8 text-center text-gray-500 rounded-sm">
                  [Photo upload placeholder]
                </div>
              </div>

              {/* Submit Button */}
              <div className="px-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-sm bg-blue-500/90 px-4 py-3 text-gray-800 font-bold hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Listing"}
                </button>
              </div>

              {successMsg && (
                <div className="text-green-700 px-4 py-3 font-semibold text-center">
                  {successMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}