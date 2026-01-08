import { useState } from "react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import {
  addToExistingCollection,
  fetchAdminCollections,
} from "@/services/userServices";
import { AddToCollectionProps } from "../../../../types/types";
import { useStore } from "@/store/zustand";
import { Skeleton } from "@/components/ui/skeleton";
import { CiImageOn } from "react-icons/ci";

export default function AddToExistingCollectionComponent({
  loading,
  imgId,
  setLoading,
}: AddToCollectionProps) {
  const [isId, setIsId] = useState("");

  const {
    adminCollections,
    updateAdminCollections,
    updateAdminCollectionsImages,
  } = useStore();

  const handleAddToExistingCollection = async (id: string, imgId: string) => {
    setIsId(id);
    setLoading(true);
    try {
      await addToExistingCollection(id, imgId);
      const res = await fetchAdminCollections();
      updateAdminCollections(res);
      updateAdminCollectionsImages(
        res.flatMap((collection: { images: [] }) => collection.images || [])
      );
    } catch (error) {
      alert(error);
    } finally {
      await fetchAdminCollections();
      setLoading(false);
    }
  };

  return (
    <div
      id="collections_container"
      className="grid grid-cols-3  md:gap-x-5 gap-x-3 gap-y-5 xs2"
    >
      {adminCollections?.map((el) => (
        <button
          disabled={loading}
          onClick={() => {
            handleAddToExistingCollection(el.id, imgId);
          }}
          id="collection"
          key={el.id}
          className={`group ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div
            id="image_container"
            className="w-full relative h-39 group overflow-hidden rounded-xl"
          >
            {/* Collection preview image */}
            {el.images.length > 0 && (
              <Image
                src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${
                  el.images[el.images.length - 1]?.public_id
                }`}
                fill
                sizes="165px"
                alt={el.title}
                className={`object-cover`}
              />
            )}

            {/* Empty collection preview image*/}
            {el.images.length === 0 && (
              <div className="bg-[#ebebeb] w-full h-full relative">
                {loading && (
                  <Skeleton
                    className={`${
                      el.id === isId ? "block" : "hidden"
                    } relative w-full h-full rounded-xl bg-gray-300/60 z-20`}
                  />
                )}
                <CiImageOn
                  size={75}
                  color="#7F7F7F"
                  className={`top-1/2 absolute left-1/2 -translate-1/2`}
                />
              </div>
            )}
            {loading && (
              <Skeleton
                className={`${
                  el.id === isId ? "block" : "hidden"
                } relative w-full h-full rounded-xl bg-gray-300/60 z-20`}
              />
            )}

            {el.images.some((img) => img.id === imgId) ? (
              <div
                id="image_overlay_in_collection"
                className={`absolute ${
                  loading && el.id === isId
                    ? "bg-none! "
                    : "sm:group-hover:bg-red-700/60 bg-[#37C57D]/60"
                }  inset-0 justify-center flex items-center transition-all  `}
              >
                <div
                  id="icons_container"
                  className={`${
                    loading && el.id === isId ? "hidden" : "flex"
                  }   rounded-full h-13 w-13  items-center justify-center border-4 border-white`}
                >
                  <MdOutlineDone
                    className={`group-hover:hidden text-white`}
                    size={32}
                  />
                  <AiOutlineMinus
                    className="group-hover:block hidden text-white"
                    size={32}
                  />
                </div>
              </div>
            ) : (
              !loading && (
                <div
                  id="image_overlay_not_in_collection"
                  className={` absolute flex sm:bg-black/80 opacity-0 sm:group-hover:opacity-100 inset-0 justify-center items-center transition-all`}
                >
                  <div
                    id="icons_container"
                    className={`rounded-full h-13 w-13 flex items-center justify-center border-4 border-white`}
                  >
                    <AiOutlinePlus className="text-white" size={32} />
                  </div>
                </div>
              )
            )}
          </div>
          <p className="text-gray-800 mt-1 z-10 truncate max-h-10">
            {el.title}
          </p>
        </button>
      ))}
    </div>
  );
}
