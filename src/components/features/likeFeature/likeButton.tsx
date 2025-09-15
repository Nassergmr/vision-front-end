import { useRouter } from "next/navigation";
import { getImageLikes } from "@/services/imageServices";
import {
  fetchAdminLikedImages,
  fetchAdminLikes,
  updateImageLikes,
} from "@/services/userServices";
import { LikeButtonProps } from "../../../../types/types";
import { useStore } from "@/store/zustand";
import { CiHeart } from "react-icons/ci";
import { Loader2 } from "lucide-react";

export default function LikeButton({
  e,
  loading4,
  setLoading4,
  setImageLikes,
}: LikeButtonProps) {
  const router = useRouter();

  const { adminData, adminLikes, updateAdminLikes, updateAdminLikedImages } =
    useStore();

  const handleFetchImageLikes = async (id: string) => {
    try {
      const res = await getImageLikes(id);
      setImageLikes(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminLikes = async () => {
    try {
      const data = await fetchAdminLikes();
      updateAdminLikes(data);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateImageLikes = async (
    id: string,
    url: string,
    adminId: string
  ) => {
    setLoading4(true);
    try {
      await updateImageLikes(id, url, adminId);
      await handleFetchAdminLikes();
      handleFetchImageLikes(id);
    } catch (error) {
      alert(error);
    } finally {
      setLoading4(false);
      const res = await fetchAdminLikedImages();
      updateAdminLikedImages(res);
    }
  };

  return (
    <>
      {/* Large screens */}
      <button
        onClick={() =>
          adminData
            ? handleUpdateImageLikes(e.id, e.public_id, adminData?.id)
            : router.push("/login")
        }
        title={`${
          adminLikes?.some((el) => el.imageId === e.id) ? "Unlike" : "Like"
        }`}
        className={`lg:block hidden p-2 rounded-xl transition-all duration-500 cursor-pointer 
        ${
          adminLikes?.some((el) => el.imageId === e.id)
            ? "bg-[#DB275F] opacity-100 block  order-2"
            : "bg-black/30 hover:bg-black/50 group-hover:opacity-100 opacity-0"
        }
       ${loading4 ? "cursor-progress" : "cursor-pointer"}`}
      >
        <CiHeart
          className={`${
            adminLikes?.some((el) => el.imageId === e.id)
              ? " heart_animated"
              : ""
          } text-white md:text-[28px] text-[24px]`}
        />
      </button>

      {/* Small & medium screens */}
      <button
        onClick={() =>
          adminData
            ? handleUpdateImageLikes(e.id, e.public_id, adminData?.id)
            : router.push("/login")
        }
        className={` block lg:hidden p-2 rounded-xl transition-all duration-500  cursor-pointer 
        ${
          adminLikes?.some((el) => el.imageId === e.id)
            ? "bg-[#DB275F] block order-2"
            : "bg-black/30 hover:bg-black/50 hidden! "
        }
      `}
      >
        {loading4 ? (
          <Loader2 className="size-6 md:size-7 animate-spin text-white" />
        ) : (
          <CiHeart
            className={`${
              adminLikes?.some((el) => el.imageId === e.id)
                ? "heart_animated"
                : ""
            } text-white md:text-[28px] text-[24px]`}
          />
        )}
      </button>
    </>
  );
}
