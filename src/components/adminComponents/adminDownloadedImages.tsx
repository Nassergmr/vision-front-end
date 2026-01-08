"use client";

import Link from "next/link";
import Image from "next/image";
import AdminLinks from "./adminLinks";
import ImageComponent from "../features/imageFeature/imageComponent";
import { GoArrowLeft } from "react-icons/go";
import { useStore } from "@/store/zustand";
import { useEffect } from "react";

export default function AdminDownloadedImages() {
  const { adminDownloadedImages } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <h2 className="text-center sm:text-3xl font-semibold text-2xl">
        Your Downloads
      </h2>
      <AdminLinks />
      {adminDownloadedImages && adminDownloadedImages?.length > 0 && (
        <div id="gallery_container" className="sm:my-[2rem] my-[1rem] list">
          {adminDownloadedImages?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      )}
      {adminDownloadedImages && adminDownloadedImages?.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-8 mx-auto col-span-3 mt-[2rem]">
          <h3 className="text-2xl sm:text-3xl text-center">
            You haven’t downloaded any photos yet.
          </h3>
          <div className="relative size-20 sm:size-30">
            <Image
              src={"/empty-downloads.png"}
              fill
              sizes="(min-width: 640px width: 120px, 80px)"
              alt=""
            />
          </div>
          <Link href={"/"}>
            <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
              <GoArrowLeft size={22} />
              <span>Explore and download</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
