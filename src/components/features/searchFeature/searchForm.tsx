"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { ImageData } from "../../../../types/types";

export default function SearchForm({
  suggestions,
  inputValue,
  emptySearchResults,
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
        placeholder="search your photo"
        className=" h-[50px] rounded-xl border border-lightgrey outline-none transition-all duration-300  w-full sm:px-5 px-3"
      />

      {suggestions.length > 0 &&
        !emptySearchResults &&
        inputValue.trim().length !== 0 && (
          <Link
            className="absolute right-[6px] top-1/2 -translate-y-1/2 rounded-md hover:bg-[#7d7d7d29]  cursor-pointer p-2  text-gray-300  transition-all duration-500"
            href={`/search/${inputValue}`}
            id="search_button"
          >
            <IoSearchOutline className="" size={25} />
          </Link>
        )}
    </form>
  );
}
