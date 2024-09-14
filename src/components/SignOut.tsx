"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/'); // Redirect to home page after logging out
  };

  return (
    <Button
      onClick={handleLogout}
      variant={'destructive'}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
