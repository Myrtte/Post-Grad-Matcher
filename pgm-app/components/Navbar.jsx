import Link from "next/link";
import profileIcon from "../public/PGM Icon.png"
import pgmLogo from "../public/PGM Full Logo.png"
import Image from "next/image.js";
import { useState } from "react";

export default function Navbar ({ selectedPage }) {
  const [showFirebaseTest, setShowFirebaseTest] = useState(false);

  const linkSelected = "text-gray-800 font-semibold hover:text-gray-900 underline decoration-2 underline-offset-4 decoration-blue-500";
  const linkNotSelected = "text-gray-700 hover:text-gray-900 font-medium";

  return (
    <div>

      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between border-b-2 border-gray-700 bg-pastel px-6 py-3 shadow-sm">
        {/* Left side - Logo area */}
        <div className="flex items-center gap-4">
          {/* PGM Logo box */}
          <div className="border-2 border-gray-700 bg-white px-3 py-1 rounded-sm">
            <h1 className="text-3xl font-black tracking-tight">PGM</h1>
          </div>
          
          {/* Small icon */}
          <Image 
            src={pgmLogo} 
            alt="PGM Character" 
            width={40} 
            height={40} 
            className="border-2 border-gray-700 rounded-sm"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className={selectedPage === "Home" ? linkSelected : linkNotSelected}>
            Home
          </Link>
          <Link href="/post" className={selectedPage === "Post" ? linkSelected : linkNotSelected}>
            Post
          </Link>
          <Link href="/messages" className={selectedPage === "Messages" ? linkSelected : linkNotSelected}>
            Messages
            {/* Red dot for notifications */}
            {true && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1 mb-2"></span>
            )}
          </Link>
          <Link href="#" className={selectedPage === "Help" ? linkSelected : linkNotSelected}>
            Help
          </Link>
          
          {/* Profile Icon */}
          <button className="border-2 border-gray-700 rounded-full hover:border-gray-900 transition-colors">
            <Image 
              src={profileIcon} 
              alt="Profile" 
              width={35} 
              height={35} 
              className="rounded-full"
            />
          </button>
        </div>
      </nav>
    </div>
  )
}
