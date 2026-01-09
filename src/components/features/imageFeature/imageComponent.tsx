"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Types
import { Comment, ImageData } from "../../../../types/types";

// React Icons
import { GoBookmark, GoLocation, GoStarFill } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { BsBookmarkPlus } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { MdClosedCaptionOff } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

// Shadcn UI
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Services Functions
import {
  fetchAdminCollections,
  fetchAdminDownloadedImages,
  fetchAdminDraftImages,
  fetchAdminImages,
  fetchAdminLikedImages,
  fetchAdminPublishedImages,
} from "@/services/userServices";
import {
  deleteImage,
  getImage,
  getImageComments,
  getImageDownloads,
  getImageLikes,
  getImageViews,
  updateImageViews,
} from "@/services/imageServices";

// Components
import LikeButton from "../likeFeature/likeButton";
import AddToNewCollectionComponent from "../collectFeature/addToNewCollection";
import AddToExistingCollectionComponent from "../collectFeature/addToExistingCollection";
import AvatarNameDownload from "./avatar_name_download";
import LikeButton2 from "../likeFeature/likeButton2";
import CommentComponent from "../commentFeature/comment";
import UpdateImageVisibility from "./updateImageVisibility";
import AdminImageDelete from "./adminImageDelete";
import AdminImageDelete2 from "./adminImageDelete2";
import UpdateImageVisibility2 from "./updateImageVisibility2";

// Zustand
import { useStore } from "@/store/zustand";
import DownloadButton2 from "../downloadFeature/downloadButtton2";

interface ImageComponentProps {
  e: ImageData;
}

