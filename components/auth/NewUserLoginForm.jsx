"use client";

import { kSuccess } from "@/constants";
import {
  checkUserExistence,
  newLoginLoginAction,
} from "@/handlers/auth/auth-handler";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

const NewUserLoginForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const result = await checkUserExistence(e.target.email);

    if (result === kSuccess) {
      setLoadingBtn(false);
    } else {
      console.log("result", result);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="jonas@gmail.com"
        className="form-control mb-3"
        required={true}
      />

      {loadingBtn ? (
        <button className="btn w-100 btn-primary mt-2">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn w-100 btn-primary mt-2">
          Send email
        </button>
      )}
    </form>
  );
};

export default NewUserLoginForm;
