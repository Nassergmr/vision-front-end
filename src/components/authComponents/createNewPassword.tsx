"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UpdatePassword } from "@/services/authServices";
import { getImages } from "@/services/imageServices";
import { useStore } from "@/store/zustand";
import ImageComponent from "../features/imageFeature/imageComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [token, router]);

  const handleCreatePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UpdatePassword(password, token);
      setSuccessMessage(
        "Your password has been updated successfully! Redirecting you to the login page..."
      );
      setErrorMessage("");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const { images, updateImages } = useStore();

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

  return (
    <>
      <div className="bg-black w-screen relative h-screen overflow-hidden">
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
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
              <div className="mx-auto flex items-center flex-col gap-2">
                <h1 className="font-medium text-2xl text-center">
                  Create a New Password
                </h1>
                <p className="text-center text-[#7F7F7F] font-medium">
                  Free photos shared by a growing community of creators to
                  inspire your ideas.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleCreatePassword}
              method="POST"
              className="space-y-3"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  New password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    autoComplete="password"
                    className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full placeholder:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className={`${
                  loading
                    ? "bg-[#AFEBCE] cursor-not-allowed  pointer-events-none"
                    : " bg-[#00CC83] cursor-pointer"
                } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-300   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
              >
                <span className="">
                  {loading ? "Loading" : "Update password"}
                </span>
              </button>
            </form>
            {successMessage.trim() !== "" && (
              <p className="text-[#37C57D] text-center mt-2">
                {successMessage}
              </p>
            )}
            {errorMessage.trim() !== "" && (
              <p className="text-[#cc1a5f] text-center mt-2">{errorMessage}</p>
            )}
          </DialogContent>
        </Dialog>
        <div id="gallery_container" className="list_2  overflow-hidden">
          {images?.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      </div>
    </>
  );
}
