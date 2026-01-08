"use client";

import { useCallback, useState } from "react";
import { getImages, getPopularImages } from "@/services/imageServices";
import ImageComponent from "../features/imageFeature/imageComponent";
import { BodyGalleryCombobox } from "./bodyGalleryCombobox";
import { useStore } from "@/store/zustand";
import { Skeleton } from "../ui/skeleton";

export default function Body() {
  const [title, setTitle] = useState("New");
  const { images, updateImages } = useStore();

  const handleFetchImages = useCallback(async () => {
    try {
      const res = await getImages();
      updateImages(res);
      setTitle("New");
    } catch (error) {
      alert(error);
    }
  }, [updateImages]);

  const handleFetchPopularImages = useCallback(async () => {
    try {
      const res = await getPopularImages();
      updateImages(res);
      setTitle("Popular");
    } catch (error) {
      alert(error);
    }
  }, [updateImages]);

  return (
    <div className="mb-[3rem] sm:mb-[4rem] container-custom">
      <div className="flex justify-between sm:items-end items-center gap-1 my-[1rem] sm:mt-[2rem] sm:mb-[1.5rem]">
        <h3 className="text-black sm:text-2xl font-medium text-lg tracking-tight">
          {title} Free Stock Photos
        </h3>
        <BodyGalleryCombobox
          handleFetchImages={handleFetchImages}
          handleFetchPopularImages={handleFetchPopularImages}
        />
      </div>
      <div id="gallery_container" className="list">
        {images?.map((e) => (
          <ImageComponent key={e.id} e={e} />
        ))}

        {!images && (
          <>
            <Skeleton
              className={`relative h-[500px] w-[420px] bg-gray-200  rounded-xl`}
            />
            <Skeleton
              className={`relative h-[500px] w-[420px] bg-gray-200  rounded-xl`}
            />
            <Skeleton
              className={`relative h-[500px] w-[420px] bg-gray-200  rounded-xl`}
            />
          </>
        )}
      </div>
    </div>
  );
}
