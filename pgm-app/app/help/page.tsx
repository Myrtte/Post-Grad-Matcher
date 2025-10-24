"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function HelpPage() {
  const [selected, setSelected] = useState<string>("faq");

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"Help"}/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r-2 border-gray-700">
          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 130px)' }}>
            <div 
              className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "faq" ? "bg-pastel" : ""}`}
              onClick={() => setSelected("faq")}
            >
              <span className="text-gray-900 font-bold text-xl">FAQ</span>
              <span className="text-gray-900 font-bold text-xl">{selected === "faq" ? `>` : ""}</span>
            </div>

            <div 
              className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "about us" ? "bg-pastel" : ""}`}
              onClick={() => setSelected("about us")}
            >
              <span className="text-gray-900 font-bold text-xl">Aboout Us</span>
              <span className="text-gray-900 font-bold text-xl">{selected === "about us" ? `>` : ""}</span>
            </div>

            <div 
              className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "updates" ? "bg-pastel" : ""}`}
              onClick={() => setSelected("updates")}
            >
              <span className="text-gray-900 font-bold text-xl">Updates</span>
              <span className="text-gray-900 font-bold text-xl">{selected === "updates" ? `>` : ""}</span>
            </div>

            <div 
              className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "api" ? "bg-pastel" : ""}`}
              onClick={() => setSelected("api")}
            >
              <span className="text-gray-900 font-bold text-xl">API</span>
              <span className="text-gray-900 font-bold text-xl">{selected === "api" ? `>` : ""}</span>
            </div>

          </div>
        </div>

        {/* Help Tab Area */}
        <div className="flex w-full justify-center p-6">
          <span>this tab is about {selected}</span>
        </div>
      </div>
    </div>
  );
}