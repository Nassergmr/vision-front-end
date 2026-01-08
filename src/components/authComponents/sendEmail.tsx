"use client";

import { RefObject, useState } from "react";
import { resetPassword } from "@/services/authServices";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

type RefProps = {
  sliderRef: RefObject<Slider | null>;
};

export default function EnterEmail({ sliderRef }: RefProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSendEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccessMessage(
        `An email with a verification link has been sent to your address.  
        (It may take a few minutes to arrive.)`
      );
      setErrorMessage("");
      setTimeout(() => {
        router.push("/login");
      }, 20000);
    } catch {
      setErrorMessage("Invalid email");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="mx-auto flex items-center flex-col gap-2 mb-5">
          <h1 className="font-medium text-2xl text-center">
            Let’s Get You Back In
          </h1>
          <p className="text-center text-[#7F7F7F] font-medium">
            Free photos shared by a growing community of creators to inspire
            your ideas.
          </p>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSendEmail} method="POST" className="space-y-3">
          <div>
            <div className="mt-1">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900  mb-1"
              >
                Enter your email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                className="border placeholder:text-sm border-gray-200 px-4 py-3 rounded-md outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              disabled={loading}
              className="cursor-pointer border-1 border-[#EDEDED] hover:border-gray-500 hover:bg-gray-100 transition-all duration-300 py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg "
            >
              Back
            </button>
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading
                  ? "bg-[#AFEBCE] cursor-not-allowed  pointer-events-none"
                  : " bg-[#00CC83] cursor-pointer"
              } flex w-full hover:bg-[#00a369] justify-center  gap-2 border-1 transition-all duration-300   py-2.5 lg:px-5 px-3.5 md:text-lg rounded-lg  text-white`}
            >
              <span className="">{loading ? "Loading" : "Reset password"}</span>
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
