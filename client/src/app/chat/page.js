"use client";
 
import Conversation from "@/components/chat/Conversation";
import Sidebar from "@/components/chat/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex items-start !overflow-hidden h-[80vh] bg-white container mx-auto">
      <Sidebar />
      <Conversation />
    </div>
  );
};

export default page;
