"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { deleteDoc, doc, collection, onSnapshot, query, where } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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
  const [posts, setPosts] = useState<ListingDoc[]>([]);

  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, "listings"),
        where("myPostTag", "==", true)
      );
      const unsub = onSnapshot(q, (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as ListingDoc[];
        const toMillis = (v: any) => {
          if (!v) return 0;
          if (typeof v.toMillis === "function") return v.toMillis();
          if (v instanceof Date) return v.getTime();
          return 0;
        };
        docs.sort((a: any, b: any) => toMillis(b.createdAt) - toMillis(a.createdAt));
        setPosts(docs);
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const togglePostStatus = (postId: string) => {
    setActiveStatus(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      if (!db) throw new Error("Database not initialized");
      await deleteDoc(doc(db, "listings", postId));
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (e) {
      alert("Failed to delete the post. Please try again.");
    }
  };

  const formatDate = (value: unknown) => {
    // Firestore Timestamp
    if (value && typeof value === "object" && typeof (value as any).toDate === "function") {
      const d = (value as any).toDate();
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    // JS Date
    if (value instanceof Date) {
      return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    // Milliseconds epoch
    if (typeof value === 'number') {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
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
              <Link
                className="bg-pastel hover:bg-pastel-hover border-2 border-gray-700 px-6 py-3 rounded-lg font-bold text-gray-900 transition-colors cursor-pointer"
                href={"/create-a-post"}
              >
                + Create New Post
              </Link>
            </div>

            {loading ? (
              <div className="bg-white p-12 rounded-lg border-2 border-gray-700 text-center">
                <p className="text-gray-500 text-lg">Loading...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white p-12 rounded-lg border-2 border-gray-700 text-center">
                <p className="text-gray-500 text-lg mb-4">You haven't created any listings yet.</p>
                <Link href="/create-a-post" className="inline-block bg-pastel hover:bg-pastel-hover border-2 border-gray-700 px-6 py-3 rounded-lg font-bold text-gray-900 transition-colors cursor-pointer">
                  Create Your First Post
                </Link>
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