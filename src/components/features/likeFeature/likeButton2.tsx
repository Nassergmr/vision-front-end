import { useRouter } from "next/navigation";
import { getImageLikes } from "@/services/imageServices";
import {
  fetchAdminLikedImages,
  fetchAdminLikes,
  updateImageLikes,
} from "@/services/userServices";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LikeButtonProps } from "../../../../types/types";
import { useStore } from "@/store/zustand";
import { Loader2 } from "lucide-react";

export default function LikeButton2({
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
        title={`${
          adminLikes?.some((el) => el.imageId === e.id) ? "Unlike" : "Like"
        }`}
        onClick={() =>
          adminData?.id
            ? handleUpdateImageLikes(e.id, e.public_id, adminData?.id)
            : router.push("/login")
        }
        className={`md:flex hidden ${
          loading4 ? "cursor-progress" : "cursor-pointer"
        } items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5  md:text-lg rounded-lg`}
      >
        {adminLikes?.some((img) => img.imageId === e.id) ? (
          <GoHeartFill
            color="#FF2077"
            size={22}
            className={`${
              adminLikes?.some((el) => el.imageId === e.id)
                ? " heart_animated"
                : ""
            }`}
          />
        ) : (
          <GoHeart
            color="black"
            size={22}
            className={`${
              adminLikes?.some((el) => el.imageId === e.id)
                ? " heart_animated"
                : ""
            }`}
          />
        )}

        <p className="lg:block hidden">
          {adminLikes?.some((img) => img.imageId === e.id) ? "Liked" : "Like"}
        </p>
      </button>

      {/* Small & medium screens */}
      <button
        title={`${
          adminLikes?.some((el) => el.imageId === e.id) ? "Unlike" : "Like"
        }`}
        onClick={() =>
          adminData?.id
            ? handleUpdateImageLikes(e.id, e.public_id, adminData?.id)
            : router.push("/login")
        }
        className={` md:hidden flex ${
          loading4 ? "cursor-progress" : "cursor-pointer"
        } items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5  md:text-lg rounded-lg`}
      >
        {adminLikes?.some((img) => img.imageId === e.id) ? (
          loading4 ? (
            <Loader2 className="size-5.5 animate-spin text-black " />
          ) : (
            <GoHeartFill
              color="#FF2077"
              size={22}
              className={`${
                adminLikes?.some((el) => el.imageId === e.id)
                  ? " heart_animated"
                  : ""
              }`}
            />
          )
        ) : loading4 ? (
          <Loader2 className="size-5.5 animate-spin text-black " />
        ) : (
          <GoHeart
            color="black"
            size={22}
            className={`${
              adminLikes?.some((el) => el.imageId === e.id)
                ? " heart_animated"
                : ""
            }`}
          />
        )}
      </button>
    </>
  );
}
