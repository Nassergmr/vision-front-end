"use client";

import { Suspense } from "react";
import CreateNewPassword from "@/components/authComponents/createNewPassword";

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPassword />
    </Suspense>
  );
};

export default Page;
