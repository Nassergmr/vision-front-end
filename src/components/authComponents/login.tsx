"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/authServices";
import { AxiosError } from "axios";

const Login: React.FC = () => {
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
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      }
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 my-[4rem] lg:px-8">
      {!isLoggedIn && (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link className={`w-fit`} id="logo_container" href={"/"}>
              <Image
                src={"/logo_black.png"}
                width={80}
                height={80}
                sizes="100vw"
                className="object-cover mx-auto mb-8"
                alt="avatar"
              />
            </Link>
            <h2 className="mt-5 text-neutral-700 text-center text-2xl sm:text-3xl font-semibold ">
              Welcom back
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleLoginUser}
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <Link href={"/reset-password/email"}>
                    <p className="text-sm text-gray-500"> Forgot password?</p>
                  </Link>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
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
                  } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-500   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
                >
                  <span className="">{loading ? "Loading" : "Sign in"}</span>
                </button>
              </div>
            </form>

            {successMessage.trim() !== "" && (
              <p className="text-[#37C57D] text-center mt-2">
                {successMessage}
              </p>
            )}
            {errorMessage.trim() !== "" && (
              <p className="text-[#cc1a5f] text-center mt-2">{errorMessage}</p>
            )}

            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Not a member?{"  "}
              <Link
                href="/register"
                className="text-sm/6 font-medium text-gray-900"
              >
                Register
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
