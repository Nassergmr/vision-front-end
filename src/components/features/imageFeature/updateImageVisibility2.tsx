import { getImages, updateImageVisibility } from "@/services/imageServices";
import { useStore } from "@/store/zustand";

interface Props {
  id: string;
  isPublished: boolean;
  loading2: boolean;
  setLoading2: (value: boolean) => void;
  handleFetchImageData: () => Promise<void>;
  setIsPublished: (value: boolean) => void;
}

export default function UpdateImageVisibility2({
  id,
  isPublished,
  loading2,
  setLoading2,
  handleFetchImageData,
}: Props) {
  const { updateImages } = useStore();

  // draft --> published || published --> draft
  const handleUpdateImageVisibility = async (id: string) => {
    setLoading2(true);
    try {
      await updateImageVisibility(id);
      await handleFetchImageData();
      const res = await getImages();
      updateImages(res);
    } catch (error) {
      alert(error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div
      title={`${isPublished ? "Draft photo" : "Publish photo"}`}
      onClick={() => handleUpdateImageVisibility(id)}
      className={`border-1 transition duration-300  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg   flex cursor-pointer items-center gap-2
        ${
          isPublished && !loading2
            ? "bg-gray-600 text-white border-gray-600"
            : "border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100"
        }`}
    >
      <span>{isPublished ? "Published" : "Publish"}</span>
    </div>
  );
}
