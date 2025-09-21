import Link from "next/link";
import Image from "next/image";
import { AvatarNameDownloadProps } from "../../../../types/types";
import DownloadButton from "../downloadFeature/downloadButton";
import { useStore } from "@/store/zustand";

export default function AvatarNameDownload({
  e,
  galleryPath,
}: AvatarNameDownloadProps) {
  const { adminData } = useStore();

  return (
    <div
      id="avatar_user-name_download"
      className="md:flex hidden justify-between items-end absolute bottom-6 w-full px-3 group-hover:opacity-100 ease-in-out transition-all duration-500 opacity-0"
    >
      {/* User-avatar & user-name */}
      <Link
        scroll={true}
        href={`/profile/${galleryPath ? adminData?.slug : e.user?.slug}`}
        id="avatar_user-name"
        className=" flex gap-2 items-center"
      >
        <div id="avatar_container" className="relative size-11">
          <Image
            src={
              galleryPath
                ? adminData?.avatar
                  ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${adminData?.avatar}`
                  : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
                : e.user?.avatar
                ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.user?.avatar}`
                : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
            }
            fill
            sizes="44px"
            alt="avatar"
            className="rounded-full object-cover"
          />
        </div>

        <p className="text-white truncate max-w-full">
          {galleryPath ? adminData?.firstName : e.user?.firstName}{" "}
          {galleryPath ? adminData?.lastName : e.user?.lastName}
        </p>
      </Link>

      {/* Download */}
      <DownloadButton e={e} />
    </div>
  );
}
