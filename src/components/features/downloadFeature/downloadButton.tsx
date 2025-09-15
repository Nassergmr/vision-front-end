import { VscCloudDownload } from "react-icons/vsc";
import { AvatarNameDownloadProps } from "../../../../types/types";
import { updateImageDownloads } from "@/services/imageServices";
import { useStore } from "@/store/zustand";
import { fetchAdminDownloadedImages } from "@/services/userServices";

export default function DownloadButton({ e }: AvatarNameDownloadProps) {
  const { adminData, updateAdminDownloadedImages } = useStore();

  const handleUpdateImageDownloads = async () => {
    try {
      await updateImageDownloads(e.id, adminData?.id);
    } catch (error) {
      alert(error);
    } finally {
      const res = await fetchAdminDownloadedImages();
      updateAdminDownloadedImages(res);
    }
  };

  return (
    <div id="download" onClick={handleUpdateImageDownloads}>
      <a
        href={`https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${e.public_id}`.replace(
          "/upload/",
          `/upload/fl_attachment:vision${adminData?.firstName ? "-" : ""}${
            adminData?.firstName ? adminData?.firstName : ""
          }-photo-download-`
        )}
      >
        <button className="flex items-center gap-2 bg-[#00CC83] hover:bg-[#00a369] transition-all duration-500  py-2.5 px-5 md:text-lg text-base rounded-lg cursor-pointer">
          <VscCloudDownload size={22} color="white" />{" "}
          <span className="text-white xs block">Download</span>
        </button>
      </a>
    </div>
  );
}
