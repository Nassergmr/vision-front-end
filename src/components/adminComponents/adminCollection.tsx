"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  collectionEdit,
  deleteCollection,
  fetchAdminCollection,
  fetchAdminCollections,
} from "@/services/userServices";
import ImageComponent from "../features/imageFeature/imageComponent";
import { CollectionData } from "../../../types/types";
import { GoArrowLeft, GoPencil, GoStarFill } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useStore } from "@/store/zustand";

type Props = {
  id: string;
};

export default function AdminCollection({ id }: Props) {
  const [collection, setCollection] = useState<CollectionData>();
  const [collectionTitle, setCollectionTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [dialogOpen, setdialogOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const { updateAdminCollections, updateAdminCollectionsImages } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    handleFetchAdminCollection(id);
  }, [id, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFetchAdminCollection = async (id: string) => {
    try {
      const res = await fetchAdminCollection(id);
      setCollection(res);
      setCollectionTitle(res.title);
    } catch (error) {
      alert(error);
    }
  };

  const handleEditCollection = async () => {
    setLoading(true);
    try {
      await collectionEdit(id, collectionTitle);
    } catch (error) {
      alert(error);
    } finally {
      await handleFetchAdminCollection(id);
      const res = await fetchAdminCollections();
      updateAdminCollections(res);
      updateAdminCollectionsImages(
        res.flatMap((collection: { images: [] }) => collection.images || [])
      );
      setLoading(false);
      setCollectionTitle("");
      setdialogOpen(false);
    }
  };

  const handleDeleteCollection = async () => {
    setLoading2(true);
    try {
      await deleteCollection(id);
    } catch (error) {
      alert(error);
    } finally {
      const res = await fetchAdminCollections();
      updateAdminCollections(res);
      updateAdminCollectionsImages(
        res.flatMap((collection: { images: [] }) => collection.images || [])
      );
      router.push("/my-profile/collections");
    }
  };

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
        <DialogTrigger
          onClick={() => setVisible(true)}
          className="flex justify-center mx-auto mb-3 sm:mb-5  items-center  bg-[#00CC83] hover:bg-[#00a369] transition-all duration-300 sm:p-3 p-2.5 rounded-full cursor-pointer"
        >
          <GoPencil className="text-white sm:size-7 size-6" />
        </DialogTrigger>

        <DialogContent>
          {visible ? (
            // Update collection
            <div className="w-full flex flex-col gap-2">
              <DialogHeader>
                <DialogTitle className="mx-auto mb-5 text-3xl font-medium">
                  Edit collection
                </DialogTitle>
              </DialogHeader>

              <h3 className="text-gray-700 flex  gap-0.5 -mb-2 font-semibold">
                <span>Title</span>
                <span className="mt-1">
                  <GoStarFill size={8} className="text-red-400 " />
                </span>
              </h3>

              <input
                className="border border-gray-300 px-3 py-3 rounded-md"
                type={"text"}
                required={true}
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
              />

              <div className="flex items-center gap-3 mt-5">
                <Button
                  disabled={collectionTitle.trim().length === 0 || loading}
                  onClick={handleEditCollection}
                  variant={"default"}
                  className="transition-all border-1 duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
                >
                  <span>{loading ? "Loading" : "Update Collection"}</span>
                </Button>

                <button
                  onClick={() => {
                    setVisible(false);
                  }}
                  disabled={loading}
                  className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            // Delete collection
            <div className="w-full flex flex-col gap-2">
              <DialogHeader>
                <DialogTitle className="mx-auto mb-5 text-3xl font-medium">
                  Are you sure?
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-3 mx-auto">
                <Button
                  disabled={loading2}
                  onClick={handleDeleteCollection}
                  variant={"default"}
                  className="transition-all border-1 duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  bg-[#FF2077] hover:bg-[#cc1a5f]"
                >
                  <span> Delete Collection</span>
                </Button>

                <button
                  onClick={() => setVisible(true)}
                  className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {!collection && (
        <Skeleton className="w-[200px] h-8 mx-auto bg-gray-200" />
      )}
      <h3 className="text-center  text-2xl mx-auto mb-[2rem] w-full sm:max-w-[50%]">
        {collection?.title}
      </h3>
      {collection?.images.length !== 0 ? (
        <div id="images_container" className="list">
          {collection?.images.map((e) => (
            <ImageComponent key={e.id} e={e} />
          ))}
        </div>
      ) : (
        // Empty collection
        <div className="flex flex-col items-center justify-center gap-8 mt-[4rem]">
          <h3 className="text-2xl sm:text-3xl text-center">
            Your collection is empty.
          </h3>
          <div className="relative size-20 sm:size-30">
            <Image
              src={"/empty-collection.png"}
              sizes="(min-width: 640px width: 120px, 80px)"
              fill
              alt=""
            />
          </div>
          <Link href={"/"}>
            <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
              <GoArrowLeft size={22} />
              <span>Add Photos</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
