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
              <span className="text-gray-900 font-bold text-xl">About Us</span>
              <span className="text-gray-900 font-bold text-xl">{selected === "about us" ? `>` : ""}</span>
            </div>

            <div 
              className={`border-b-2 border-gray-700 p-4 cursor-pointer flex justify-between hover:bg-pastel-hover ${selected === "updates" ? "bg-pastel" : ""}`}
              onClick={() => setSelected("updates")}
            >
              <span className="text-gray-900 font-bold text-xl">Development Timeline</span>
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
        <div className="flex w-full justify-center p-8 overflow-y-auto">
          <div className="max-w-4xl w-full">
            {selected === "faq" && (
              <div className="space-y-6 pb-14">
                <h1 className="text-4xl font-bold text-gray-900 py-10 mb-8 text-center">Frequently Asked Questions</h1>
                
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Who can use this platform?</h3>
                    <p className="text-gray-700">This platform is exclusively for University of Florida students and recent graduates looking to find roommates as they transition out of college.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">How do I create an account?</h3>
                    <p className="text-gray-700">Click on the "Sign Up" button and authenticate using your Google account. Make sure to use your UF email to verify your student status.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Is my information secure?</h3>
                    <p className="text-gray-700">Yes! We use Firebase authentication and secure database protocols to protect your personal information. We never share your data with third parties without your consent.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">How do I use the map feature?</h3>
                    <p className="text-gray-700">Navigate to the Map tab to view available listings in your desired area. You can search by address, neighborhood, or use pins to explore different locations.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Can I message potential roommates?</h3>
                    <p className="text-gray-700">Yes! Once you find someone you're interested in, you can send them a message directly through our platform to start a conversation.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Is this service free?</h3>
                    <p className="text-gray-700">Yes! Our platform is completely free for all UF students and graduates. We're here to help make your transition easier.</p>
                  </div>
                </div>
              </div>
            )}

            {selected === "about us" && (
              <div className="space-y-6 pb-14">
                <h1 className="text-4xl font-bold text-gray-900 py-10 mb-8 text-center">About Us</h1>
                
                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We're a team of five University of Florida students who recognized a common challenge among graduating Gators: finding reliable roommates during the transition from college to the real world. Our platform was built to connect UF students and recent graduates with potential roommates who share similar collegiate backgrounds, making the move into post-grad life a little less stressful.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Built This</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Moving after graduation can be overwhelming. Between finding a job, securing housing, and adjusting to a new lifestyle, the last thing you need is the stress of finding a compatible roommate through random online listings. We wanted to create a trusted community where Gators can connect with other Gators, knowing you're living with someone who understands the UF experience.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The Team</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We're five UF students passionate about helping our fellow Gators navigate life after college. As students ourselves, we understand the unique challenges of finding housing and roommates, and we've channeled that experience into building a platform that serves our community.
                  </p>
                </div>
              </div>
            )}

            {selected === "updates" && (
            <div className="space-y-6 pb-14">
              <h1 className="text-4xl font-bold text-gray-900 py-10 mb-8 text-center">Development Timeline</h1>
              
              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">User Feedback Implementation</h3>
                  <span className="text-sm text-gray-500">Oct 29, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We listened! Based on feedback from our beta testers, we've made several improvements to enhance user experience. Updates include better navigation flow and clearer call-to-action buttons. Thank you to everyone who helped us make the platform better!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Frontend Polish Complete</h3>
                  <span className="text-sm text-gray-500">Oct 27, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Major UI/UX refinements completed! We'veimproved color schemes for better accessibility, refined spacing and typography throughout the app, and ensured consistent styling across all pages. The platform now has that polished, professional feel we've been working toward.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Post Creation Feature Added</h3>
                  <span className="text-sm text-gray-500">Oct 23, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Users can now create detailed housing posts! Whether you're looking for a roommate or have a room available, you can create posts with descriptions, pricing, and location details. This feature makes it easier than ever to advertise your housing situation or find the perfect match.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Map & Messaging Integration</h3>
                  <span className="text-sm text-gray-500">Oct 20, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Two major features launched today! The Google Maps integration allows you to visualize housing locations, and our real-time messaging system lets you chat directly with potential roommates. These core features bring the platform to life and enable meaningful connections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Firebase Backend Connected</h3>
                  <span className="text-sm text-gray-500">Oct 17, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Successfully integrated our frontend with Firebase! User authentication, database operations, and cloud storage are now fully functional. This backend infrastructure provides the foundation for all the features we're building on top.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Wireframe Frontend Created</h3>
                  <span className="text-sm text-gray-500">Oct 13, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Initial frontend wireframes completed! We've designed the core user interface including the homepage, profile pages, search functionality, and navigation structure. The wireframes give us a clear roadmap for development and help ensure a cohesive user experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Project Planning Kickoff</h3>
                  <span className="text-sm text-gray-500">Oct 6, 2024</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The journey begins! Our team of five UF students came together to tackle a problem we all face: finding reliable roommates after graduation. We outlined our vision, defined core features, and established our development roadmap. Here's to building something meaningful for the Gator community!
                </p>
              </div>
            </div>
          )}

            {selected === "api" && (
              <div className="space-y-6 pb-14">
                <h1 className="text-4xl font-bold text-gray-900 py-10 mb-8 text-center">API Documentation</h1>
                
                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our platform is built on Firebase and integrates with Google Maps API to provide a seamless roommate-finding experience. Below you'll find information about the key services and APIs we use.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Firebase Services</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Authentication</h4>
                      <p className="text-gray-700">We use Firebase Authentication with Google OAuth for secure user login and verification.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Firestore Database</h4>
                      <p className="text-gray-700">All user profiles, preferences, and matches are stored in Firestore with real-time synchronization.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Google Maps Integration</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We integrate Google Maps API to provide location-based features including:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p>• Interactive map display with custom markers</p>
                    <p>• Geocoding for address search and validation</p>
                    <p>• Distance calculation between locations</p>
                    <p>• Neighborhood and area visualization</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}