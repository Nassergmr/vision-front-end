import { GoTrash } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
  dialogOpen3: boolean;
  handleDeleteImage: () => void;
  setDialogOpen3: (value: boolean) => void;
}

export default function AdminImageDelete({
  handleDeleteImage,
  loading,
  dialogOpen3,
  setDialogOpen3,
}: Props) {
  return (
    <Dialog open={dialogOpen3} onOpenChange={setDialogOpen3}>
      <DialogTrigger
        onClick={() => setDialogOpen3(true)}
        className=" bg-gray-600 sm:flex hidden p-3 rounded-full cursor-pointer w-fit!"
      >
        <GoTrash className="text-white " size={22} />
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
            className="transition-all border-1 duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  bg-[#FF2077] hover:bg-[#cc1a5f]"
          >
            <span> Delete photo</span>
          </Button>

          <button
            onClick={() => setDialogOpen3(false)}
            className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
