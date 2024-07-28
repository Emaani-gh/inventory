"use client";

import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GoBackFunction = ({ urlSet }) => {
  const router = useRouter();

  const routeBackAction = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${urlSet}`);
    }
  };

  return (
    <div className="d-flex justify-content-start mb-4 container">
      <button
        onClick={routeBackAction}
        className="btn btn-outline-primary d-flex align-items-center"
      >
        <ArrowBack className="me-2" />
        <span>Go back</span>
      </button>
    </div>
  );
};

export default GoBackFunction;
