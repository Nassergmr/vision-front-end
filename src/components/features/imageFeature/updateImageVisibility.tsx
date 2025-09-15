import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

export default function UpdateImageVisibility({
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
    // isFetched && (
    <>
      {/* Medium & large screens */}
      <div
        title={`${isPublished ? "Draft photo" : "Publish photo"}`}
        onClick={() => handleUpdateImageVisibility(id)}
        className="sm:flex hidden gap-2 items-center  px-4 py-3 rounded-full bg-gray-600  cursor-pointer"
      >
        <Switch
          id="publish-mode"
          checked={isPublished}
          className="cursor-pointer"
        />
        <Label className="text-white font-semibold  cursor-pointer">
          {isPublished ? "Published" : "Draft"}
        </Label>
      </div>

      {/* Small screens */}
      <div
        onClick={() => handleUpdateImageVisibility(id)}
        className={`text-sm block sm:hidden px-2.5 py-1 w-fit rounded-full transition-all duration-500 ${
          isPublished && !loading2
            ? "text-white bg-gray-600"
            : "text-black bg-gray-100"
        }`}
      >
        <p>{isPublished ? "Published" : "Draft"}</p>
      </div>
    </>
  );
}
