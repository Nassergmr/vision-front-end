import { useEffect, useState } from "react";
import Link from "next/link";
import { profileEdit } from "@/services/userServices";
import { GoStarFill } from "react-icons/go";
import { Checkbox } from "@/components/ui/checkbox";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useStore } from "@/store/zustand";

interface AdminFormProps {
  handleFetchAdminData: () => Promise<void>;
}

export default function AdminInfoForm({
  handleFetchAdminData,
}: AdminFormProps) {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminPassword] = useState("");
  const [adminBio, setAdminBio] = useState("");
  const [adminLocation, setAdminLocation] = useState("");
  const [adminWebsite, setAdminWebsite] = useState("");
  const [adminFacebook, setAdminFacebook] = useState("");
  const [adminInstagram, setAdminInstagram] = useState("");
  const [adminYoutube, setAdminYoutube] = useState("");
  const [adminTiktok, setAdminTiktok] = useState("");

  const [messageButtonAllowed, setmessageButtonAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { adminData } = useStore();

  const inputs = [
    {
      title: "First name",
      required: true,
      type: "text",
      value: adminFirstName,
      placeholder: "Enter your first name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminFirstName(e.target.value),
    },
    {
      title: "Last name",
      required: true,
      type: "text",
      value: adminLastName,
      placeholder: "Enter your last name",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminLastName(e.target.value),
    },
    {
      title: "Location",
      required: false,
      type: "text",
      value: adminLocation,
      placeholder: "Your location",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminLocation(e.target.value),
    },
    {
      title: "Website",
      required: false,
      type: "text",
      value: adminWebsite,
      placeholder: "https://yourwebsite.com",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminWebsite(e.target.value),
    },
    {
      title: "Facebook",
      required: false,
      type: "text",
      value: adminFacebook,
      placeholder: "Your Facebook username",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminFacebook(e.target.value),
    },
    {
      title: "Instagram",
      required: false,
      type: "text",
      value: adminInstagram,
      placeholder: "Your Instagram username",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminInstagram(e.target.value),
    },
    {
      title: "YouTube",
      required: false,
      type: "text",
      value: adminYoutube,
      placeholder: "Your YouTube channel link",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminYoutube(e.target.value),
    },
    {
      title: "TikTok",
      required: false,
      type: "text",
      value: adminTiktok,
      placeholder: "Your TikTok username",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminTiktok(e.target.value || ""),
    },
  ];

  // Set initially the values of the inputs with the admin data
  useEffect(() => {
    if (adminData) {
      setAdminFirstName(adminData.firstName || "");
      setAdminLastName(adminData.lastName || "");
      setAdminBio(adminData.bio || "");
      setAdminLocation(adminData.location || "");
      setAdminWebsite(adminData.website || "");
      setAdminFacebook(adminData.facebook || "");
      setAdminInstagram(adminData.instagram || "");
      setAdminYoutube(adminData.youtube || "");
      setAdminTiktok(adminData.tiktok || "");
      setmessageButtonAllowed(adminData.messageButtonAllowed);
    }
  }, [adminData]);

  const notify = () =>
    toast.success(
      <div className="flex flex-col gap-5 py-5 items-center justify-center">
        <h3 className=" text-lg text-center">
          Your profile has been updated successfully.
        </h3>
        <Link
          href={`/profile/${adminData?.slug}`}
          className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  cursor-pointer  shadow-xs w-fit mx-auto transition-all duration-500"
        >
          <span>View My Profile</span>
        </Link>
      </div>
    );

  const handleprofileEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      await profileEdit(
        adminData?.id ?? "",
        adminFirstName,
        adminLastName,
        adminPassword,
        adminBio,
        adminLocation,
        adminWebsite,
        adminFacebook,
        adminInstagram,
        adminYoutube,
        adminTiktok,
        messageButtonAllowed
      );
      await handleFetchAdminData();
      setLoading(false);
      notify();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleprofileEdit}
      className="flex flex-col gap-6 my-[2rem]"
    >
      <div
        id="inputs_container"
        className="flex flex-col sm:grid grid-cols-2 justify-between gap-x-8 gap-y-5 sm:gap-y-10"
      >
        {inputs.map((input, i) => (
          <div key={i} id="input_container" className="flex flex-col gap-2 ">
            <h3 className="text-gray-700 text-sm flex  gap-0.5">
              <span>{input.title}</span>
              {input.required && (
                <span className="">
                  <GoStarFill size={8} className="text-red-400" />
                </span>
              )}
            </h3>
            <input
              required={input.required}
              className="border border-gray-300 px-3 py-3 rounded-md outline-none"
              type={input.type}
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <div
          id="textarea_container"
          className="flex flex-col gap-2  col-span-2"
        >
          <h3 className="text-gray-700 text-sm flex gap-1">Short bio</h3>
          <textarea
            className="border border-gray-300 px-3 py-3 rounded-md w-full min-h-40 sm:min-h-48 outline-none"
            value={adminBio}
            onChange={(e) => setAdminBio(e.target.value)}
          />
        </div>

        {/* { 
      title: "Password",
      required: true,
      type: "text",
      value: adminPassword,
      placeholder: "Enter your password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setAdminPassword(e.target.value),
    }, */}

        <Link className="w-fit" href={"/change-password"}>
          <button className=" cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-all duration-500 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg">
            Change password
          </button>
        </Link>

        <div
          id="message_button_edit"
          className="flex  items-center gap-3 col-span-2"
        >
          <Checkbox
            checked={adminData !== null && messageButtonAllowed}
            onClick={() => setmessageButtonAllowed((prev) => !prev)}
          />
          <h3 className="text-gray-700 w-full flex gap-2 items-center">
            <span> Display &ldquo;Message&ldquo; button on my profile</span>
            <span className="text-sm text-gray-500 sm:block hidden">
              (Allow people to message you through Gmail)
            </span>
          </h3>
        </div>
        <span className="text-sm text-gray-500 sm:hidden block -my-4">
          (Allow people to message you through Gmail)
        </span>
      </div>

      <button
        type="submit"
        className={`text-center gap-2 border-1 transition-all duration-500 mt-5  py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  w-fit text-white ${
          loading
            ? "cursor-not-allowed  text-white bg-[#AFEBCE] hover:bg-[#AFEBCE]"
            : "bg-[#00CC83] cursor-pointer hover:bg-[#00a369]"
        } `}
      >
        {loading ? "Loading" : "Save profile"}
      </button>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        transition={Bounce}
        icon={false}
      />
    </form>
  );
}
