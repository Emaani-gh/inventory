"use client";

import { CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const emailAddress = e.target.emailAddress.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
      const response = await fetch("/api/create-new-user-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/mainDashboard");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoadingBtn(false);
    }
  };

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

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {loadingBtn ? (
        <button className="btn w-100 btn-primary mt-2" disabled>
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
