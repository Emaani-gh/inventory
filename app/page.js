// pages/index.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import NotificationWidget from "@/components/system-notification/NotificationWidget";
import Image from "next/image";
import { verifyToken } from "./middleware/auth";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();

  const JWT_SECRET = process.env.JWT_SECRET || "Testing";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        console.log(JWT_SECRET);
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded) {
          console.log(decoded);
          // If token is valid, redirect to mainDashboard
          router.push("/mainDashboard");
        }
      } catch (error) {
        // Token is invalid or expired
        console.error("Invalid token:", error);
      }
    }
  }, [router]);

  return (
    <div className="login-section d-flex vh-100 align-items-center justify-content-center">
      <div className="login-container container">
        <NotificationWidget />
        <div className="text-center">
          <Image
            src="/images/ups-logo.webp"
            width={30}
            height={30}
            alt="logo"
          />
          <h5 className="m-0 my-3">Login here</h5>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
