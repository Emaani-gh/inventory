"use client";

import { kSuccess } from "@/constants";
import { handleLoginSubmit } from "@/handlers/auth/auth-handler";
import { userLoginAuthStateChange } from "@/handlers/auth/authStateChange";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleLoginPageLoading,
  setToggleSystemNotification,
} from "@/redux/slices/stateProviderSlice";

const LoginForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const dispatch = useDispatch();
  const loginPageLoader = useSelector(
    (state) => state.stateProviderHolder.loginPageLoading
  );

  const handler = async (e) => {
    setLoadingBtn(true);
    const authResult = await handleLoginSubmit(e);

    if (authResult !== kSuccess) {
      dispatch(
        setToggleSystemNotification({
          show: "show-notification-card",
          title: "Login failed",
          body: `${authResult?.message}`,
          color: "danger",
        })
      );

      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    dispatch(setToggleLoginPageLoading(true));
  }, []);


  userLoginAuthStateChange(dispatch);

  return loginPageLoader ? (
    <LoadingPage />
  ) : (
    <form onSubmit={handler}>
      <label className="form-label fs-14px">Email address</label>
      <input
        type="email"
        name="email"
        placeholder="mightyboateng@gmail.com"
        className="form-control mb-3"
        required={true}
      />

      <label className="form-label fs-14px">Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        className="form-control mb-3"
        required={true}
      />

      <div className="mb-5">
        <Link
          href="/reset-change-password"
          className="fs-14px text-muted fw-light"
        >
          Forgot password?
        </Link>
      </div>

      {loadingBtn ? (
        <button className="btn w-100 btn-primary mt-2">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn w-100 btn-primary mt-2">
          Login
        </button>
      )}

      <div className="mt-3">
        <Link
          href="/sign-up"
          className="fs-14px text-primary fw-light"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
