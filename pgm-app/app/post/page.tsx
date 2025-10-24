"use client";

import { useState } from "react";
import Link from "next/link";
import profileIcon from "../../public/PGM Icon.png"
import Image from "next/image.js";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
    <div className="flex h-screen w-full flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between border-b border-gray-400 bg-pastel px-6 py-4">
        <h1 className="text-2xl font-bold">Post-Grad Matcher</h1>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/post" className="text-gray-700 hover:text-gray-900">Make a Post</Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">My Posts</Link>
          <Link href="/messages" className="text-gray-700 hover:text-gray-900">Messages</Link>
          <Link href="/help_tab" className="text-gray-700 hover:text-gray-900">Help</Link>
          <Image 
            src={profileIcon} 
            alt="Profile" 
            width={30} 
            height={30} 
            className="rounded-full border border-gray-600"
          />
          {/*<div className="h-10 w-10 rounded-full bg-gray-400"></div>*/}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-pastel p-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-2xl font-bold">Create a New Listing</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Listing Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Monthly Rent ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-black-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}