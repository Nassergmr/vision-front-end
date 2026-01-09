"use client";

import { useStore } from "@/store/zustand";
import ImageComponent from "../features/imageFeature/imageComponent";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Register from "@/components/authComponents/register";
import Login from "@/components/authComponents/login";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EnterEmail from "@/components/authComponents/sendEmail";
import { getImages } from "@/services/imageServices";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const [isOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();

  const { images, updateImages } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    } else setIsLoggedIn(true);
  }, [router]);

  useEffect(() => {
    const handleFetchImages = async () => {
      try {
        const res = await getImages();
        updateImages(res);
      } catch (error) {
        alert(error);
      }
    };
    handleFetchImages();
  }, [updateImages]);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    isLoggedIn && (
      <div className="bg-black w-screen relative h-screen">
        <nav className="z-[60] w-full fixed top-0 left-0 py-4 container-custom bg-white">
          {/* Logo */}
          <Link id="logo_container" href={"/"} className="w-fit block">
            <Image
              src={"/logo_black.png"}
              width={52}
              height={52}
              className="h-[52px] sm:w-auto w-[52px]"
              alt="avatar"
            />
          </Link>
        </nav>
        {/* <div className="bg-black/30 inset-0 absolute  z-10 w-full h-full"></div> */}
        <Dialog open={isOpen}>
          <DialogTrigger></DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="top-[calc(50%+45px)]"
          >
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            {/* Slider */}
            <div className="slider-container relative">
              <Slider
                ref={sliderRef}
                {...settings}
                className="xs6 w-[400px] lg:w-[480px] mx-auto "
              >
                <Login sliderRef={sliderRef} />
                <EnterEmail sliderRef={sliderRef} />
                <Register sliderRef={sliderRef} />
              </Slider>
            </div>
          </DialogContent>
        </Dialog>
        <div id="gallery_container" className="list_2  overflow-hidden">
          {images?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      </div>
    )
  );
}
