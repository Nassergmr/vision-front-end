"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAdminAvatar, fetchAdminData } from "@/services/userServices";
import AdminAvatarEdit from "./adminAvatarEdit";
import AdminInfoForm from "@/components/adminComponents/adminInfoForm";
import { useStore } from "@/store/zustand";

export default function AdminprofileEdit() {
  const { updateAdminData, updateAdminAvatar } = useStore();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  const handleFetchAdminData = async () => {
    try {
      const res = await fetchAdminData();
      updateAdminData(res);
    } catch (error) {
      alert(error);
    }
  };

  const handleFetchAdminAvatar = async () => {
    try {
      const res = await fetchAdminAvatar();
      updateAdminAvatar(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem] container-custom lg:w-[60%] md:w-[70%] w-full mx-auto">
      <h1 className="text-center sm:text-4xl text-3xl mb-[2rem]">
        Profile Settings
      </h1>
      <AdminAvatarEdit handleFetchAdminAvatar={handleFetchAdminAvatar} />
      <AdminInfoForm handleFetchAdminData={handleFetchAdminData} />
    </div>
  );
}
