"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TabRef = HTMLButtonElement | null;

export default function AdminLinks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [linksRef] = useState<TabRef[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const hoveredTab = linksRef[hoveredIdx ?? -1]?.getBoundingClientRect();
  const containerRect = containerRef.current?.getBoundingClientRect();

  const path = usePathname();

  const links = [
    { label: "Gallery", href: "/my-profile/gallery" },
    { label: "Collections", href: "/my-profile/collections" },
    { label: "Likes", href: "/my-profile/likes" },
    { label: "Downloads", href: "/my-profile/downloads" },
  ];

  const settings = {
    infinite: false,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Medium & large screens */}
      <div
        ref={containerRef}
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative xs4 hidden items-center gap-3 justify-center my-[3rem] w-fit mx-auto"
      >
        {links.map((el, index) => (
          <Link
            key={index}
            href={el.href}
            className={`${
              el.href === path ? "pointer-events-none" : "cursor-pointer"
            }`}
          >
            <button
              ref={(el) => {
                linksRef[index] = el;
              }}
              className={`px-5 py-3 font-medium transition duration-[0.14s]
              ${
                el.href === path
                  ? "bg-black text-white rounded-xl"
                  : "text-gray-600 hover:text-black cursor-pointer"
              }`}
              onPointerEnter={() => setHoveredIdx(index)}
            >
              {el.label}
            </button>
          </Link>
        ))}

        <AnimatePresence>
          {hoveredTab && containerRect ? (
            <motion.div
              className="absolute bg-gray-100 rounded-xl -z-10"
              initial={{
                top: hoveredTab.top - containerRect.top,
                left: hoveredTab.left - containerRect.left,
                width: hoveredTab.width,
                height: hoveredTab.height,
                opacity: 0,
              }}
              animate={{
                top: hoveredTab.top - containerRect.top,
                left: hoveredTab.left - containerRect.left,
                width: hoveredTab.width,
                height: hoveredTab.height,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
            />
          ) : null}
        </AnimatePresence>
      </div>

      {/* Small Screens */}
      <div className="relative xs3 hidden items-center justify-between my-[2rem] w-full">
        <Slider {...settings} className="w-full">
          {links.map((el, index) => (
            <div key={index} className="px-1">
              <Link
                href={el.href}
                className={` block w-full ${
                  el.href === path ? "pointer-events-none" : "cursor-pointer"
                }`}
              >
                <button
                  className={` ${
                    el.href === path
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black cursor-pointer bg-gray-100  hover:bg-gray-200 "
                  }
                     w-full py-2 px-4 text-sm rounded-full whitespace-nowrap transition`}
                >
                  {el.label}
                </button>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
