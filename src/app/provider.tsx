"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navebar from "@/components/header/navebar/navebar";
import Footer from "@/components/footer/footer";
import {
  fetchAdminAvatar,
  fetchAdminCollections,
  fetchAdminData,
  fetchAdminDownloadedImages,
  fetchAdminImages,
  fetchAdminLikedImages,
  fetchAdminLikes,
} from "@/services/userServices";
import { useStore } from "@/store/zustand";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getImages } from "@/services/imageServices";

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExcludedRoutes, setIsExcludedRoutes] = useState(false);
  const path = usePathname();

  // Hide navebar & footer in specific routes
  useEffect(() => {
    const excludedRoutes = ["login", "register", "verify", "reset"];
    const isExcluded = excludedRoutes.some((route) => path.includes(route));
    setIsExcludedRoutes(isExcluded);
  }, [path]);

  const {
    updateImages,
    updateAdminData,
    updateAdminAvatar,
    updateAdminImages,
    updateAdminLikes,
    updateAdminLikedImages,
    updateAdminDownloadedImages,
    updateAdminCollections,
    updateAdminCollectionsImages,
  } = useStore();

  const notify = () => {
    if (!toast.isActive("session-expired")) {
      toast.warning("Your session has expired please login", {
        toastId: "session-expired",
      });
    }
  };

  const handleFetchImages = async () => {
    try {
      const res = await getImages();
      updateImages(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminData = async () => {
    try {
      const res = await fetchAdminData();
      updateAdminData(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("verified");
          notify();
          setTimeout(() => {
            window.location.href = "/login";
          }, 4000);
        }
      }
      alert(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoggedIn(true);

    const fetchData = async () => {
      await Promise.all([
        handleFetchImages(),
        handleFetchAdminData(),
        handleFetchAdminAvatar(),
        handleFetchAdminImages(),
        handleFetchAdminLikes(),
        handleFetchAdminLikedImages(),
        handleFetchAdminDownloadedImages(),
        handleFetchAdminCollections(),
      ]);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchAdminAvatar = async () => {
    try {
      const res = await fetchAdminAvatar();
      updateAdminAvatar(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminImages = async () => {
    try {
      const res = await fetchAdminImages();
      updateAdminImages(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminCollections = async () => {
    try {
      const res = await fetchAdminCollections();
      updateAdminCollections(res);
      updateAdminCollectionsImages(
        res.flatMap((collection: { images: [] }) => collection.images || [])
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminLikes = async () => {
    try {
      const res = await fetchAdminLikes();
      updateAdminLikes(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminLikedImages = async () => {
    try {
      const res = await fetchAdminLikedImages();
      updateAdminLikedImages(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminDownloadedImages = async () => {
    try {
      const res = await fetchAdminDownloadedImages();
      updateAdminDownloadedImages(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {isExcludedRoutes ? null : <Navebar isLoggedIn={isLoggedIn} />}
      {children}

      {isExcludedRoutes ? null : <Footer />}
    </>
  );
}
