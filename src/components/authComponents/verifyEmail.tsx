"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid token");
      return;
    }

    const handleVerifyEmail = async () => {
      try {
        const res = await fetch(
          `https://vision-back-end-bold-firefly-8752.fly.dev/vision/auth/verify-email?token=${token}`
        );
        const data = await res.json();
        setErrorMessage("");
        setSuccessMessage("Verification successfull");
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("verified", "true");
        window.location.href = "/my-profile";
      } catch (error) {
        alert(error);
        setSuccessMessage("");
        setErrorMessage("Something went wrong.");
      }
    };

    handleVerifyEmail();
  }, [token, router]);

  return (
    <div className="p-6 text-center my-[4rem] text-xl">
      {successMessage.trim() !== "" && (
        <p className="text-[#37C57D]">{successMessage}</p>
      )}
      {errorMessage.trim() !== "" && (
        <p className="text-[#cc1a5f]">{errorMessage}</p>
      )}
    </div>
  );
}
