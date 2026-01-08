"use client";

import { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authServices";
import { AxiosError } from "axios";
import Slider from "react-slick";

type RefProps = {
  sliderRef: RefObject<Slider | null>;
};
export default function Register({ sliderRef }: RefProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    } else setIsSignedIn(false);
  }, [router]);

  // Redirect to admin profile when the verification is done
  useEffect(() => {
    const redirectHandler = (e: StorageEvent) => {
      if (e.key === "verified" && e.newValue === "true") {
        window.location.href = "/my-profile";
      }
    };
    window.addEventListener("storage", redirectHandler);
    return () => window.removeEventListener("storage", redirectHandler);
  }, []);

  const handleRegisterUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(firstName, lastName, email, password);
      setMessage("");
      setVerifyEmail(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setVerifyEmail(false);
        setMessage(error.response?.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      {!isSignedIn && (
        <div className="sm:mx-auto w-full">
          <div className="mx-auto flex items-center flex-col gap-2 mb-5">
            <h1 className="font-medium text-2xl text-center">
              Sign Up to Vision
            </h1>
            <p className="text-center text-[#7F7F7F] font-medium">
              Free photos shared by a growing community of creators to inspire
              your ideas.
            </p>
          </div>

          <form
            onSubmit={handleRegisterUser}
            method="POST"
            className="space-y-3"
          >
            <div>
              <div className="mt-1">
                <input
                  id="first-name"
                  name="text"
                  type="text"
                  placeholder="First Name"
                  required
                  autoComplete="text"
                  className="border border-gray-200 placeholder:text-sm px-4 py-3 rounded-md outline-none w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  placeholder="Last Name"
                  required
                  autoComplete="text"
                  className="border border-gray-200 placeholder:text-sm px-4 py-3 rounded-md outline-none w-full"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="border border-gray-200 placeholder:text-sm px-4 py-3 rounded-md outline-none w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between"></div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="border placeholder:text-sm border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
                } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-300   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
              >
                <span className="">
                  {loading ? "Loading" : "Create an account"}
                </span>
              </button>
            </div>
          </form>

          {message.trim() !== "" && (
            <p className="text-center text-[#cc1a5f] mt-5">{message}</p>
          )}

          {verifyEmail && (
            <p className="text-center text-[#37C57D] mt-5">
              An email with a verification link has been sent to your address.
              (It may take a few minutes to arrive.)
            </p>
          )}

          <p className="mt-5 text-center text-base font-medium text-gray-500">
            Already have an account?{"  "}
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="text-base ml-2 font-medium text-gray-900 cursor-pointer"
            >
              <span className="border-b-2 border-dotted border-gray-300">
                Log In
              </span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
