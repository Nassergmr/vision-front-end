"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminLinks from "./adminLinks";
import { CiImageOn } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { useStore } from "@/store/zustand";

export default function AdminCollections() {
  const router = useRouter();
  const { adminCollections } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <h2 className="text-neutral-700 text-center sm:text-3xl font-semibold text-2xl">
        Your Collections
      </h2>
      <AdminLinks />

      {adminCollections && adminCollections?.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-8 mx-auto col-span-3">
          <h3 className="text-2xl sm:text-3xl text-center">
            You don&apos;t have any collections.
          </h3>
          <div className="relative size-20 sm:size-30">
            <Image
              src={"/empty-wishlist.png"}
              fill
              sizes="(min-width: 640px width: 120px, 80px)"
              alt=""
            />
          </div>
          <Link href={"/"}>
            <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-500 sm:text-lg">
              <GoArrowLeft size={22} />
              <span>Make your collection</span>
            </button>
          </Link>
        </div>
      )}

      {adminCollections && adminCollections?.length > 0 && (
        <div
          id="images_container"
          className="grid xs5 md:grid-cols-3 grid-cols-2 sm:gap-8 sm:my-[2rem] my-[1rem] gap-3"
        >
          {adminCollections?.map((e) => (
            <Link
              href={`/collection/${e.id}`}
              key={e.id}
              className="flex flex-col gap-3 group"
            >
              <div className="relative w-full sm:h-[350px] h-[300px] overflow-hidden rounded-xl">
                <div className="inset-0 bg-black/30 z-10 absolute opacity-20 group-hover:opacity-100 rounded-xl transition-all duration-500"></div>

                {/* Collection preview grid */}
                {e.images.length !== 0 ? (
                  <div
                    className={`${
                      e.images.length > 2
                        ? "grid grid-cols-2 grid-rows-2 gap-1  h-full"
                        : e.images.length === 2
                        ? "grid grid-cols-2  gap-1 h-full"
                        : "h-full"
                    }`}
                  >
                    <div
                      className={`${
                        e.images.length > 2 ? " row-span-2" : ""
                      } relative h-full`}
                    >
                      <Image
                        src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${
                          e.images[e.images.length - 1]?.public_id
                        }`}
                        fill
                        alt=""
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className={`relative`}>
                      <Image
                        src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${
                          e.images[e.images.length - 2]?.public_id
                        }`}
                        fill
                        alt=""
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {e.images.length > 2 && (
                      <div className={`relative`}>
                        <Image
                          src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${
                            e.images[e.images.length - 3]?.public_id
                          }`}
                          fill
                          alt=""
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        "https://res.cloudinary.com/dae5vlvpe/image/upload/v1757606718/output-onlinepngtools_gta8gm.png"
                      }
                      fill
                      alt=""
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-600 group-hover:text-gray-800 text-xl transition-all duration-500 truncate">
                  {e.title}
                </p>
                <div className="flex items-center gap-1">
                  <CiImageOn
                    size={25}
                    className="text-gray-600 group-hover:text-gray-800  transition-all duration-500"
                  />
                  <p className="text-gray-600 group-hover:text-gray-800  transition-all duration-500 text-lg">
                    {e.images.length}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