export default function ImageComponent({ e }: ImageComponentProps) {
  const [imageLikes, setImageLikes] = useState(0);
  const [imageComments, setImageComments] = useState<Comment[]>([]);
  const [imageComment, setImageComment] = useState("");
  const [imageViews, setImageViews] = useState(0);
  const [imageDownloads, setImageDownloads] = useState(0);

  const [galleryPath, setGalleryPath] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [isLoaded3, setIsLoaded3] = useState(false);

  const [isPublished, setIsPublished] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen3, setDialogOpen3] = useState(false);
  const [dialogOpen4, setDialogOpen4] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(true);
  const [dialogVisible2, setDialogVisible2] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const {
    adminData,
    adminLikes,
    adminCollections,
    adminCollectionsImages,
    updateAdminImages,
    updateAdminCollections,
    updateAdminDownloadedImages,
    updateAdminPublishedImages,
    updateAdminDraftImages,
    updateAdminLikedImages,
  } = useStore();

  useEffect(() => {
    if (!dialogOpen || !dialogOpen2) {
      setCollectionTitle("");
      setLoading(false);
    }
  }, [dialogOpen, dialogOpen2, adminCollectionsImages]);

  useEffect(() => {
    if (pathName.includes("/gallery")) {
      setGalleryPath(true);
    } else {
      setGalleryPath(false);
    }
  }, [pathName]);

  const handleFetchImageLikes = async (id: string) => {
    try {
      const res = await getImageLikes(id);
      setImageLikes(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchImageComments = async (id: string) => {
    try {
      const res = await getImageComments(id);
      setImageComments(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchImageViews = async (id: string) => {
    try {
      const res = await getImageViews(id);
      setImageViews(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchImageDownloads = async (id: string) => {
    try {
      const res = await getImageDownloads(id);
      setImageDownloads(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchImageData = useCallback(async () => {
    try {
      const res = await getImage(e.id);
      if (res.published === true) {
        setIsPublished(true);
      } else {
        setIsPublished(false);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsFetched(true);
    }
  }, [e.id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    handleFetchImageData();
  }, [handleFetchImageData]);

  const handleDeleteImage = async () => {
    setLoading(true);
    try {
      await deleteImage(e.id);
      setLoading(false);
      setDialogOpen3(false);
      // Update to latest data after delete
      const res = await fetchAdminImages();
      updateAdminImages(res);
      const res2 = await fetchAdminPublishedImages();
      updateAdminPublishedImages(res2);
      const res3 = await fetchAdminDraftImages();
      updateAdminDraftImages(res3);
      const res4 = await fetchAdminLikedImages();
      updateAdminLikedImages(res4);
      const res5 = await fetchAdminCollections();
      updateAdminCollections(res5);
      const res6 = await fetchAdminDownloadedImages();
      updateAdminDownloadedImages(res6);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchData = async (id: string) => {
    await Promise.all([
      handleFetchImageComments(id),
      handleFetchImageLikes(id),
      handleFetchImageViews(id),
      handleFetchImageDownloads(id),
      updateImageViews(id),
    ]);
  };

  // Date formating
  function formatDateWithSuffix(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${month} ${day}${daySuffix}, ${year} at ${time}`;
  }
  return (
    <div
      id="image_container"
      key={e.id}
      className="group relative overflow-hidden py-1.5"
    >
      <Dialog open={dialogOpen2} onOpenChange={setDialogOpen2}>
        <DialogTrigger
          className="cursor-pointer"
          onClick={() => handleFetchData(e.id)}
        >
          <Image
            onLoad={() => setIsLoaded(true)}
            src={`${`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto,w_1200,dpr_auto/${e.public_id}`}`}
            width={e.width}
            height={e.height}
            sizes="
            (min-width: 1024px) 33vw,
            (min-width: 640px) 50vw,z
            100vw"
            alt={e.title}
            className={`object-cover ${
              isLoaded ? "opacity-100" : "opacity-0"
            } rounded-xl border-none transition-opacity duration-300  min-h-[150px] sm:min-h-auto`}
          />
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="min-h-[85vh] sm:min-h-[95vh] xl:w-[55%] lg:w-[65%] md:w-[80%] sm:w-[90%] w-full  overflow-y-scroll"
        >
          <DialogTitle></DialogTitle>

          <DialogHeader>
            <div
              id="header_container"
              className="flex justify-between items-center mt-3 sm:mt-0"
            >
              {/*  User avatar & user name */}
              <Link
                onClick={() => setDialogOpen2(false)}
                href={`/profile/${
                  galleryPath ? adminData?.slug : e.user?.slug
                }`}
                id="avatar_user-name"
                className=" flex gap-2 items-center"
              >
                <div id="avatar_container" className="relative size-13">
                  <Skeleton
                    className={`${
                      !isLoaded3 ? "opacity-100" : "opacity-0"
                    } relative w-ful h-full rounded-full bg-gray-200`}
                  />

                  <Image
                    onLoad={() => setIsLoaded3(true)}
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
                    sizes="52px"
                    alt={e.title}
                    className={`rounded-full object-cover  h-auto w-full ${
                      isLoaded3 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                <p className="truncate max-w-30 hidden sm:block">
                  {galleryPath ? adminData?.firstName : e.user?.firstName}{" "}
                  {galleryPath ? adminData?.lastName : e.user?.lastName}
                </p>
              </Link>

              <div
                id="like_collect_download"
                className="flex items-center gap-3"
              >
                {!galleryPath ? (
                  <>
                    {/* Like */}
                    <LikeButton2
                      e={e}
                      loading4={loading4}
                      setLoading4={setLoading4}
                      imageLikes={imageLikes}
                      setImageLikes={setImageLikes}
                    />

                    {/* Collect */}
                    {/* Add to existing collection */}
                    <Dialog open={dialogOpen3} onOpenChange={setDialogOpen3}>
                      <DialogTrigger
                        onClick={() => {
                          if (!adminData) {
                            router.push("/login");
                          }
                          setDialogVisible2(true);
                        }}
                        title={` ${
                          adminCollectionsImages?.some((img) => img.id === e.id)
                            ? "Collected"
                            : "Collect"
                        }`}
                        className={`${
                          loading ? "cursor-progress" : "cursor-pointer"
                        } flex items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg`}
                      >
                        {adminCollectionsImages?.some(
                          (img) => img.id === e.id
                        ) ? (
                          <GoBookmarkFill
                            color="#7A7ADD"
                            size={22}
                            className={`
                            ${
                              adminCollectionsImages?.some(
                                (img) => img.id === e.id
                              )
                                ? "heart_animated"
                                : ""
                            }
                            `}
                          />
                        ) : (
                          <GoBookmark
                            color="black"
                            className={`
                              ${
                                adminCollectionsImages?.some(
                                  (img) => img.id === e.id
                                )
                                  ? "heart_animated"
                                  : ""
                              }
                              `}
                            size={22}
                          />
                        )}

                        <p className="lg:block hidden">
                          {adminCollectionsImages?.some(
                            (img) => img.id === e.id
                          )
                            ? "Collected"
                            : "Collect"}
                        </p>
                      </DialogTrigger>

                      {adminData && (
                        <DialogContent className=" ">
                          {dialogVisible2 ? (
                            // Add to existing collection
                            <>
                              <DialogHeader className="">
                                <DialogTitle className="text-3xl mb-5 text-black font-medium text-center">
                                  Save to Collection
                                </DialogTitle>
                              </DialogHeader>

                              <button
                                onClick={() => {
                                  setDialogVisible2(false);
                                }}
                                className="mr-auto cursor-pointer flex items-center gap-1"
                              >
                                <BsBookmarkPlus size={28} />
                                <span className="text-lg">
                                  Create new collection
                                </span>
                              </button>

                              <AddToExistingCollectionComponent
                                loading={loading}
                                setLoading={setLoading}
                                imgId={e.id}
                                collectionTitle={collectionTitle}
                                id={e.id}
                                public_id={`${e.public_id}`}
                                setDialogOpen={setDialogOpen}
                                setCollectionTitle={setCollectionTitle}
                                setDialogVisible={setDialogVisible}
                                setDialogVisible2={setDialogVisible2}
                              />

                              <Link
                                href={"/my-profile/collections"}
                                className="block w-fit mx-auto mt-5"
                                style={{
                                  display:
                                    adminCollections?.length === 0 || !adminData
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
                                  <span>Your Collections</span>
                                  <GoArrowRight size={22} />
                                </button>
                              </Link>
                            </>
                          ) : (
                            // Add to new collection
                            <>
                              <DialogHeader>
                                <h3 className="text-3xl mb-8 text-black text-center font-medium">
                                  Save to Collection
                                </h3>
                                <DialogTitle className="text-gray-700 flex gap-0.5 -mb-2 ">
                                  <span>Collection title</span>
                                  <span className="">
                                    <GoStarFill
                                      size={8}
                                      className="text-red-400"
                                    />
                                  </span>
                                </DialogTitle>
                              </DialogHeader>

                              <AddToNewCollectionComponent
                                collectionTitle={collectionTitle}
                                id={e.id}
                                public_id={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`}
                                setCollectionTitle={setCollectionTitle}
                                loading={loading}
                                setLoading={setLoading}
                                setDialogOpen={setDialogOpen}
                                imgId={e.id}
                                setDialogVisible={setDialogVisible}
                                setDialogVisible2={setDialogVisible2}
                              />
                            </>
                          )}
                        </DialogContent>
                      )}
                    </Dialog>
                  </>
                ) : (
                  <div className="flex justify-between items-center z-10 w-full gap-3">
                    {/* Update image visibility */}
                    <UpdateImageVisibility2
                      loading2={loading2}
                      setLoading2={setLoading2}
                      id={e.id}
                      handleFetchImageData={handleFetchImageData}
                      isPublished={isPublished}
                      setIsPublished={setIsPublished}
                    />

                    {/* Delete image */}
                    <AdminImageDelete2
                      handleDeleteImage={handleDeleteImage}
                      loading={loading}
                      dialogOpen4={dialogOpen4}
                      setDialogOpen4={setDialogOpen4}
                    />
                  </div>
                )}
                {/* Download */}
                <DownloadButton2 e={e} />
              </div>
            </div>
          </DialogHeader>

          {/* Image details */}

          {!isLoaded2 && (
            <div className="my-2">
              <Skeleton
                className={`relative sm:h-[450px] h-[400px] w-full bg-gray-200`}
              />
            </div>
          )}

          <div id="image_container" className={`mx-auto my-2`}>
            <Image
              priority
              onLoad={() => setIsLoaded2(true)}
              src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`}
              width={e.width}
              height={e.height}
              alt={e.title}
              sizes="
    (min-width: 1280px) 55vw,  
    (min-width: 1024px) 65vw,   
    (min-width: 768px) 80vw,    
    (min-width: 640px) 90vw,    
    100vw                      
  "
              className={`w-full max-h-[450px] sm:max-h-[470px] mx-auto transition-opacity duration-300 ${
                !isLoaded2 ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>

          {isLoaded2 && (
            <>
              <div
                id="image_details_container"
                className="flex justify-between items-center"
              >
                <div
                  id="location_title_container"
                  className="flex flex-col gap-2"
                >
                  {e.title && (
                    <div className=" flex group items-center gap-1 text-gray-500 text-sm">
                      <MdClosedCaptionOff size={20} className="text-gray-500" />
                      <span className="sm:max-w-full max-w-[90%]">
                        {e.title}
                      </span>
                    </div>
                  )}
                  {e.location && (
                    <div className=" flex group items-center gap-1 text-gray-500 text-sm">
                      <GoLocation size={18} className="text-gray-500" />
                      <span className="sm:max-w-full max-w-[90%]">
                        {e.location}
                      </span>
                    </div>
                  )}
                </div>

                {/* More info */}
                <Dialog>
                  <DialogTrigger
                    onClick={() => handleFetchImageDownloads(e.id)}
                    className="flex cursor-pointer items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg"
                  >
                    <GoInfo size={22} color="black" />
                    <span className="sm:block hidden">More info</span>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1E2026] text-white border-[#1E2026] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[90%]">
                    <DialogHeader className="flex flex-row items-center justify-start gap-5">
                      <div id="image_container" className="size-28 relative">
                        <Image
                          src={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`}
                          fill
                          sizes="112px"
                          alt={e.title}
                          className="rounded-md object-cover"
                        />
                      </div>

                      <DialogTitle className="flex flex-col items-start!">
                        <p className="md:text-3xl text-2xl">Photo details</p>
                        <p className="text-sm text-gray-300 text-start!">
                          Uploaded on {formatDateWithSuffix(e.addedAt)}
                        </p>
                      </DialogTitle>
                    </DialogHeader>

                    <div
                      id="views_like_downloads_container"
                      className="flex items-center gap-10 my-5 mx-auto"
                    >
                      <div
                        id="views"
                        className="flex flex-col items-center gap-1 "
                      >
                        <p className="text-sm text-gray-300">Views</p>
                        <p className="text-3xl">{imageViews}</p>
                      </div>

                      <div
                        id="likes"
                        className="flex flex-col items-center gap-1 "
                      >
                        <p className="text-sm text-gray-300"> Likes</p>
                        <p className="text-3xl">{imageLikes}</p>
                      </div>

                      <div
                        id="downloads"
                        className="flex flex-col items-center gap-1 "
                      >
                        <p className="text-sm text-gray-300">Downloads</p>
                        <p className="text-3xl">{imageDownloads}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Comments */}
              <CommentComponent
                imageComments={imageComments}
                setImageComments={setImageComments}
                loading3={loading3}
                setLoading3={setLoading3}
                imageComment={imageComment}
                setImageComment={setImageComment}
                e={e}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {galleryPath && // /my-profile/gallery
        isFetched && // wait until image data is fetched
        isLoaded && ( // Wait until image loads
          <div
            id="update_delete_container"
            className="flex absolute top-5 px-3 items-center justify-between w-full"
          >
            {/* Update image visibility */}
            <UpdateImageVisibility
              loading2={loading2}
              setLoading2={setLoading2}
              id={e.id}
              handleFetchImageData={handleFetchImageData}
              isPublished={isPublished}
              setIsPublished={setIsPublished}
            />

            {/* Delete image */}
            <AdminImageDelete
              handleDeleteImage={handleDeleteImage}
              loading={loading}
              dialogOpen3={dialogOpen3}
              setDialogOpen3={setDialogOpen3}
            />
          </div>
        )}

      {/* Like & Collect */}
      {!galleryPath && (
        <div
          id="like_collect_container"
          className={`flex gap-1 absolute top-5 items-center group-hover:ease-in-out group-hover:transition-all group-hover:duration-300
          ${
            adminLikes?.some((el) => el.imageId === e.id) ||
            adminCollectionsImages?.some((img) => img.id === e.id)
              ? "right-3"
              : "-right-3 group-hover:right-3"
          }`}
        >
          {isLoaded && (
            <>
              {/* Like */}
              <LikeButton
                e={e}
                loading4={loading4}
                setLoading4={setLoading4}
                imageLikes={imageLikes}
                setImageLikes={setImageLikes}
              />
              {/* Collect */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger
                  onClick={() => {
                    if (!adminData) {
                      router.push("/login");
                    }
                    setDialogVisible(true);
                  }}
                  title={`${
                    adminCollectionsImages?.some((img) => img.id === e.id)
                      ? "Collected"
                      : "Collect"
                  }`}
                  className={`rounded-xl p-2
             ${
               adminCollectionsImages?.some((img) => img.id === e.id)
                 ? "bg-[#7A7ADD] sm:opacity-100 block  order-2"
                 : "bg-black/30 hover:bg-black/50 group-hover:opacity-100 sm:opacity-0 hidden sm:block transition-colors duration-300"
             } ${loading ? "cursor-progress" : "cursor-pointer"}`}
                >
                  <GoBookmark
                    className={`${
                      adminCollectionsImages?.some((img) => img.id === e.id)
                        ? "heart_animated"
                        : ""
                    } text-white md:text-[28px] text-[24px]`}
                  />
                </DialogTrigger>

                {adminData && (
                  <DialogContent className="">
                    {dialogVisible ? (
                      // Add to existing collection
                      <>
                        <DialogHeader className="">
                          <DialogTitle className="text-3xl mb-5 text-black font-medium text-center">
                            Save to Collection
                          </DialogTitle>
                        </DialogHeader>

                        <button
                          onClick={() => {
                            setDialogVisible(false);
                          }}
                          className="mr-auto cursor-pointer flex items-center gap-1"
                        >
                          <BsBookmarkPlus size={28} />
                          <span className="text-lg">Create new collection</span>
                        </button>

                        <AddToExistingCollectionComponent
                          loading={loading}
                          setLoading={setLoading}
                          imgId={e.id}
                          collectionTitle={collectionTitle}
                          id={e.id}
                          public_id={`${e.public_id}`}
                          setDialogOpen={setDialogOpen}
                          setCollectionTitle={setCollectionTitle}
                          setDialogVisible={setDialogVisible}
                          setDialogVisible2={setDialogVisible2}
                        />

                        <Link
                          href={"/my-profile/collections"}
                          className="block w-fit mx-auto mt-5"
                          style={{
                            display:
                              adminCollections?.length === 0 || !adminData
                                ? "none"
                                : "block",
                          }}
                        >
                          <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300  sm:text-lg">
                            <span>Your Collections</span>
                            <GoArrowRight size={22} />
                          </button>
                        </Link>
                      </>
                    ) : (
                      // Add to new collection
                      <>
                        <DialogHeader>
                          <h3 className="text-3xl mb-8 text-black text-center font-medium">
                            Save to Collection
                          </h3>
                          <DialogTitle className="text-gray-700 flex gap-0.5 -mb-2 ">
                            <span>Collection title</span>
                            <span className="">
                              <GoStarFill size={8} className="text-red-400" />
                            </span>
                          </DialogTitle>
                        </DialogHeader>

                        <AddToNewCollectionComponent
                          collectionTitle={collectionTitle}
                          id={e.id}
                          public_id={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`}
                          setCollectionTitle={setCollectionTitle}
                          loading={loading}
                          setLoading={setLoading}
                          setDialogOpen={setDialogOpen}
                          imgId={e.id}
                          setDialogVisible={setDialogVisible}
                          setDialogVisible2={setDialogVisible2}
                        />
                      </>
                    )}
                  </DialogContent>
                )}
              </Dialog>
            </>
          )}
        </div>
      )}

      <AvatarNameDownload e={e} galleryPath={galleryPath} />
    </div>
  );
}
