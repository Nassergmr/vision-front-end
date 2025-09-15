"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangePassword } from "@/services/authServices";
import { useStore } from "@/store/zustand";

export default function AdminChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { adminData } = useStore();

  const handleCreatePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!adminData) {
      return;
    }

    try {
      await ChangePassword(adminData?.email, currentPassword, newPassword);
      setSuccessMessage("Your password has been changed successfully!");
      setErrorMessage("");
      setTimeout(() => {
        router.push("/edit-profile");
      }, 1500);
    } catch {
      setErrorMessage("Your current password is incorrect");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 sm:mb-[3rem]  mb-[4rem] sm:mt-[8rem] mt-[7rem]  lg:px-8">
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-neutral-700 text-center text-2xl sm:text-3xl font-semibold ">
            Change your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleCreatePassword}
            method="POST"
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Current password
                </label>
                <Link href={"/reset-password/email"}>
                  <p className="text-sm text-gray-500">Forgot password?</p>
                </Link>
              </div>
              <div className="mt-1">
                <input
                  id="current-password"
                  name="current-password"
                  type="current-password"
                  required
                  autoComplete="current-password"
                  className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                New password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="newPassword"
                  required
                  autoComplete="newPassword"
                  className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className={`${
                  loading ||
                  currentPassword.trim() === "" ||
                  newPassword.trim() === ""
                    ? "bg-[#AFEBCE] cursor-not-allowed  pointer-events-none"
                    : " bg-[#00CC83] cursor-pointer"
                } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-500   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
              >
                <span className="">
                  {loading ? "Loading" : "Change password"}
                </span>
              </button>
            </div>
          </form>

          {successMessage.trim() !== "" && (
            <p className="text-[#37C57D] text-center mt-2">{successMessage}</p>
          )}
          {errorMessage.trim() !== "" && (
            <p className="text-[#cc1a5f] text-center mt-2">{errorMessage}</p>
          )}
        </div>
      </>
    </div>
  );
}
