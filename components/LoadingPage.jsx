"use client";

import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// export const metadata = {
//   title: "Loading / UPS admin portal",
//   description: "Processing for a better experience",
// };

const LoadingPage = ({ text }) => {
  const [approvedURL, setApprovedURL] = useState();

  const userActions = useSelector((state) => state.userHolder.userActions);

  const userUrls = useSelector((state) => state.userHolder.userUrls);

  // userActions.map((userRole) => {
  //   userRole?.rootItems.map((role) => {
  //     console.log("urls", role.name);
  //   });
  // });

  // useEffect(() => {
  //   console.log("urls", userUrls);
  // }, []);

  // useEffect(() => {
//   if (text === "Second") {
//     loadRolesAction();
//   }
  // }, [text]);

  return (
    <div className="vh-100 d-flex align-items-center flex-column gap-3 justify-content-center">
      <Image
        src="/images/ups-logo.webp"
        width={50}
        height={50}
        alt="logo-image"
        priority={true}
      />
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
