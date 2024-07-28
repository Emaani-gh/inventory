"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../authContext";

const LoginForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    setError(null);

    try {
      const res = await axios.post("/api/sign-in", { email, password });
      const { token } = res.data;

      // Store token in local storage
      localStorage.setItem("token", token);

      // Update authentication state
      setIsAuthenticated(true);

      // Redirect to the mainDashboard
      router.push("/mainDashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      setLoadingBtn(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <label className="form-label fs-14px">Email address</label>
      <input
        type="email"
        name="email"
        placeholder="mightyboateng@gmail.com"
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="form-label fs-14px">Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
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
        <button className="btn w-100 btn-primary mt-2" disabled>
          <CircularProgress className="text-white" size={24} />
        </button>
      ) : (
        <button type="submit" className="btn w-100 btn-primary mt-2">
          Login
        </button>
      )}

      <div className="mt-3">
        <Link href="/sign-up" className="fs-14px text-primary fw-light">
          Create an account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
