"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UpdatePassword } from "@/services/authServices";
import Link from "next/link";

export default function CreateNewPassword() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
  }, [token, router]);

  const handleCreatePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UpdatePassword(password, token);
      setSuccessMessage(
        "Your password has been updated successfully! Redirecting you to the login page..."
      );
      setErrorMessage("");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 my-[4rem] lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Link className={`w-fit`} id="logo_container" href={"/"}>
          <Image
            src={"/logo_black"}
            width={0}
            height={0}
            sizes="100vw"
            className="h-[80px] sm:w-auto w-[80px] mx-auto mb-8"
            alt="avatar"
            unoptimized
          />
        </Link>
        <h2 className="mt-5 text-neutral-700 text-center text-2xl sm:text-3xl font-semibold ">
          Create a new password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleCreatePassword}
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading
                  ? "bg-[#AFEBCE] cursor-not-allowed  pointer-events-none"
                  : " bg-[#00CC83] cursor-pointer"
              } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-500   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
            >
              <span className="">
                {loading ? "Loading" : "Update password"}
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
    </div>
  );
}
