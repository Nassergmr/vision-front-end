"use client";

import VerifyEmail from "@/components/authComponents/verifyEmail";
import { Suspense } from "react";

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};
export default Page;
