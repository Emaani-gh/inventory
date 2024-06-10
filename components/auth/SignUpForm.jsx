"use client";

import { kErrorStatus, kSuccess, kSuccessStatus } from "@/constants";
import {
  createNewUserAccount,
  employeeHandler,
  handleLoginSubmit,
} from "@/handlers/auth/auth-handler";
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
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handler = async (e) => {
    e.preventDefault()
    setLoadingBtn(true);

    const createUserAccount = await createNewUserAccount(
      e.target.emailAddress.value,
      e.target.password.value,
      e.target.confirmPassword.value
    );

    if (createUserAccount.status === kErrorStatus) {
      dispatch(
        setToggleSystemNotification({
          show: "show-notification-card",
          title: "Error",
          body: createUserAccount.data,
          color: "danger",
        })
      );

      setLoadingBtn(false);
    } else if (createUserAccount.status === kSuccessStatus) {
      const result = await employeeHandler(e, createUserAccount.data.uid);

      if (result === kSuccess) {
        dispatch(
          setToggleSystemNotification({
            show: "show-notification-card",
            title: "Success",
            body: `User created successfully. Please login with your new account`,
            color: "success",
          })
        );
        navigate.push("/");
        e.target.reset();
      }
    }
  };

  useEffect(() => {
    dispatch(setToggleLoginPageLoading(true));
  }, []);

  // userLoginAuthStateChange(dispatch);

  return (
    <form onSubmit={handler}>
      <label className="form-label fs-14px">First name</label>
      <input
        type="text"
        name="firstName"
        placeholder="John"
        className="form-control mb-3"
        required={true}
      />

      <label className="form-label fs-14px">Last name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Mark"
        className="form-control mb-3"
        required={true}
      />

      <label className="form-label fs-14px">Email address</label>
      <input
        type="email"
        name="emailAddress"
        placeholder="markjohn@example.com"
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

      <label className="form-label fs-14px">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="********"
        className="form-control mb-3"
        required={true}
      />

      {loadingBtn ? (
        <button className="btn w-100 btn-primary mt-2">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn w-100 btn-primary mt-2">
          Create account
        </button>
      )}

      <div className="mt-3">
        <Link href="/" className="fs-14px text-primary fw-light">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
