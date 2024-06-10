"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingPage from "@/components/LoadingPage";
import NotificationWidget from "@/components/system-notification/NotificationWidget";

import TopNavbar from "@/components/TopNavbar";
import { parentLayoutEffects } from "@/utils/parent-useEffect";
import { userLoginAuthStateChange } from "@/handlers/auth/authStateChange";

const layout = ({ children }) => {
  const dispatch = useDispatch();

  const pageLoading = useSelector(
    (state) => state.stateProviderHolder.masterPageLoading
  );

  parentLayoutEffects(dispatch)

  userLoginAuthStateChange(dispatch)

  return pageLoading ? (
    <LoadingPage text="first" />
  ) : (
    <div>
      <NotificationWidget />
      <TopNavbar />
      <div className="pt-3 px-2">{children}</div>
    </div>
  );
};

export default layout;
