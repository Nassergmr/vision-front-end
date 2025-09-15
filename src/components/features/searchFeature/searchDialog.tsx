import { useStore } from "@/store/zustand";
import Link from "next/link";
import { ImageData } from "../../../../types/types";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  suggestions: ImageData[];
  openDialog: boolean;
  isLoaded: boolean;
  loading: boolean;
  setOpenDialog: (data: boolean) => void;
}
export default function SearchDialog({
  openDialog,
  loading,
  suggestions,
  isLoaded,
  setOpenDialog,
}: Props) {
  const { emptySearchResults } = useStore();

  return (
    <div
      className=" absolute py-5 rounded-xl bg-white min-h-60 max-h-[80] overflow-y-auto mt-4 border border-gray-100 shadow-sm w-[calc(100%-30px)] sm:w-[calc(100%-60px)]"
      style={{ display: openDialog ? "block" : "none" }}
    >
      <div className="flex flex-col gap-1.5">
        {!isLoaded && (
          <div className="flex flex-col gap-3">
            <Skeleton className="bg-gray-200 py-3.5 rounded-none   px-5" />
            <Skeleton className="bg-gray-200 py-3.5 rounded-none   px-5" />
            <Skeleton className="bg-gray-200 py-3.5 rounded-none   px-5" />
            <Skeleton className="bg-gray-200 py-3.5 rounded-none   px-5" />
            <Skeleton className="bg-gray-200 py-3.5 rounded-none   px-5" />
          </div>
        )}
        {suggestions?.map((e) => (
          <Link
            onClick={() => {
              setOpenDialog(false);
            }}
            key={e.id}
            href={`/search/${e.title}`}
            className={`hover:bg-gray-100 py-1.5 sm:px-5 px-3 ${
              loading ? " cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <button disabled={loading}>
              <p
                className={`cursor-pointer ${
                  loading ? "text-gray-400" : "text-black"
                }`}
              >
                {e.title}
              </p>
            </button>
          </Link>
        ))}
        {emptySearchResults && (
          <p
            className={`px-5 py-1.5 ${
              loading ? "text-gray-400" : "text-black"
            }`}
          >
            No results found
          </p>
        )}
      </div>
    </div>
  );
}
