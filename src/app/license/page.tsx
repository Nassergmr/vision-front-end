"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { licenseData } from "@/lib/data";
import { MdClose, MdDone } from "react-icons/md";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <div className="mx-auto flex items-center gap-5 flex-col">
        <h2 className="text-3xl font-semibold">Legal Simplicity</h2>
        <p className="font-medium lg:w-[35%] sm:w-1/2 w-full text-center">
          All photos and videos on Vision can be downloaded and used for free.
        </p>
      </div>

      <div className="flex items-center gap-20 mt-20 flex-col lg:w-1/2 sm:w-[70%] w-full mx-auto mb-20">
        <div className="">
          <h1 className="text-3xl font-semibold text-center mb-5">
            What is allowed? 👌
          </h1>
          <div className="flex flex-col gap-3">
            {licenseData.allowed.map((e, index) => (
              <div
                className="flex gap-5 p-5 border border-gray-200 rounded-xl items-center"
                key={index}
              >
                <span>
                  <MdDone color="#5CCD83" size={24} />
                </span>
                <p className="">{e.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h1 className="text-3xl font-semibold text-center mb-5">
            What is not allowed? 👎
          </h1>
          <div className="flex flex-col gap-3">
            {licenseData.not_allowed.map((e, index) => (
              <div
                className="flex gap-5 p-5 border border-gray-200 rounded-xl items-center"
                key={index}
              >
                <span>
                  <MdClose color="#FF0076" size={24} />
                </span>
                <p className="">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 py-20 bg-[#F7F7F7]  rounded-4xl">
        <div className="mx-auto flex items-center gap-5 flex-col">
          <h2 className="text-3xl font-semibold text-center">
            Tell Better Stories With Real Images
          </h2>
          <p className="font-medium lg:w-[35%] sm:w-1/2 w-full text-center">
            Our platform exists to help creators and storytellers share
            authentic visuals that reflect real life.
          </p>
        </div>

        {/* Medium & large screens */}
        <div className=" hidden flex-col mt-20 bg-white sm:flex">
          <div
            id="left"
            className="grid sm:grid-cols-2 grid-cols-1 items-center"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px] w-full"
            >
              <Image
                src={"/pexels-ivan-s-4240505.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Websites & Apps</h2>
                <p className=" text-center w-[70%]">
                  Use photos on websites, blogs, mobile apps, landing pages,
                  e-books, newsletters, presentations, or templates.
                </p>
              </div>
            </div>
          </div>

          <div
            id="right"
            className="grid sm:grid-cols-2 grid-cols-1 items-center"
          >
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">
                  Marketing & Advertising
                </h2>
                <p className=" text-center w-[70%]">
                  Create ads, banners, and campaigns to promote your product,
                  brand, or service.
                </p>
              </div>
            </div>
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-picmatti-30181058.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
          </div>

          <div
            id="left"
            className="items-center grid sm:grid-cols-2 grid-cols-1"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-pavel-danilyuk-8000540.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Print Materials</h2>
                <p className=" text-center w-[70%]">
                  Flyers, posters, magazines, books, invitations, albums, and
                  more — print is allowed.
                </p>
              </div>
            </div>
          </div>

          <div
            id="right"
            className=" items-center grid sm:grid-cols-2 grid-cols-1"
          >
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Social Media</h2>
                <p className=" text-center w-[70%]">
                  Share photos on platforms like Instagram, Facebook, LinkedIn,
                  YouTube, or TikTok to grow your audience.
                </p>
              </div>
            </div>
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-cottonbro-5053738.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Small screens */}
        <div className="sm:hidden flex-col gap-10 mt-20 bg-white flex">
          <div
            id="left"
            className="grid sm:grid-cols-2 grid-cols-1 gap-5 items-center"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px] w-full"
            >
              <Image
                src={"/pexels-ivan-s-4240505.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Websites & Apps</h2>
                <p className=" text-center w-full">
                  Use photos on websites, blogs, mobile apps, landing pages,
                  e-books, newsletters, presentations, or templates.
                </p>
              </div>
            </div>
          </div>

          <div
            id="left"
            className="items-center grid sm:grid-cols-2 grid-cols-1 gap-5"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-pavel-danilyuk-8000540.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Print Materials</h2>
                <p className=" text-center w-full">
                  Flyers, posters, magazines, books, invitations, albums, and
                  more — print is allowed.
                </p>
              </div>
            </div>
          </div>

          <div
            id="right"
            className="grid sm:grid-cols-2 grid-cols-1 gap-5 items-center"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-picmatti-30181058.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">
                  Marketing & Advertising
                </h2>
                <p className=" text-center w-full">
                  Create ads, banners, and campaigns to promote your product,
                  brand, or service.
                </p>
              </div>
            </div>
          </div>

          <div
            id="right"
            className=" items-center grid sm:grid-cols-2 grid-cols-1 gap-5"
          >
            <div
              id="image_container"
              className="relative lg:h-[500px] sm:h-[350px] h-[300px]"
            >
              <Image
                src={"/pexels-cottonbro-5053738.jpg"}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div id="content" className="">
              <div className="mx-auto flex items-center gap-5 flex-col">
                <h2 className="text-2xl font-semibold">Social Media</h2>
                <p className=" text-center w-full">
                  Share photos on platforms like Instagram, Facebook, LinkedIn,
                  YouTube, or TikTok to grow your audience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`${isLoggedIn ? "/upload" : "/login"}`}
          className="w-fit block mr-auto mx-auto mt-20"
        >
          <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
            <span>Start creating today</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
