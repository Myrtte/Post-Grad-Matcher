"use client";

import { useState } from "react";
import Link from "next/link";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // Dummy data for chat list
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Is the room still available?", time: "2:30 PM" },
    { id: 2, name: "Jane Smith", lastMessage: "When can I view the apartment?", time: "1:15 PM" },
    { id: 3, name: "Mike Johnson", lastMessage: "Thanks for the information!", time: "Yesterday" },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sending message functionality with Firebase
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">Post-Grad Matcher</h1>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/post" className="text-gray-700 hover:text-gray-900">Post</Link>
          <Link href="/messages" className="text-gray-700 hover:text-gray-900">Messages</Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">Help</Link>
          <div className="h-10 w-10 rounded-full bg-gray-400"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-gray-300 bg-gray-50">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 130px)' }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-100 
                  ${selectedChat === chat.id ? 'bg-blue-50' : 'bg-white'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="border-b border-gray-300 bg-white p-4">
              <h2 className="font-semibold">
                {chats.find(chat => chat.id === selectedChat)?.name}
              </h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Add message bubbles here */}
              <div className="mb-4 flex justify-end">
                <div className="max-w-xs rounded-lg bg-blue-500 px-4 py-2 text-white">
                  Hello! I'm interested in your listing.
                </div>
              </div>
              <div className="mb-4 flex justify-start">
                <div className="max-w-xs rounded-lg bg-gray-200 px-4 py-2">
                  Hi! Yes, it's still available. Would you like to schedule a viewing?
                </div>
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-300 bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}