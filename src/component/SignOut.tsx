"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/'); // Redirect to home page after logging out
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
