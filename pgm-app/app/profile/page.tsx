"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
    const [selected, setSelected] = useState<string>("faq");

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"Profile"}/>

        <div className="flex flex-1 overflow-hidden">
                {/* Chat List Sidebar */}
                <div className="w-80 border-r-2 border-gray-700">
                <div className="overflow-y-auto" style={{ height: 'calc(100vh - 130px)' }}>
                    <div 
                    className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "faq" ? "bg-pastel" : ""}`}
                    onClick={() => setSelected("create")}
                    >
                    <span className="text-gray-900 font-bold text-xl">Create Profile</span>
                    <span className="text-gray-900 font-bold text-xl">{selected === "create" ? `>` : ""}</span>
                    </div>

                    <div 
                    className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "about us" ? "bg-pastel" : ""}`}
                    onClick={() => setSelected("login")}
                    >
                    <span className="text-gray-900 font-bold text-xl">Login</span>
                    <span className="text-gray-900 font-bold text-xl">{selected === "login" ? `>` : ""}</span>
                    </div>

                </div>
                </div>

                <div className="mt-8">
                {selected === "create" && <CreateProfileForm />}
                {selected === "login" && <LoginForm/>}
                </div>
            </div>
        </div>
      
  );
}
function CreateProfileForm() {
  return <div className="flex h-screen w-full flex-col bg-pastel-light">
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
            <div className="flex items-baseline space-x-3 px-2 justify between">
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
        <div className="grid grid-cols-2 gap-8">
            <div className="flex items-baseline space-x-3 px-2">
                    <label className="text-xl font-bold text-gray-800">Username: </label>
                    <input
                    type="text"
                    name="username"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div> 

            <div className="flex items-baseline space-x-3 px-2">
                    <label className="text-xl font-bold text-gray-800">Password: </label>
                    <input
                    type="text"
                    name="password"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div> 
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
              ;
}
function LoginForm() {
    return <div className="grid grid-cols-2 gap-8">
            <div className="flex items-baseline space-x-3 px-2 justify between">
                    <label className="text-xl font-bold text-gray-800">Username: </label>
                    <input
                    type="text"
                    name="username"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    />
                </div>

            <div className="flex items-baseline space-x-3 px-2">
                    <label className="text-xl font-bold text-gray-800">Password: </label>
                    <input
                    type="password"
                    name="password"
                    className="w-full border-b-2 border-gray-700 bg-transparent py-2 outline-none"
                    required
                    />
                </div>

            <div className="px-2">
                <button
                  type="submit"
                  className="w-full rounded-sm bg-blue-500/90 px-4 py-3 text-gray-800 font-bold hover:bg-blue-500 transition-colors disabled:opacity-50"
                  >Log in
                </button>
              </div>
        </div>

}