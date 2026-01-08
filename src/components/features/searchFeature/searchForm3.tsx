"use client";

import { useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ImageData } from "../../../../types/types";
import { useRouter } from "next/navigation";

export default function SearchForm3({
  // suggestions,
  inputValue,
  // emptySearchResults,
  setOpenDialog,
  setInputValue,
  handleFetchSearchResults,
}: {
  suggestions: ImageData[];
  emptySearchResults: boolean;
  inputValue: string;
  setOpenDialog: (value: boolean) => void;
  setInputValue: (value: string) => void;
  setSearchVisible: (value: boolean) => void;
  handleFetchSearchResults: () => void;
}) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (inputValue.trim() === "") {
      return;
    }
    debounceRef.current = setTimeout(() => {
      handleFetchSearchResults();
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [handleFetchSearchResults, inputValue]);

  const handleRouterPush = () => {
    router.push(`/search/${inputValue}`);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`relative group w-[85%]`}
    >
      <input
        onClick={() => {
          if (inputValue) {
            setOpenDialog(true);
          }
        }}
        onChange={(e) => {
          setOpenDialog(true);
          setInputValue(e.target.value);
        }}
        value={inputValue}
        placeholder="Search your photo"
        className="h-[58px] placeholder:text-[#A8A8A8] rounded-xl bg-[#F7F7F7] outline-none transition-all duration-300  w-full sm:px-5 px-3"
      />

      <button
        disabled={
          // suggestions.length < 1 ||
          // emptySearchResults ||
          inputValue.trim().length === 0
        }
        onClick={handleRouterPush}
        className="absolute right-[6px] top-1/2 -translate-y-1/2 rounded-md hover:bg-[#7d7d7d29]  cursor-pointer p-2  text-gray-300  transition-all duration-300"
        id="search_button"
      >
        <IoSearchOutline className="" size={25} color="#A8A8A8" />
      </button>
    </form>
  );
}
