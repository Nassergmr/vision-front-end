"use client";

import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import { useStore } from "@/store/zustand";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export default function AdminNameAvatar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { adminData, adminAvatar } = useStore();

  return (
    <div className="flex items-center gap-8 flex-col">
      <div
        id="image_container"
        className="relative  sm:size-35 size-28  mx-auto"
      >
        <Skeleton
          className={`${
            !isLoaded ? "opacity-100" : "opacity-0"
          } relative sm:size-35 size-28 rounded-full mx-auto bg-gray-200`}
        />
        <Image
          onLoad={() => setIsLoaded(true)}
          src={
            adminAvatar
              ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${adminAvatar}`
              : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
          }
          fill
          alt="avatar"
          className="rounded-full object-cover"
        />
      </div>
      <div
        id="name"
        className="flex gap-2 sm:text-5xl text-4xl justify-center font-medium"
      >
        {!adminData && <Skeleton className="w-[300px] h-[50px] bg-gray-200" />}
        <p>{adminData?.firstName}</p>
        <p>{adminData?.lastName}</p>
      </div>

      {/* Edit profile button */}
      <div className="flex items-center gap-5">
        <Link href={"/edit-profile"}>
          <button className="flex items-center gap-2 bg-[#00CC83] hover:bg-[#00a369] transition-all duration-300  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  cursor-pointer">
            <GoPencil size={22} className="text-white" />
            <p className="text-white">Edit Profile</p>
          </button>
        </Link>
        <Link href={`/profile/${adminData?.slug}`}>
          <button className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg ">
            View My Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
