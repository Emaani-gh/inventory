import SignUpForm from "@/components/auth/SignUpForm";
import NotificationWidget from "@/components/system-notification/NotificationWidget";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="login-section d-flex vh-100 align-items-center justify-content-center">
      <div className="login-container container ">
        <NotificationWidget />

        <div className="text-center">
          <Image
            src="/images/ups-logo.webp"
            width={30}
            height={30}
            alt="logo"
          />
          <h5 className="m-0 my-3 ">Sign up here</h5>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
