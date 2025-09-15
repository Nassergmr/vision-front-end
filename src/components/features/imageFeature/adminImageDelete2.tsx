import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoTrash } from "react-icons/go";

interface Props {
  loading: boolean;
  dialogOpen4: boolean;
  handleDeleteImage: () => void;
  setDialogOpen4: (value: boolean) => void;
}

export default function AdminImageDelete2({
  handleDeleteImage,
  loading,
  dialogOpen4,
  setDialogOpen4,
}: Props) {
  return (
    <Dialog open={dialogOpen4} onOpenChange={setDialogOpen4}>
      <DialogTrigger
        onClick={() => setDialogOpen4(true)}
        className=" flex cursor-pointer items-center gap-2 border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-500 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
      >
        <span className="hidden sm:block">Delete</span>

        <GoTrash className="text-black sm:hidden block" size={22} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-3 text-2xl pt-5 font-medium">
            Are you sure you want to delete this photo?
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 mx-auto">
          <Button
            disabled={loading}
            onClick={() => {
              handleDeleteImage();
            }}
            variant={"default"}
            className="transition-all border-1 duration-500 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  bg-[#FF2077] hover:bg-[#cc1a5f]"
          >
            <span> Delete photo</span>
          </Button>

          <button
            onClick={() => setDialogOpen4(false)}
            className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-500 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
