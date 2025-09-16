"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLinks from "./adminLinks";
import ImageComponent from "../features/imageFeature/imageComponent";
import { GoArrowLeft } from "react-icons/go";
import { useStore } from "@/store/zustand";
import { AdminGalleryCombobox } from "./adminGalleryCombobox";
import {
  fetchAdminDraftImages,
  fetchAdminImages,
  fetchAdminPublishedImages,
} from "@/services/userServices";

export default function AdminGallery() {
  const [title, setTitle] = useState("Uploaded");
  const [isEmpty, setIsEmpty] = useState("");
  const [visible, setVisible] = useState(true);

  const [allImages, setAllImages] = useState(false);
  const [publishedImages, setPublishedImages] = useState(false);
  const [draftImages, setDraftImages] = useState(false);

  const {
    adminImages,
    adminPublishedImages,
    adminDraftImages,
    updateAdminImages,
    updateAdminPublishedImages,
    updateAdminDraftImages,
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router, adminImages]);

  useEffect(() => {
    if (adminImages && adminImages?.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [adminImages]);

  const handleFetchImages = async () => {
    try {
      const res = await fetchAdminImages();
      setIsEmpty("");
      setTitle("Uploaded");
      updateAdminImages(res);
      setAllImages(true);
      setPublishedImages(false);
      setDraftImages(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchPublishedImages = async () => {
    setIsEmpty("");
    try {
      const res = await fetchAdminPublishedImages();
      if (res && res?.length < 1) {
        setIsEmpty("You don’t have any published photos.");
      } else setIsEmpty("");
      setTitle("Published");
      updateAdminPublishedImages(res);
      setAllImages(false);
      setPublishedImages(true);
      setDraftImages(false);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  const handleFetchDraftImages = async () => {
    setIsEmpty("");
    try {
      const res = await fetchAdminDraftImages();
      if (res && res?.length < 1) {
        setIsEmpty("All your photos are published.");
      } else setIsEmpty("");
      setTitle("Draft");
      updateAdminDraftImages(res);
      setAllImages(false);
      setPublishedImages(false);
      setDraftImages(true);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <h2 className="text-neutral-700 text-center sm:text-3xl font-semibold text-2xl">
        Your Gallery
      </h2>
      <AdminLinks />

      {adminImages && adminImages?.length > 0 && (
        <div className="flex justify-between sm:items-end items-center gap-1">
          <h3 className="text-black sm:text-2xl font-medium text-lg tracking-tight">{`Your ${title} Photos`}</h3>
          <AdminGalleryCombobox
            handleFetchPublishedImages={handleFetchPublishedImages}
            handleFetchDraftImages={handleFetchDraftImages}
            handleFetchImages={handleFetchImages}
          />
        </div>
      )}

      {visible && isEmpty.trim() !== "" && (
        <p className="sm:text-2xl text-xl font-medium text-center mt-[2rem]">
          {isEmpty}
        </p>
      )}

      {visible && allImages && (
        <div
          id="gallery_container"
          className="sm:my-[2rem] my-[1rem] grid lg:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
        >
          {adminImages?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      )}

      {visible && publishedImages && (
        <div
          id="gallery_container"
          className="sm:my-[2rem] my-[1rem] grid lg:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
        >
          {adminPublishedImages?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      )}

      {visible && draftImages && (
        <div
          id="gallery_container"
          className="sm:my-[2rem] my-[1rem] grid lg:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
        >
          {adminDraftImages?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      )}

      {/* User have no uploaded images */}
      {adminImages && adminImages.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-8 mx-auto border border-gray-200 md:w-[80%] lg:w-[60%] w-full sm:p-12 p-6 rounded-xl">
          <h3 className="sm:text-3xl text-2xl text-center">
            You haven’t uploaded anything yet.
          </h3>
          <p className="text-gray-600 text-center">
            No pressure! Start whenever you’re ready. For now, explore and get
            inspired by the creativity of others.
          </p>
          <Link href={"/"}>
            <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 sm:text-lg">
              <GoArrowLeft size={22} />
              <span>Get inspired</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
