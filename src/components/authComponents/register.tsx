"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authServices";
import { AxiosError } from "axios";

const Register: React.FC = () => {
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 my-[4rem] lg:px-8">
      {!isSignedIn && (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link className={`w-fit`} id="logo_container" href={"/"}>
              <Image
                src={"/logo_black.png"}
                width={0}
                height={0}
                className="h-[80px] sm:w-auto w-[80px] mx-auto mb-8"
                alt="avatar"
              />
            </Link>
            <h2 className="mt-5 text-neutral-700 text-center text-2xl sm:text-3xl font-semibold ">
              Create an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleRegisterUser}
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="first-name"
                    name="text"
                    type="text"
                    required
                    autoComplete="text"
                    className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="text"
                    className="border border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
              </div>

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
                  <span className="">{loading ? "Loading" : "Register"}</span>
                </button>
              </div>
            </form>

            {message.trim() !== "" && (
              <p className="text-center text-[#cc1a5f] mt-2">{message}</p>
            )}

            {verifyEmail && (
              <p className="text-center text-[#37C57D] mt-2">
                Please Verify your email adress
              </p>
            )}

            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Already have an account?{"  "}
              <Link
                href="/login"
                className="text-sm/6 font-medium text-gray-900"
              >
                Log in
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
