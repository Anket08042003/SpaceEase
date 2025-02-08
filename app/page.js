"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { createUser } from "@/utils/actions/action"; 

import GoogleMapView from "@/components/GoogleMapView";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const handleUserCreation = async () => {
      try {
        if (isLoaded && isSignedIn) {
          const User = {
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            name: user.firstName,
          };

          // console.log(user);
          const newUser = await createUser(User);
          //console.log(newUser);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    handleUserCreation();
  }, [isLoaded, isSignedIn, user]);

  return (
    <main className="relative h-screen overflow-hidden bg-white">
      {/* Background Design */}
     

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-start p-8 space-y-4">
        {/* Title */}
        <div className="text-8xl bg-amber-300 font-extrabold text-black leading-none">
          <span>Need</span>
        </div>
        <div className="text-8xl bg-amber-300 font-extrabold text-black leading-none">
          <span>parking?</span>
        </div>

        {/* Search Button */}
        <Link
          href="/search"
          className="flex items-center px-6 py-3 text-xl font-medium text-black bg-yellow-400  shadow-md hover:bg-yellow-500 transition"
        >
          Search now
        </Link>
      </div>
      <GoogleMapView/>
      {/* Additional Quote */}
      <div className="absolute bottom-4 left-8 text-gray-300 text-sm">
        <p>
          I've seen unicorns, the Loch Ness monster, but a free parking spot?
          Never.
        </p>
      </div>
    </main>
  );
}