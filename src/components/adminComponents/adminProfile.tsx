"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLinks from "./adminLinks";
import AdminNameAvatar from "./adminNameAvatar";

export default function AdminProfile() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return;
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container-custom sm:mt-[8rem] sm:mb-[4rem] mb-[3rem] mt-[7rem]">
      <AdminNameAvatar />
      <AdminLinks />
    </div>
  );
}
