"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp, getDocs, doc, setDoc, getDoc, deleteDoc, query, where } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);
  const [chatMessages, setChatMessages] = useState<{[key: number]: Array<{text: string, isUser: boolean, timestamp: string}>}>({});

  const [chats, setChats] = useState<Array<{id: number, name: string, lastMessage: string, time: string}>>([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);

  const loadChats = async () => {
    try {
      const chatsDoc = await getDoc(doc(db, "userData", "chats"));
      if (chatsDoc.exists()) {
        setChats(chatsDoc.data().chatList || []);
      }
      setChatsLoaded(true);
    } catch (error) {
      console.error("Error loading chats:", error);
      setChatsLoaded(true);
    }
  };

  const loadMessages = async () => {
    try {
      const messagesSnapshot = await getDocs(collection(db, "messages"));
      const messagesByChat: {[key: number]: Array<{text: string, isUser: boolean, timestamp: string, createdAt: any}>} = {};
      
      messagesSnapshot.forEach((doc) => {
        const data = doc.data();
        const chatId = data.chatId;
        
        if (chatId) {
          if (!messagesByChat[chatId]) {
            messagesByChat[chatId] = [];
          }
          
          messagesByChat[chatId].push({
            text: data.message,
            isUser: !data.isAutoReply,
            timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            createdAt: data.createdAt
          });
        }
      });
      
      Object.keys(messagesByChat).forEach(chatId => {
        messagesByChat[parseInt(chatId)].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return a.createdAt.seconds - b.createdAt.seconds;
          }
          return 0;
        });
      });
      
      setChatMessages(messagesByChat);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const saveChats = async (updatedChats: Array<{id: number, name: string, lastMessage: string, time: string}>) => {
    try {
      await setDoc(doc(db, "userData", "chats"), {
        chatList: updatedChats
      });
    } catch (error) {
      console.error("Error saving chats:", error);
    }
  };

  const deleteChat = async (chatId: number) => {
    try {
      // Delete all messages for this chat from Firebase
      const messagesSnapshot = await getDocs(query(collection(db, "messages"), where("chatId", "==", chatId)));
      const deletePromises = messagesSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Remove chat from local state
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
      saveChats(updatedChats);

      // Clear messages for this chat from local state
      setChatMessages(prev => {
        const updated = { ...prev };
        delete updated[chatId];
        return updated;
      });

      // If the deleted chat was selected, clear the selection
      if (selectedChat === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  useEffect(() => {
    loadChats();
    loadMessages();
  }, []);

  useEffect(() => {
    if (!chatsLoaded) return;
    
    const chatId = searchParams.get('chat');
    const name = searchParams.get('name');
    
    if (chatId && name) {
      const chatIdNum = parseInt(chatId);
      
      setChats(currentChats => {
        const existingChat = currentChats.find(chat => chat.id === chatIdNum);
        
        if (!existingChat) {
          const newChat = {
            id: chatIdNum,
            name: name,
            lastMessage: "New conversation",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          };
          
          const updatedChats = [newChat, ...currentChats];
          saveChats(updatedChats);
          return updatedChats;
        }
        
        return currentChats;
      });
      
      setSelectedChat(chatIdNum);
    }
  }, [searchParams, chatsLoaded]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !message.trim()) return;

    const chat = chats.find(chat => chat.id === selectedChat);
    const messageText = message.trim();

    await addDoc(collection(db, "messages"), {
      chatId: selectedChat,
      chatName: chat?.name ?? null,
      message: messageText,
      createdAt: serverTimestamp(),
    });

    setMessage("");
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 1200);

    // Update chat list with user message
    setChats(currentChats => {
      const updatedChats = currentChats.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, lastMessage: messageText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
          : chat
      );
      saveChats(updatedChats);
      return updatedChats;
    });

    // Reload messages to show the new message
    setTimeout(() => loadMessages(), 100);

    // Auto-reply after 2 seconds
    setTimeout(async () => {
      await addDoc(collection(db, "messages"), {
        chatId: selectedChat,
        chatName: chat?.name ?? null,
        message: "Example response",
        createdAt: serverTimestamp(),
        isAutoReply: true,
      });
      
      // Update chat list with auto-reply
      setChats(currentChats => {
        const updatedChats = currentChats.map(chat => 
          chat.id === selectedChat 
            ? { ...chat, lastMessage: "Example response", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
            : chat
        );
        saveChats(updatedChats);
        return updatedChats;
      });
      
      // Reload messages to show the auto-reply
      loadMessages();
    }, 2000);
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
                className={`border-b-2 border-gray-300 p-4 hover:bg-pastel-hover transition-colors
                    ${selectedChat === chat.id ? 'bg-pastel-light border-l-4 border-l-blue-500/90' : 'bg-pasel-light'}`}
              >
                <div className="flex items-start justify-between">
                  <div 
                    onClick={() => setSelectedChat(chat.id)}
                    className="flex-1 cursor-pointer"
                  >
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{chat.time}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition-colors"
                      title="Delete conversation"
                    >
                      ✕
                    </button>
                  </div>
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
                {chats.find(chat => chat.id === selectedChat)?.name || searchParams.get('name')}
              </h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedChat && chatMessages[selectedChat] && chatMessages[selectedChat].length > 0 ? (
                chatMessages[selectedChat].map((msg, index) => (
                  <div key={index} className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-lg px-4 py-2 ${msg.isUser ? 'bg-blue-500/90 text-white' : 'bg-gray-300/90'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : selectedChat ? (
                <div className="text-center text-gray-500 mt-8">
                  Start a conversation by typing a message below
                </div>
              ) : null}
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