import FirebaseTest from "./FirebaseTest"
import Link from "next/link";
import profileIcon from "../public/PGM Icon.png"
import Image from "next/image.js";
import { useState } from "react";

export default function Navbar ({ selectedPage }) {
  const [showFirebaseTest, setShowFirebaseTest] = useState(false);


  const linkSelected = "text-gray-700 hover:text-gray-900 border-b border-blue-500 mt-[1px]";
  const linkNotSelected = "text-gray-700 hover:text-gray-900";

  return (
    <div>
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
          <Link href="/" className={selectedPage === "Home" ? linkSelected : linkNotSelected}>Home</Link>
          <Link href="/post" className={selectedPage === "Post" ? linkSelected : linkNotSelected}>Post</Link>
          <Link href="/messages" className={selectedPage === "Messages" ? linkSelected : linkNotSelected}>Messages</Link>
          <Link href="#" className={selectedPage === "Help" ? linkSelected : linkNotSelected}>Help</Link>
          <Image 
            src={profileIcon} 
            alt="Profile" 
            width={30} 
            height={30} 
            className="rounded-full border border-gray-600"
          />
        </div>
      </nav>
    </div>
  )
}