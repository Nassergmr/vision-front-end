import Image from "next/image";
import Link from "next/link";
import {
  getImageComments,
  updateImageComments,
} from "@/services/imageServices";
import { GoComment } from "react-icons/go";
import { CommentComponentProps } from "../../../../types/types";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/store/zustand";

export default function CommentComponent({
  imageComments,
  setImageComments,
  loading3,
  setLoading3,
  imageComment,
  setImageComment,
  e,
}: CommentComponentProps) {
  const { adminData } = useStore();

  const handleFetchImageComments = async (id: string) => {
    try {
      const res = await getImageComments(id);
      setImageComments(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateImageComments = async (
    imageComment: string,
    imageId: string,
    imageUrl: string,
    userId: string
  ) => {
    setLoading3(true);
    try {
      await updateImageComments(imageComment, imageId, imageUrl, userId);
      handleFetchImageComments(e.id);
    } catch (error) {
      alert(error);
    } finally {
      setImageComment("");
      setLoading3(false);
    }
  };

  return (
    <div className="mt-5 bg-[#1E2026]  text-white px-4 md:px-6  -mb-[24px] rounded-none md:rounded-t-4xl md:-mx-[24px] -mx-[16px]">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-white py-4 mb-4 border-b border-gray-500 ">
          Comments
        </h2>
        {imageComments?.length === 0 ? (
          <p className="text-gray-500 text-base italic py-2">
            No comments yet.
          </p>
        ) : (
          <div id="comments_container">
            {imageComments?.map((el) => (
              <div key={el.id} className="py-2">
                <Link
                  href={`/profile/${el.user?.slug}`}
                  className="flex items-center gap-3 w-fit"
                >
                  <div id="avatar_container" className="relative size-10">
                    <Image
                      src={
                        el.user?.avatar
                          ? `${`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${el.user.avatar}`}`
                          : "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png"
                      }
                      fill
                      alt="avatar"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-white">
                    {el.user?.firstName} {el.user?.lastName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {formatDistanceToNow(new Date(el.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </Link>

                <p className="text-sm text-gray-400 md:pl-15 pl-13">
                  {el.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      <form
        className={`flex-col gap-4 my-4 ${adminData ? "flex" : "hidden"}`}
        onSubmit={(el) => {
          el.preventDefault();
          handleUpdateImageComments(
            imageComment,
            e.id,
            `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`,
            adminData?.id ?? ""
          );
        }}
      >
        <textarea
          className={` border-gray-500 placeholder:text-gray-500 h-35 border rounded-md p-4 outline-none`}
          name=""
          id=""
          placeholder="Write a comment..."
          value={imageComment}
          onChange={(e) => setImageComment(e.target.value)}
        />

        {/* Submit Comment Button */}
        <button
          disabled={imageComment.trim().length === 0 || loading3}
          className={`flex items-center gap-2 transition-all duration-300  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  w-fit
                        ${
                          loading3
                            ? "cursor-not-allowed bg-[#AFEBCE] hover:bg-[#AFEBCE]"
                            : imageComment.trim().length === 0
                            ? "bg-[#AFEBCE] cursor-not-allowed hover:bg-[#AFEBCE]"
                            : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369]"
                        }
                      `}
        >
          <GoComment size={22} className="text-white" />
          <span className="text-white">{loading3 ? "Loading" : "Submit"}</span>
        </button>
      </form>
    </div>
  );
}
