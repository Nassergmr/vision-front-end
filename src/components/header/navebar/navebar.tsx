"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StaggeredDropDown from "@/components/ui/animatedDropdown";
import { useStore } from "@/store/zustand";
import { getSearchedImages } from "@/services/searchServices";
import SearchForm2 from "@/components/features/searchFeature/searchForm2";
import SearchDialog2 from "@/components/features/searchFeature/searchDialog2";
import { IoSearchOutline } from "react-icons/io5";
import SearchForm3 from "@/components/features/searchFeature/searchForm3";
import { Loader2 } from "lucide-react";

interface Props {
  isLoggedIn: boolean;
}

export default function Navebar({ isLoggedIn }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const router = usePathname();
  const isHomePage = router.endsWith("/");

  const {
    adminAvatar,
    adminAvatarLoaded,
    emptySearchResults,
    updateAdminAvatarLoaded,
    updateEmptySearchResults,
  } = useStore();

  // Close the dropdown and dialog when clicking outside
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

  // Show navebar when not on homepage
  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isHomePage]);

  // Show navebar when is homepage && scroll height > 80vh
  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }
    const handleScroll = () => {
      const height = window.innerHeight * 0.8;
      const scroll = window.pageYOffset;

      if (scroll > height) {
        setIsVisible(true);
      }
      if (scroll < height) {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const handleFetchSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSearchedImages(inputValue);
      setSuggestions(res);
      setOpenDialog(true);
      if (res.length === 0) {
        updateEmptySearchResults(true);
      } else updateEmptySearchResults(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoaded(true);
      setLoading(false);
    }
  }, [inputValue, updateEmptySearchResults]);

  return (
    <nav
      style={{ top: isVisible ? "0" : "-100px" }}
      className=" z-50 w-full fixed top-0 left-0  transition-all duration-600 ease-in-out container-custom bg-white shadow-2xs"
    >
      <div
        id="nav_links"
        className=" flex justify-between bg-white  items-center  h-20"
      >
        <div id="left" className="sm:flex items-center w-full">
          {/* Logo */}
          <Link
            className={`w-[62px] mr-5 ${!searchVisible ? "block" : "hidden"}`}
            id="logo_container"
            href={"/"}
          >
            <Image
              src={"/logo_black"}
              width={0}
              height={0}
              className="h-[52px] sm:w-auto w-[52px]"
              alt="avatar"
              unoptimized
            />
          </Link>

          <div ref={dialogRef} className="relative group w-full">
            {/* Small screens */}
            <div className={`sm:hidden ${searchVisible ? "block" : "hidden"}`}>
              <SearchForm2
                suggestions={suggestions}
                emptySearchResults={emptySearchResults}
                inputValue={inputValue}
                setSearchVisible={setSearchVisible}
                setInputValue={setInputValue}
                setOpenDialog={setOpenDialog}
                handleFetchSearchResults={handleFetchSearchResults}
              />
            </div>

            {/* Medium & large screens */}
            <div className={`sm:block hidden`}>
              <SearchForm3
                suggestions={suggestions}
                emptySearchResults={emptySearchResults}
                inputValue={inputValue}
                setSearchVisible={setSearchVisible}
                setInputValue={setInputValue}
                setOpenDialog={setOpenDialog}
                handleFetchSearchResults={handleFetchSearchResults}
              />
            </div>

            <SearchDialog2
              suggestions={suggestions}
              openDialog={openDialog}
              loading={loading}
              isLoaded={isLoaded}
              setOpenDialog={setOpenDialog}
            />
          </div>
        </div>

        {!searchVisible && (
          <div id="right" className="flex items-center sm:gap-5 gap-3 ml-auto">
            {/* Avatar */}
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
                    onLoad={() => updateAdminAvatarLoaded(true)}
                    src={
                      adminAvatar
                        ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${adminAvatar}`
                        : "/avatar.png"
                    }
                    fill
                    sizes="52px"
                    alt="avatar"
                    unoptimized
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

            {/* Search button */}
            <button
              onClick={() => setSearchVisible(true)}
              className="flex items-center sm:hidden justify-center rounded-full p-2 bg-primary text-white"
            >
              <IoSearchOutline className="" size={28} />
            </button>

            {!isLoggedIn && (
              <Link href={"/login"}>
                <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 sm:text-lg">
                  Login
                </button>
              </Link>
            )}

            <Link href={!isLoggedIn ? "/register" : "/upload"}>
              <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 sm:text-lg">
                <span>{!isLoggedIn ? "Join" : "Upload"}</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
