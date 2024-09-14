'use client';

import LogoutButton from "@/component/SignOut";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>

      <h1 className="text-2xl font-bold">Dashboard</h1>

    <div className="items-center justify-center m-5">

      <div className="bg-slate-200 h-32 w-60 items-center flex justify-center hover:scale-110 hover:bg-slate-300 my-5 mx-auto" onClick={() => {
        router.push('/exercises');
      }}>
        Exercise
      </div>

      <div className="bg-slate-200 h-32 w-60 items-center flex justify-center hover:scale-110 hover:bg-slate-300 my-5 mx-auto" onClick={() => {
        router.push('/diet');
      }}>
        Diet
      </div>

    </div>
      <LogoutButton />
    </>
  );
}
