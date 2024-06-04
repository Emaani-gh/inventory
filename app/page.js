import LoginForm from "@/components/auth/LoginForm";
import NotificationWidget from "@/components/system-notification/NotificationWidget";
import Image from "next/image";

export default function Home() {
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
          <h5 className="m-0 my-3 ">Login here</h5>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
