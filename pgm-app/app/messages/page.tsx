"use client";

import { useState } from "react";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  // Dummy data for chat list
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Is the room still available?", time: "2:30 PM" },
    { id: 2, name: "Jane Smith", lastMessage: "When can I view the apartment?", time: "1:15 PM" },
    { id: 3, name: "Mike Johnson", lastMessage: "Thanks for the information!", time: "Yesterday" },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !message.trim()) return;

    const chat = chats.find(chat => chat.id === selectedChat);

    await addDoc(collection(db, "messages"), {
      chatId: selectedChat,
      chatName: chat?.name ?? null,
      message: message.trim(),
      createdAt: serverTimestamp(),
    });

    setMessage("");
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 1200);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-pastel-light">
      <Navbar selectedPage={"Messages"}/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r-2 border-gray-700">
          <div className="p-4 border-b-2 border-gray-700 bg-pastel">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full border-2 border-gray-700 bg-white px-4 py-2 rounded-sm"
            />
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 130px)' }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`cursor-pointer border-b-2 border-gray-300 p-4 hover:bg-pastel-hover transition-colors
                    ${selectedChat === chat.id ? 'bg-pastel-light border-l-4 border-l-blue-500/90' : 'bg-pasel-light'}`}
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
            <div className="border-b-2 border-gray-700 bg-pastel p-4">
              <h2 className="font-semibold">
                {chats.find(chat => chat.id === selectedChat)?.name}
              </h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Add message bubbles here */}
              <div className="mb-4 flex justify-end">
                <div className="max-w-xs rounded-lg bg-blue-500/90 px-4 py-2 text-white">
                  Hello! I'm interested in your listing.
                </div>
              </div>
              <div className="mb-4 flex justify-start">
                <div className="max-w-xs rounded-lg bg-gray-300/90 px-4 py-2">
                  Hi! Yes, it's still available. Would you like to schedule a viewing?
                </div>
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t-2 border-gray-700 bg-pastel p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-sm border-2 border-gray-700 bg-white px-4 py-2"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500/90 px-6 py-2 text-white hover:bg-blue-500"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-pastel-light">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}