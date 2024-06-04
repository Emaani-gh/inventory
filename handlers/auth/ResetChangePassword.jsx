"use client";

import { setToggleSystemNotification } from "@/redux/slices/stateProviderSlice";
import { auth } from "@/utils/firebase";
import { CircularProgress } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ResetChangePassword = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const email = e.target.email.value;

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(
          setToggleSystemNotification({
            show: "show-notification-card",
            title: "Success",
            body: `Password reset link sent to ${email}`,
            color: "success",
          })
        );

        navigate.push("/");
      })
      .catch((error) => {
        dispatch(
          setToggleSystemNotification({
            show: "show-notification-card",
            title: "Error",
            body: `${error?.message}`,
            color: "danger",
          })
        );
      });

    setLoadingBtn(false);
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <input
        type="email"
        name="email"
        placeholder="jonas@gmail.com"
        className="form-control mb-3"
        required={true}
      />

      {/* <Link href="/" className="fs-14px text-muted fw-light">
        Change password?
      </Link> */}

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

export default ResetChangePassword;
