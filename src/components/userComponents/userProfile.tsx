"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminData } from "../../../types/types";
import {
  fetchUserImages,
  fetchUserPopularImages,
  fetchUserProfile,
} from "@/services/userServices";
import ImageComponent from "../features/imageFeature/imageComponent";
import AdminSocials from "../adminComponents/adminSocials";
import SendMessage from "./sendMessage";
import { UserGalleryCombobox } from "./userGalleryCombobox";
import { GoArrowLeft } from "react-icons/go";
import { Skeleton } from "../ui/skeleton";

type Props = {
  slug: string;
  name?: string;
};

type UserImage = {
  id: string;
  public_id: string;
  width: number;
  height: number;
  title: string;
  location: string;
  published: boolean;
  userId: string;
  user: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  likes: { id: string; userUrl: string; imageUrl: string; userId: string }[];
  comments: { id: string; content: string; userId: string }[];
  addedAt: string;
};

const UserProfile: React.FC<Props> = ({ slug }) => {
  const [userData, setUserData] = useState<AdminData>();
  const [userImages, setUserImages] = useState<UserImage[]>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("New");

  const pathname = usePathname();

  // Reset the scrollbar to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleFetchUserProfile = useCallback(async () => {
    try {
      const res = await fetchUserProfile(slug);
      setUserData(res);
    } catch (error) {
      alert(error);
    }
  }, [slug]);

  const handleFetchUserImages = useCallback(async () => {
    try {
      if (userData?.id) {
        const res = await fetchUserImages(userData?.id);
        setUserImages(res);
        setTitle(`New`);
      }
    } catch (error) {
      alert(error);
    }
  }, [userData?.id]);

  useEffect(() => {
    handleFetchUserProfile();
    handleFetchUserImages();
  }, [handleFetchUserProfile, handleFetchUserImages]);

  const handleFetchPopularUserImages = async () => {
    try {
      if (userData) {
        const res = await fetchUserPopularImages(userData?.id);
        setUserImages(res);
        setTitle(`Popular`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <div className="flex items-center sm:gap-7 gap-5 flex-col sm:w-[80%] lg:w-[60%] w-full mx-auto">
        {!userData && (
          <Skeleton
            className={`${
              !isLoaded ? "opacity-100" : "opacity-0"
            } relative sm:size-35 size-28 rounded-full mx-auto bg-gray-200`}
          />
        )}

        {userData && (
          <div
            id="image_container"
            className="relative sm:size-35 size-28 mx-auto"
          >
            <Skeleton
              className={`${
                !isLoaded ? "opacity-100" : "opacity-0"
              } relative sm:size-35 size-28 rounded-full mx-auto bg-gray-200`}
            />
            <Image
              onLoad={() => setIsLoaded(true)}
              src={
                userData?.avatar
                  ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${userData.avatar}`
                  : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
              }
              fill
              alt="avatar"
              sizes="(min-width:640px) 140px, 112px"
              className={`rounded-full object-cover ${
                !isLoaded ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
            />
          </div>
        )}

        <div
          id="name"
          className="flex gap-2 sm:text-5xl text-4xl justify-center font-medium"
        >
          {!userData && (
            <Skeleton className="w-[200px] sm:w-[300px] h-[30px] sm:h-[50px]  bg-gray-200" />
          )}

          <p>{userData?.firstName}</p>
          <p>{userData?.lastName}</p>
        </div>

        {!userData && (
          <Skeleton className="sm:w-[500px] w-full h-[30px] sm:h-[50px]  bg-gray-200" />
        )}

        <AdminSocials adminData={userData} />

        {!userData && (
          <div className="flex items-center gap-5 mt-5">
            <Skeleton className="size-[40px] rounded-full bg-gray-200" />
            <Skeleton className="size-[40px] rounded-full bg-gray-200" />
            <Skeleton className="size-[40px] rounded-full bg-gray-200" />
            <Skeleton className="size-[40px] rounded-full bg-gray-200" />
            <Skeleton className="size-[40px] rounded-full bg-gray-200" />
          </div>
        )}

        <SendMessage userData={userData} />
      </div>

      {userData && userImages?.length !== 0 ? (
        <>
          <div className="flex justify-between sm:items-end items-center gap-1">
            <h3 className="text-black sm:text-2xl font-medium text-lg tracking-tight">{`${userData?.firstName}’s ${title} Photos`}</h3>
            <UserGalleryCombobox
              handleFetchPopularUserImages={handleFetchPopularUserImages}
              handleFetchUserImages={handleFetchUserImages}
            />
          </div>
          <div id="gallery_container" className="sm:my-[2rem] my-[1rem] list">
            {userImages?.map((e) => (
              <ImageComponent key={e.id} e={e} />
            ))}
          </div>
        </>
      ) : (
        userData && (
          // Empty gallery
          <div className="flex flex-col items-center justify-center gap-8 mt-[1rem] sm:mt-[2rem]">
            <h3 className="sm:text-3xl text-2xl text-center">
              {userData?.firstName} hasn’t published any photos yet.
            </h3>
            <div className="relative size-20 sm:size-30">
              <Image
                src={"/empty-collection.png"}
                fill
                sizes="(min-width: 640px width: 120px, 80px)"
                alt=""
              />
            </div>
            <Link href={"/"}>
              <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
                <GoArrowLeft size={22} />
                <span>Browse photos</span>
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
