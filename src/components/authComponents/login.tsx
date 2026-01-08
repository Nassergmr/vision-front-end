"use client";

import { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authServices";
import { AxiosError } from "axios";
import Slider from "react-slick";

type RefProps = {
  sliderRef: RefObject<Slider | null>;
};

export default function Login({ sliderRef }: RefProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    } else setIsLoggedIn(false);
  }, [router]);

  const handleLoginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res);
      setErrorMessage("");
      setSuccessMessage("Logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      {!isLoggedIn && (
        <div className="sm:mx-auto w-full">
          <div className="mx-auto flex items-center flex-col gap-2 mb-5">
            <h1 className="font-medium text-2xl">Log In to Vision</h1>
            <p className="text-center text-[#7F7F7F] font-medium">
              Free photos shared by a growing community of creators to inspire
              your ideas.
            </p>
          </div>

          <form onSubmit={handleLoginUser} method="POST" className="space-y-3">
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

            <div className="mt-6">
              <button
                type="button"
                onClick={() => sliderRef.current?.slickNext()}
                className="font-medium ml-2 text-gray-900 cursor-pointer"
              >
                <span className="border-b-2 border-dotted border-gray-300 font-medium text-gray-400 hover:text-[#7F7F7F] transition duration-300">
                  Forgot your password?
                </span>
              </button>
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
                <span className="">{loading ? "Loading" : "Log in"}</span>
              </button>
            </div>
          </form>

          {successMessage.trim() !== "" && (
            <p className="text-[#37C57D] text-center mt-5">{successMessage}</p>
          )}
          {errorMessage.trim() !== "" && (
            <p className="text-[#cc1a5f] text-center mt-5">{errorMessage}</p>
          )}

          <p className="mt-5 text-center text-gray-500 font-medium">
            Not a member?{"  "}
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="font-medium ml-2 text-gray-900 cursor-pointer"
            >
              <span className="border-b-2 border-dotted border-gray-300">
                Register
              </span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
