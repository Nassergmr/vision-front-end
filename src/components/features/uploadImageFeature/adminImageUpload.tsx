"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchAdminImages, updateImageUpload } from "@/services/userServices";
import { FileUpload } from "@/components/ui/file-upload";
import { GoStarFill } from "react-icons/go";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { GoQuestion } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/store/zustand";

export default function AdminImageUpload() {
  const [imageUpload, setimageUpload] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [imageTags, setImageTags] = useState("");

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const { updateAdminImages } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const notify = () =>
    toast.success(
      <div className="flex flex-col gap-5 py-5 items-center justify-center w-full">
        <h3 className="text-lg text-center">
          Your photo has been uploaded successfully.
        </h3>
        <Link
          href={"/my-profile/gallery"}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  cursor-pointer  shadow-xs w-fit mx-auto transition-all duration-300"
        >
          <span>View in Gallery</span>
        </Link>
      </div>
    );

  const errorNotify = () => {
    toast.error(
      <div className="py-5">
        <p className="text-center">
          Please upload a photo between 200 KB and 10 MB in size
        </p>
      </div>
    );
  };

  const handleSelectImage = (file: File | null) => {
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 10 || fileSizeMB < 0.2) {
        errorNotify();
        setFile(null);
        return;
      } else {
        setimageUpload(file);
      }
    }
  };

  const handleImageUpload = async () => {
    setLoading(true);
    try {
      if (imageUpload) {
        await updateImageUpload(
          imageUpload,
          imageTitle,
          imageLocation,
          imageTags
        );
        notify();
      } else {
        console.error("No file selected for upload.");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setFile(null);
      setImageTitle("");
      setImageLocation("");
      setImageTags("");
      setimageUpload(null);
      const res = await fetchAdminImages();
      updateAdminImages(res);
    }
  };

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <FileUpload file={file} setFile={setFile} onChange={handleSelectImage} />

      <div
        id="inputs_container"
        className="flex sm:flex-row sm:flex-wrap flex-col gap-5 items-center sm:mt-5 justify-center"
      >
        <div className="sm:w-auto w-full">
          <h3 className="text-gray-700 flex gap-0.5 mb-1">
            <span>Title</span>
            <span className="">
              <GoStarFill size={8} className="text-red-400 mt-1" />
            </span>
          </h3>
          <input
            className="border border-gray-300 px-3 py-3 rounded-md outline-none sm:w-auto w-full"
            type="text"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />
        </div>
        <div className="sm:w-auto w-full">
          <h3 className="text-gray-700 flex gap-1 items-center mb-1">
            <span>Location</span>{" "}
            <span className="text-sm text-gray-400">(Optional)</span>
          </h3>
          <input
            className="border border-gray-300 px-3 py-3 rounded-md outline-none sm:w-auto w-full"
            type="text"
            value={imageLocation}
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </div>

        <div className="sm:w-auto w-full">
          <div className="flex justify-between items-end mb-1">
            <h3 className="text-gray-700 flex gap-1 items-center">
              <span>Tags</span>{" "}
              <span className="text-sm text-gray-400">(Optional)</span>
            </h3>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
              <TooltipTrigger onClick={() => setIsOpen((prev) => !prev)}>
                <GoQuestion size={20} className="text-gray-700 mb-0.5" />
              </TooltipTrigger>
              <TooltipContent className="">
                <p className="text-center">
                  Enter tags separated by commas (e.g., beach, sunset). Tags
                  make your photo easier to discover.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <input
            className="border border-gray-300 px-3 py-3 rounded-md outline-none sm:w-auto w-full"
            type="text"
            value={imageTags}
            onChange={(e) => setImageTags(e.target.value)}
          />
        </div>
      </div>

      <button
        disabled={!imageUpload || loading || imageTitle.trim().length === 0}
        onClick={handleImageUpload}
        className={`text-center block gap-2 border-1 transition-all duration-300  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  w-fit mx-auto mt-8 text-white ${
          !imageUpload || loading || imageTitle.trim().length === 0
            ? "bg-[#AFEBCE] cursor-not-allowed hover:bg-[#AFEBCE] "
            : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369] "
        } `}
      >
        {loading ? "Loading" : "Submit your photo"}
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        transition={Bounce}
        icon={false}
      />
    </div>
  );
}
