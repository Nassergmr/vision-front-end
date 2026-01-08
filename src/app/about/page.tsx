"use client";

import { useEffect, useState } from "react";
import { AboutData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  return (
    <div className="lg:w-[50%] md:w-[70%] w-full md:px-0 px-[15px] mx-auto sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="w-full h-[200px] relative">
          <Image
            src={"/pexels-andreea-ch-371539-1166644.jpg"}
            fill
            alt=""
            className="object-cover"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10">
          <Image
            src={"/logo_black.png"}
            width={120}
            height={120}
            className=""
            alt="avatar"
          />
        </div>
      </div>

      <div className="mt-4">
        {AboutData.map((e, index) => (
          <div key={index} className="flex flex-col gap-3">
            {e.title && (
              <h1 className="font-semibold text-2xl mt-9">{e.title}</h1>
            )}
            {e.text && <p className=" font-medium">{e.text}</p>}
            {e.list_title && (
              <h1 className="font-semibold text-2xl mt-9">{e.list_title}</h1>
            )}

            {e.list && (
              <ul className="flex flex-col gap-1 list-disc">
                {e.sub_title && <h3>{e.sub_title}</h3>}
                {e.list?.map((l) => (
                  <li className="font-semibold  ml-10" key={l.list_text}>
                    {l.bold_text}
                    <span className="font-normal ml-1">{l.list_text}</span>
                  </li>
                ))}
                {e.sub_title && <h3 className="">{e.sub_title_2}</h3>}
              </ul>
            )}
          </div>
        ))}
        <Link
          href={`${isLoggedIn ? "/upload" : "/login"}`}
          className="w-fit block mr-auto mt-9"
        >
          <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
            <span>Start creating today</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
