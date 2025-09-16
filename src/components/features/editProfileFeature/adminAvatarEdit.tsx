import { useRef } from "react";
import Image from "next/image";
import { updateAdminAvatar } from "@/services/userServices";
import { Loader2 } from "lucide-react";
import { useStore } from "@/store/zustand";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { getImages } from "@/services/imageServices";

interface Props {
  handleFetchAdminAvatar: () => Promise<void>;
}

export default function AdminAvatarEdit({ handleFetchAdminAvatar }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    adminAvatar,
    adminAvatarLoaded,
    updateAdminAvatarLoaded,
    updateImages,
  } = useStore();

  const errorNotify = () => {
    toast.error(
      <div className="">
        <p className="text-center">
          Please upload a photo smaller than 5 MB in size
        </p>
      </div>
    );
  };

  // Hide input field but keep it functionality
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex gap-5 sm:gap-7 items-center">
      <div id="image_container" className="relative sm:size-35 size-28">
        <Image
          onLoad={() => {
            updateAdminAvatarLoaded(true);
          }}
          src={
            adminAvatar
              ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${adminAvatar}`
              : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_teitk6.png"
          }
          fill
          alt="avatar"
          unoptimized
          sizes="(min-width: 640px) 140px, 112px"
          className={`${
            !adminAvatarLoaded ? "brightness-50" : "brightness-100"
          } rounded-full object-cover`}
        />
        <div
          style={{ display: !adminAvatarLoaded ? "block" : "none" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Loader2 className="size-12 animate-spin text-gray-300" />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={async (e) => {
          const file = e.target.files ? e.target.files[0] : null;
          if (file) {
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > 5) {
              errorNotify();
              return;
            } else {
              updateAdminAvatarLoaded(false);
              await updateAdminAvatar(file);
              await handleFetchAdminAvatar();
              const res = await getImages(); // get latest avatar image in the body images
              updateImages(res);
            }
          }
        }}
        name="file"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
      />

      <button
        disabled={!adminAvatarLoaded}
        onClick={handleClick}
        className={`text-center gap-2 border-1 transition-all duration-500  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  w-fit text-white ${
          !adminAvatarLoaded
            ? "cursor-not-allowed  text-white bg-[#AFEBCE] hover:bg-[#AFEBCE]"
            : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369]"
        } `}
      >
        <span>{!adminAvatarLoaded ? "Loading" : "Change Image"}</span>
      </button>
      <ToastContainer
        position="top-center"
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
