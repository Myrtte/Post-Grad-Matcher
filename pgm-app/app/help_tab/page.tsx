"use client";

import { useState } from "react";
import Link from "next/link";
import profileIcon from "../../public/PGM Icon.png"
import Image from "next/image.js";


import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function HelpPage() {

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
         <div className="w-96 border-r border-gray-400 bg-pastel"></div>
                <div  className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
                    {/* we need to link<Link href="/FAQ-q" className="font-semibold">FAQ</Link>*/}
                    <h3 className="font-semibold">FAQ</h3>
                </div>
                <div  className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
                    <h3 className="font-semibold">Liscensing</h3>
                </div>
                <div  className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
                    <h3 className="font-semibold">APIs</h3>
                </div>
                <div  className="border-b border-gray-200 bg-pastel p-4 hover:bg-pastel-light">
                    <h3 className="font-semibold">updates</h3>
                </div>
        </div>
        
    )
}