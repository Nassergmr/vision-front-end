import { useState } from "react";
import { sendUserMessage } from "@/services/userServices";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { GoStarFill } from "react-icons/go";
import { AdminData } from "../../../types/types";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useStore } from "@/store/zustand";

interface Props {
  userData?: AdminData;
}

export default function SendMessage({ userData }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const { adminData } = useStore();

  const notify = () => toast.success(`Message sent successfully!`);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      await sendUserMessage(
        adminData?.email ? adminData.email : "",
        userData?.email ? userData.email : "",
        message
      );
    } catch (error) {
      alert(error);
    } finally {
      setOpenDialog(false);
      notify();
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        onClick={() => {
          if (!adminData?.email) {
            router.push("/login");
          }
        }}
        disabled={adminData?.email === userData?.email}
        style={{ display: userData?.messageButtonAllowed ? "block" : "none" }}
        title={`${
          adminData?.email === userData?.email
            ? "You cannot message yourself"
            : `Message ${userData?.firstName}`
        }`}
        className={`${
          adminData?.email === userData?.email
            ? "cursor-not-allowed sm:text-black text-gray-400  sm:pointer-events-auto pointer-events-none"
            : "cursor-pointer"
        }  border-1  border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-500 py-2.5 lg:px-5 px-3.5 sm:text-lg rounded-lg`}
      >
        Message
      </DialogTrigger>
      <DialogContent className="min-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-5 ">
              <div id="img_container" className="relative size-22 mx-auto">
                <Image
                  src={
                    userData?.avatar
                      ? `https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/${userData.avatar}`
                      : "/avatar.png"
                  }
                  fill
                  alt="avatar"
                  unoptimized
                  className="rounded-full object-cover"
                />
              </div>

              <h3 className="mx-auto text-2xl font-medium">
                Send message to {userData?.firstName}
              </h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <h3 className="text-gray-700 text-md flex gap-0.5 -mb-3">
            <span>Message</span>
            <span>
              <GoStarFill size={8} className="text-red-400 -mb-2" />
            </span>
          </h3>
          <textarea
            className="min-h-[150px]  border border-gray-300 px-4 py-2 rounded-md outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center gap-3 ">
            <Checkbox
              checked={checked}
              onClick={() => setChecked((prev) => !prev)}
            />
            <h3 className="text-gray-700 sm:text-base text-sm">
              I understand that my email will be visible to the recipent.
            </h3>
          </div>
          <button
            disabled={loading || !checked || message.trim() === ""}
            onClick={handleSendMessage}
            className={`ml-auto text-center gap-2 border-1 transition-all duration-500 mt-5  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  w-fit text-white ${
              loading || !checked || message.trim() === ""
                ? "cursor-not-allowed  text-white bg-[#AFEBCE] hover:bg-[#AFEBCE]"
                : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369]"
            } `}
          >
            Send
          </button>
        </div>
      </DialogContent>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </Dialog>
  );
}
