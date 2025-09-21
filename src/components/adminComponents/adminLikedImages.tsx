"use client";

import Link from "next/link";
import Image from "next/image";
import AdminLinks from "./adminLinks";
import ImageComponent from "../features/imageFeature/imageComponent";
import { GoArrowLeft } from "react-icons/go";
import { useStore } from "@/store/zustand";

export default function AdminLikedImages() {
  const { adminLikedImages } = useStore();

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <h2 className="text-neutral-700 text-center sm:text-3xl font-semibold text-2xl">
        Your Likes
      </h2>

      <AdminLinks />

      {adminLikedImages && adminLikedImages?.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-8 mx-auto col-span-3">
          <h3 className="text-2xl sm:text-3xl text-center">
            You don&apos;t have any liked photos.
          </h3>
          <div className="relative size-25 sm:size-30">
            <Image src={"/empty-likes.png"} fill alt="" />
          </div>
          <Link href={"/"}>
            <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 sm:text-lg">
              <GoArrowLeft size={22} />
              <span>Find photos to like</span>
            </button>
          </Link>
        </div>
      )}

      {adminLikedImages && adminLikedImages.length > 0 && (
        <div id="gallery_container" className="list sm:my-[2rem] my-[1rem] ">
          {adminLikedImages?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      )}
    </div>
  );
}
