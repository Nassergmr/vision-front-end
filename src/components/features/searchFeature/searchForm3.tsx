"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { ImageData } from "../../../../types/types";

export default function SearchForm3({
  suggestions,
  inputValue,
  emptySearchResults,
  setOpenDialog,
  setInputValue,
  setSearchVisible,
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
      className={`relative group w-[90%]`}
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
        className="border-gray-300 sm:px-5 px-3 py-3 rounded-lg w-full bg-[#F7F7F7]  focus:outline-none"
      />

      <button
        onClick={() => {
          setSearchVisible(false);
          setOpenDialog(false);
        }}
        className="text-gray-500 absolute right-[6px] top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <IoCloseOutline className="sm:hidden block" size={25} />
      </button>

      {suggestions.length > 0 &&
        !emptySearchResults &&
        inputValue.trim().length !== 0 && (
          <Link
            onClick={() => {
              setOpenDialog(false);
            }}
            className="absolute sm:right-[6px] right-[30px] top-1/2 -translate-y-1/2 rounded-md sm:hover:bg-gray-200  cursor-pointer p-2  text-gray-500 group-hover:text-gray-600 transition-all"
            href={`/search/${inputValue}`}
            id="search_button"
          >
            <IoSearchOutline className="" size={23} />
          </Link>
        )}
    </form>
  );
}
