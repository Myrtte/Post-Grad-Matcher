"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"Profile"}/>

      
        {/*input for a profile*/}
        <div className="grid grid-cols-2 gap-8">
            <div className="flex items-baseline space-x-3 px-2 justify between">
                    <label className="text-xl font-bold text-gray-800">Profile Name: </label>
                    <input
                    type="text"
                    name="name"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div>
            {/* Age input*/}
            <div className="flex items-baseline space-x-3 px-2 justify between">
                    <label className="text-xl font-bold text-gray-800">Age: </label>
                    <input
                    type="number"
                    name="age"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div>

        </div>
        {/*user can choose to enter gender*/}
        {/*input for a profile*/}
        <div className="grid grid-cols-2 gap-8">
            <div className="flex items-baseline space-x-3 px-2 justifu between">
                    <label className="text-xl font-bold text-gray-800">Gender: </label>
                    <input
                    type="text"
                    name="gender"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    />
                </div>

            <div className="flex items-baseline space-x-3 px-2">
                    <label className="text-xl font-bold text-gray-800">Graduation Date/Year: </label>
                    <input
                    type="date"
                    name="year"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div>
        </div>

        <div className="flex items-baseline space-x-3 px-2">
                <label className="text-xl font-bold text-gray-800">Linkedin Profile: </label>
                <input
                  type="url"
                  name="link"
                  className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                  required
                />
              </div>  

        <div className="px-2">
                <label className="block text-lg font-bold text-gray-800 mb-2">Upload Profile Picture:</label>
                <div className="border-2 border-gray-700 bg-white px-3 py-8 text-center text-gray-500 rounded-sm">
                  [Photo upload placeholder]
                </div>
              </div>    

        <div className="px-2">
                <button
                  type="submit"
                  className="w-full rounded-sm bg-blue-500/90 px-4 py-3 text-gray-800 font-bold hover:bg-blue-500 transition-colors disabled:opacity-50"
                  >Create profile
                </button>
              </div>
      </div>
      


      
  );
}