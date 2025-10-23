"use client";

import { useState } from "react";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function PostPage() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    contactInfo: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
  
    const price = Number(formData.price);
    const bedrooms = Number(formData.bedrooms);
    const bathrooms = Number(formData.bathrooms);

    await addDoc(collection(db, "listings"), {
        title: formData.title.trim(),
        location: formData.location.trim(),
        price: isNaN(price) ? 0 : price,
        bedrooms: isNaN(bedrooms) ? 0 : bedrooms,
        bathrooms: isNaN(bathrooms) ? 0 : bathrooms,
        description: formData.description.trim(),
        contactInfo: formData.contactInfo.trim(),
        createdAt: serverTimestamp(),
      });

      setSuccessMsg("Listing created!");
      setFormData({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        contactInfo: "",
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"Post"}/>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="my-6 text-2xl font-bold text-gray-800 text-center">Create a New Listing</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text font-medium text-gray-700">
                Listing Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text font-medium text-gray-700">
                  Monthly Rent ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text font-medium text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text font-medium text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text font-medium text-gray-700">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-700 bg-white px-3 py-2 shadow-sm focus:outline-none transition-colors rounded-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500/90 px-4 py-3 text-blacks font-bold rounded-sm hover:bg-blue-500 focus:outline-none transition-colors disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Listing"}
            </button>

            {successMsg && (
              <div className="mb-4 text-green-700 px-4 py-3 font-semibold rounded-sm text-center">
                {successMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}