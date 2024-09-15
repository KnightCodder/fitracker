'use client';

import { useState } from 'react';
import { FiUser, FiSearch, FiLogOut, FiEdit } from 'react-icons/fi';
import { cn } from "@/lib/utils"; // If using utility functions for classnames
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-10">
      {/* Left: Logo and Website Name */}
      <div className="flex items-center space-x-3">
        <img src="/logo.jpg" alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold">Fitracker</span>
      </div>

      {/* Center: Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FiSearch className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Right: Profile Icon */}
      <div className="relative">
        <button onClick={toggleSidebar} className="text-3xl p-2">
          <FiUser />
        </button>

        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full bg-white text-black shadow-2xl transition-transform duration-300 ease-in-out z-20",
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ width: "250px" }}
        >
          <div className="p-4">
            <button onClick={toggleSidebar} className="text-right w-full mb-4 text-2xl">
              X
            </button>
            <h2 className="text-lg font-semibold mb-6">Profile</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 cursor-pointer">
                <FiEdit />
                <span>Edit Profile</span>
              </li>
              <li
                className="flex items-center space-x-2 cursor-pointer"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push('/');
                }}
              >
                <FiLogOut />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
