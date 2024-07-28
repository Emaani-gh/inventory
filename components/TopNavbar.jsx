"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Person2Rounded } from "@mui/icons-material";
import jwt from "jsonwebtoken";
import Image from "next/image";
import logo from "@/public/images/logo.jpg";

const TopNavbar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserDetails(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const signUserLog = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const currentDate = new Date();

  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/mainDashboard">
          <Image src={logo} width={50} height={40} alt="logo" />
        </Link>
        <div className="text-white bold fs-4">EPA</div>
        <button
          className="navbar-toggler fs-14px custom-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mx-auto mb-2 mb-lg-0"></div>
          <div className="dropdown ms-auto">
            <button
              className="btn border p-0 px-2 py-1 dropdown-toggle text-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Person2Rounded />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="dropdown-item">
                {userDetails
                  ? `${userDetails.firstName} ${userDetails.lastName}`
                  : "Loading..."}
              </li>
              <li
                className="dropdown-item cursor-pointer"
                onClick={signUserLog}
              >
                Log out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
