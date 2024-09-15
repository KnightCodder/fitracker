'use client';

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image from next/image

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Exercise Block */}
          <div
            className="relative bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer overflow-hidden"
            onClick={() => router.push('/exercises')}
          >
            <Image
              src="/exercise.jpg" // Add a relevant image for exercises
              alt="Exercise"
              width={400}
              height={200}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-300 bg-opacity-70 rounded-lg text-lg font-semibold text-gray-800">
              Exercise
            </div>
          </div>

          {/* Diet Block */}
          <div
            className="relative bg-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer overflow-hidden"
            onClick={() => router.push('/diet')}
          >
            <Image
              src="/diet.webp" // Add a relevant image for diet
              alt="Diet"
              width={400}
              height={200}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-300 bg-opacity-70 rounded-lg text-lg font-semibold text-gray-800">
              Diet
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
