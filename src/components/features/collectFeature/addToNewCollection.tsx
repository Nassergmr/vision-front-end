import {
  addToNewCollection,
  fetchAdminCollections,
} from "@/services/userServices";
import { AddToCollectionProps } from "../../../../types/types";
import { useStore } from "@/store/zustand";

export default function AddToNewCollectionComponent({
  collectionTitle,
  id,
  public_id,
  setCollectionTitle,
  loading,
  setLoading,
  setDialogVisible,
  setDialogVisible2,
}: AddToCollectionProps) {
  const { adminData, updateAdminCollections, updateAdminCollectionsImages } =
    useStore();

  const handleAddToNewCollection = async (
    collectionTitle: string,
    adminId: string,
    id: string,
    public_id: string
  ) => {
    setLoading(true);
    try {
      await addToNewCollection(collectionTitle, adminId, id, public_id);
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
      setDialogVisible(true);
      setDialogVisible2(true);
    }
  };

  return (
    <>
      <input
        type="text"
        className="border border-gray-200 px-4 py-3 rounded-md outline-none"
        onChange={(e) => setCollectionTitle(e.target.value)}
      />
      <div className="flex items-center gap-2 mt-5 justify-center">
        <button
          onClick={() => {
            setCollectionTitle("");
            setDialogVisible(true);
            setDialogVisible2(true);
          }}
          className="cursor-pointer flex items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-500 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg"
        >
          Back
        </button>

        <button
          disabled={collectionTitle.trim().length === 0 || loading}
          onClick={() => {
            handleAddToNewCollection(
              collectionTitle,
              adminData?.id ?? "",
              id,
              public_id
            );
          }}
          className={`text-center gap-2 border-1 transition-all duration-500  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white ${
            loading
              ? "cursor-not-allowed  text-white bg-[#AFEBCE] hover:bg-[#AFEBCE]"
              : collectionTitle.trim().length === 0
              ? "bg-[#AFEBCE] cursor-not-allowed hover:bg-[#AFEBCE]"
              : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369]"
          } `}
        >
          {loading ? "Loading" : "Create new collection"}
        </button>
      </div>
    </>
  );
}
