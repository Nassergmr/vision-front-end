"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/zustand";
import ImageComponent from "../imageFeature/imageComponent";
import { CiImageOn } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { getSearchedImages } from "@/services/searchServices";
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

interface Props {
  query: string;
}

export default function SearchResults({ query }: Props) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setloading] = useState(false);

  const pathname = usePathname();
  const decodedQuery = decodeURIComponent(query);

  const { searchResults, updateSearchResults } = useStore();

  // Reset the scrollbar to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleFetchSearchResults = async () => {
      setloading(true);
      try {
        const res = await getSearchedImages(decodedQuery);
        setloading(false); // fix a ui issue
        updateSearchResults(res);
        setIsEmpty(res.length === 0);
      } catch (error) {
        alert(error);
      }
    };
    handleFetchSearchResults();
  }, [decodedQuery, updateSearchResults]);

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      {!loading && (
        <>
          <div className="flex items-end justify-between  sm:my-[2rem] my-[1rem]">
            <h3 className="text-2xl">Free {decodedQuery} Photos</h3>
            <div className="flex items-center gap-1">
              <CiImageOn
                size={30}
                className="text-gray-600 group-hover:text-gray-800  transition-all duration-500"
              />
              <p className="text-gray-600 group-hover:text-gray-800  transition-all duration-500 text-2xl">
                {searchResults.length}
              </p>
            </div>
          </div>

          <div
            id="gallery_container"
            className=" grid lg:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
          >
            {searchResults?.map((e) => (
              <ImageComponent key={e.id} e={e} />
            ))}
          </div>

          {isEmpty && (
            <div className="flex flex-col items-center justify-center gap-8 mt-[2rem]">
              <h3 className="text-3xl">No results found for {decodedQuery}</h3>
              <div className="relative size-30">
                <Image src={"/empty-collection.png"} fill alt="" />
              </div>
              <Link href={"/"}>
                <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 text-lg">
                  <GoArrowLeft size={22} />
                  <span>Browse photos</span>
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
