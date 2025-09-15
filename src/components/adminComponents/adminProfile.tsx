"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLinks from "./adminLinks";
import AdminNameAvatar from "./adminNameAvatar";
import { useStore } from "@/store/zustand";

export default function AdminProfile() {
  const router = useRouter();
  const { adminData } = useStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    adminData && (
      <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
        <AdminNameAvatar />
        <AdminLinks />
      </div>
    )
  );
}
