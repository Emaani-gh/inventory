"use client";

import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackFunction = ({ urlSet }) => {
  const navigate = useRouter();

  const routeBackAction = () => {
    if (window.history.length >= 2) {
      navigate.push(`/${urlSet}`);
    } else {
      navigate.back();
    }
  };

  return (
    <div onClick={routeBackAction} className="cursor-pointer">
      <ArrowBack className="fs-6" />
    </div>
  );
};

export default GoBackFunction;
