import Link from "next/link";
import {
  CiFacebook,
  CiInstagram,
  CiYoutube,
  CiLocationOn,
  CiGlobe,
} from "react-icons/ci";
import { PiTiktokLogoThin } from "react-icons/pi";

import { AdminData } from "../../../types/types";
// import { useEffect, useState } from "react";

interface Props {
  adminData?: AdminData;
}

export default function AdminSocials({ adminData }: Props) {
  const socials = [
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <CiLocationOn
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-purple-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      ),
      href: `https://www.google.com/maps/search/${encodeURIComponent(
        adminData?.location || ""
      )}`,
      show: adminData?.location,
    },
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <CiGlobe
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-green-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      ),
      href: adminData?.website?.startsWith("http")
        ? adminData.website
        : `https://${adminData?.website}`,
      show: adminData?.website,
    },
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center justify-center relative overflow-hidden rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <CiFacebook
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-blue-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      ),
      href: `https://facebook.com/${adminData?.facebook}`,
      show: adminData?.facebook,
    },
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-500">
          <CiInstagram
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-gradient-to-bl from-purple-500 via-pink-500 to-yellow-500 z-0 transition-all duration-500 group-hover:top-0">
            {" "}
          </div>
        </button>
      ),

      href: `https://instagram.com/${adminData?.instagram}`,
      show: adminData?.instagram,
    },
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <CiYoutube
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#FF3000] z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      ),

      href: `https://youtube.com/${adminData?.youtube}`,
      show: adminData?.youtube,
    },
    {
      icon: (
        <button className="cursor-pointer w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <PiTiktokLogoThin
            size={23}
            className="text-gray-900 relative z-10 transition-all duration-300 group-hover:text-white"
          />
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-[black] z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      ),

      href: `https://tiktok.com/${adminData?.tiktok}`,
      show: adminData?.tiktok,
    },
  ];

  return (
    <>
      {adminData?.bio && (
        <p className={`text-center text-gray-600 sm:w-[80%] w-full mx-auto`}>
          {adminData?.bio}
        </p>
      )}

      {socials.some((social) => social.show) && (
        <div
          className={`flex socials_container items-center gap-5 justify-center `}
        >
          {socials.map(
            (social, idx) =>
              social.show && (
                <Link
                  key={idx}
                  href={social.href || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white  flex items-center justify-center gap-6 flex-wrap"
                >
                  {social.icon}
                </Link>
              )
          )}
        </div>
      )}
    </>
  );
}
