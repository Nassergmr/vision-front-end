"use client";

import { useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ImageData } from "../../../../types/types";
import { useRouter } from "next/navigation";

export default function SearchForm({
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
  setSuggestions: (value: []) => void;
  setOpenDialog: (value: boolean) => void;
  setInputValue: (value: string) => void;
  handleFetchSearchResults: () => void;
}) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const route = useRouter();

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

  // Redirect to search results page
  const handlePushRouter = () => {
    route.push(`/search/${inputValue}`);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative group w-full"
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
        className="h-[58px] xl:h-[65px] rounded-xl placeholder:text-[#A8A8A8] bg-[#F7F7F7] outline-none transition-all duration-300  w-full sm:px-5 px-3 text-black"
      />

      <button
        disabled={
          // suggestions.length < 1 ||
          // emptySearchResults ||
          inputValue.trim().length === 0
        }
        onClick={handlePushRouter}
        className="absolute right-[6px] top-1/2 -translate-y-1/2 rounded-md hover:bg-[#7d7d7d29]  cursor-pointer p-2  text-[#A8A8A8]  transition-all duration-300"
        id="search_button"
      >
        <IoSearchOutline className="" size={25} color="#A8A8A8" />
      </button>
    </form>
  );
}
