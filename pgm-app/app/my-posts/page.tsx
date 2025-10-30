"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

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

export default function MyPostsPage() {
  // This will eventually come from your Firebase database
  const [posts, setPosts] = useState<ListingDoc[]>([
    {
      id: "1",
      title: "Spacious Apartment Near UF Campus",
      name: "Midtown Place",
      address: "123 SW 2nd Ave",
      city: "Gainesville",
      state: "FL",
      zipcode: 32601,
      price: 850,
      bedrooms: 2,
      bathrooms: 2,
      availableRooms: 1,
      availableBathrooms: 1,
      description: "Looking for a clean, quiet roommate to share a spacious 2-bedroom apartment just 10 minutes from campus. The apartment has updated appliances, in-unit washer/dryer, and a balcony. Rent includes water and trash. You'd have your own bathroom and plenty of closet space. I'm a recent UF grad working remotely, so I'm home often but keep to myself. Ideal for someone who values a peaceful living environment.",
      createdAt: new Date("2024-10-28")
    },
    {
      id: "2",
      title: "Room in Downtown House",
      name: "Downtown Gator House",
      address: "456 NW 5th St",
      city: "Gainesville",
      state: "FL",
      zipcode: 32601,
      price: 600,
      bedrooms: 4,
      bathrooms: 2,
      availableRooms: 1,
      availableBathrooms: 1,
      description: "We have one room available in our 4-bedroom house! Three UF alums (all working professionals) looking for a fourth person to complete our crew. The house has a big backyard, street parking, and a fully equipped kitchen. We're all pretty social and enjoy hosting game nights and weekend BBQs, but we also respect each other's space during the work week. The neighborhood is super walkable with lots of restaurants and bars nearby.",
      createdAt: new Date("2024-10-25")
    }
  ]);

  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({
    "1": true,
    "2": true
  });

  const togglePostStatus = (postId: string) => {
    setActiveStatus(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const deletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const formatDate = (date: unknown) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return "N/A";
  };

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"My Posts"}/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Posts List */}
        <div className="flex w-full justify-center p-8 overflow-y-auto">
          <div className="max-w-4xl w-full py-10">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900">My Listings</h1>
              <button className="bg-pastel hover:bg-pastel-hover border-2 border-gray-700 px-6 py-3 rounded-lg font-bold text-gray-900 transition-colors">
                + Create New Post
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="bg-white p-12 rounded-lg border-2 border-gray-700 text-center">
                <p className="text-gray-500 text-lg mb-4">You haven't created any listings yet.</p>
                <button className="bg-pastel hover:bg-pastel-hover border-2 border-gray-700 px-6 py-3 rounded-lg font-bold text-gray-900 transition-colors">
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className="space-y-6 pb-16">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
                        </div>
                        <p className="text-gray-600 text-sm">Posted on {formatDate(post.createdAt)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border-2 border-gray-700 rounded-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer">
                          Edit
                        </button>
                        <button 
                          className="px-4 py-2 border-2 border-red-500 rounded-lg font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {post.name && (
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-gray-900 min-w-32">Property Name:</span>
                          <span className="text-gray-700">{post.name}</span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 min-w-32">Address:</span>
                        <span className="text-gray-700">
                          {post.address}, {post.city}, {post.state} {post.zipcode}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 min-w-32">Price:</span>
                        <span className="text-gray-700">${post.price}/month</span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 min-w-32">Property Details:</span>
                        <span className="text-gray-700">
                          {post.bedrooms} bed / {post.bathrooms} bath
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900 min-w-32">Available:</span>
                        <span className="text-gray-700">
                          {post.availableRooms} room{post.availableRooms !== 1 ? 's' : ''} / {post.availableBathrooms} bath{post.availableBathrooms !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {post.description && (
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-gray-900 min-w-32">Description:</span>
                          <span className="text-gray-700">{post.description}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}