"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import SearchForm from "@/components/features/searchFeature/searchForm";
// import SearchDialog from "@/components/features/searchFeature/searchDialog";
import HeroCard from "@/components/ui/heroCard";
import StaggeredDropDown from "@/components/ui/animatedDropdown";
import { getSearchedImages } from "@/services/searchServices";
import { Loader2 } from "lucide-react";

// Zustand
import { useStore } from "@/store/zustand";

export default function Hero() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // const [loading, setLoading] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const {
    emptySearchResults,
    adminAvatar,
    adminAvatarLoaded,
    updateSearchResults,
    updateEmptySearchResults,
  } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  // Clear search results on mount
  useEffect(() => {
    updateSearchResults([]);
  }, [updateSearchResults]);

  // Close dialog and dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }

      if (
        openDialog &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDialog, openDropdown]);

  const handleFetchSearchResults = useCallback(async () => {
    // setLoading(true);
    setOpenDialog(true);
    try {
      const res = await getSearchedImages(inputValue);
      setSuggestions(res);
      if (res.length === 0) {
        updateEmptySearchResults(true);
      } else updateEmptySearchResults(false);
    } catch (error) {
      alert(error);
    } finally {
      // setIsLoaded(true);
      // setLoading(false);
    }
  }, [inputValue, updateEmptySearchResults]);

  return (
    <>
      {/* > XL screens */}
      <div className="mt-30 mb-20 justify-between items-center gap-10 xl:flex hidden container-custom">
        <div ref={dialogRef} id="search_input" className="relative">
          <h1
            onClick={() => {
              setOpenDialog(false);
              setOpenDropdown(false);
            }}
            className="md:text-5xl text-black text-2xl tracking-tighter font-semibold pb-8 w-full sm:text-left text-center"
          >
            Explore and upload your photos, royalty free images shared by
            creators.
          </h1>

          <SearchForm
            suggestions={suggestions}
            emptySearchResults={emptySearchResults}
            inputValue={inputValue}
            setSuggestions={setSuggestions}
            setInputValue={setInputValue}
            setOpenDialog={setOpenDialog}
            handleFetchSearchResults={handleFetchSearchResults}
          />
          {/* <SearchDialog
            suggestions={suggestions}
            openDialog={openDialog}
            loading={loading}
            isLoaded={isLoaded}
            setOpenDialog={setOpenDialog}
          /> */}
        </div>

        {/* Cards */}
        {/* Large Screens */}
        <div className="flex items-center gap-3">
          <HeroCard
            isLoggedIn={isLoggedIn}
            imageSrc="/pexels-jjstudio-31525091.jpg"
            title={isLoggedIn ? "Share Your Work" : "Create an Account"}
            paragraph={
              isLoggedIn
                ? "Upload photos and make them visible"
                : "Join a growing photo community"
            }
            button={isLoggedIn ? "Upload" : "Join"}
            href="/upload"
          />

          <HeroCard
            isLoggedIn={isLoggedIn}
            imageSrc="/pexels-quang-nguyen-vinh-222549-6876792.jpg"
            title={isLoggedIn ? "Your Gallery" : "Be Part Of Vision"}
            paragraph={
              isLoggedIn
                ? "Manage and publish your photos"
                : "Sign up to upload and save photos"
            }
            button={isLoggedIn ? "View" : "Get Started"}
            href="/my-profile/gallery"
          />
        </div>
      </div>

      {/* < XL screens */}
      <div
        id="hero"
        className="lg:h-[80vh] h-[60vh] text-white relative  container-custom block xl:hidden"
      >
        <Image
          src={"/pexels-philippedonn-1169754.jpg"}
          fill
          alt="wallpaper"
          className="object-cover"
          priority
        />
        <div className="inset-0 absolute w-full h-full bg-black/20"></div>
        {/* Navebar */}
        <div id="navebar" className="relative z-20 h-10">
          <div
            id="nave_links"
            className="flex justify-between items-center py-6"
          >
            <div id="left">
              {/* Logo */}
              <Link className={`w-fit`} id="logo_container" href={"/"}>
                <Image
                  src={"/logo_white.png"}
                  width={0}
                  height={80}
                  sizes="100vw"
                  className="h-[52px] sm:w-auto w-[52px]"
                  alt="avatar"
                />
              </Link>
            </div>
            <div
              id="right"
              className="flex justify-between items-center sm:gap-5 gap-3 ml-auto"
            >
              {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                  <div
                    id="avatar_container"
                    className="relative size-13 cursor-pointer"
                    onClick={() => {
                      setOpenDropdown((pv) => !pv);
                    }}
                  >
                    <Image
                      src={
                        adminAvatar
                          ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${adminAvatar}`
                          : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
                      }
                      fill
                      alt="avatar"
                      className={`rounded-full object-cover ${
                        !adminAvatarLoaded ? "brightness-50" : "brightness-100"
                      }`}
                    />
                  </div>
                  <div
                    style={{
                      display: !adminAvatarLoaded ? "block" : "none",
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Loader2 className="size-6 animate-spin text-gray-300" />
                  </div>
                  <StaggeredDropDown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>
              )}

              {!isLoggedIn && (
                <Link href={"/login"}>
                  <button className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 py-2.5 sm:text-lg px-5 rounded-lg cursor-pointer shadow-xs w-fit mx-auto transition-all duration-500">
                    Login
                  </button>
                </Link>
              )}
              <Link href={!isLoggedIn ? "/register" : "/upload"}>
                <button className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 py-2.5 sm:text-lg px-5 rounded-lg cursor-pointer  shadow-xs w-fit mx-auto transition-all duration-500">
                  <span>{!isLoggedIn ? "Join" : "Upload"}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          ref={dialogRef}
          id="search_input"
          className="absolute container-custom z-10 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8  xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-full"
        >
          <h1
            onClick={() => {
              setOpenDialog(false);
              setOpenDropdown(false);
            }}
            className="md:text-3xl text-2xl font-semibold pb-5 w-full sm:text-left text-center"
          >
            Explore and share your photos, royalty free images shared by
            creators.
          </h1>

          <SearchForm
            suggestions={suggestions}
            emptySearchResults={emptySearchResults}
            inputValue={inputValue}
            setSuggestions={setSuggestions}
            setInputValue={setInputValue}
            setOpenDialog={setOpenDialog}
            handleFetchSearchResults={handleFetchSearchResults}
          />
          {/* <SearchDialog
            suggestions={suggestions}
            openDialog={openDialog}
            loading={loading}
            isLoaded={isLoaded}
            setOpenDialog={setOpenDialog}
          /> */}
        </div>
      </div>
    </>
  );
}
