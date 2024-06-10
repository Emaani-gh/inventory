"use client";

// import { loadAvailableRole } from "@/redux/controllerSlices/all-roles-controller";
import { setToggleSidebar } from "@/redux/slices/stateProviderSlice";
import {
  logoutUser,
  removeUserAction,
  updateUserUrls,
} from "@/redux/slices/userSlice";
import { auth } from "@/utils/firebase";
import {
  Menu,
  Notifications,
  Person2Rounded,
  SellOutlined,
} from "@mui/icons-material";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TopNavbar = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userHolder.userDetail);

  const toggleSidebar = () => {
    dispatch(setToggleSidebar("toggle-side-bar"));
  };

  const currentDate = new Date();

  const signUserLog = async () => {
    // setLoadingBtn(true);
    signOut(auth).then(() => {
      dispatch(logoutUser(null));

      location.reload();
    });
  };

  return (
    // <div className="bg-primary border-left py-2 px-1 d-flex flex-md-row  justify-content-between text-white align-items-between">
    //   <div className="d-flex align-items-center justify-content-between flex-fill">
    //     {/* <Menu className="cursor-pointer" onClick={toggleSidebar} /> */}

    //     {/* <Link
    //       href="/pos"
    //       className="d-flex gap-1 border px-2 py-1 rounded bg-primary-subtle align-items-center cursor-pointer text-decoration-none text-white fs-14px"
    //     >
    //       <SellOutlined className="fs-6" />
    //       <div>POS</div>
    //     </Link> */}
    //   </div>

    //   <div className="d-flex align-items-center gap-4 flex-fill justify-content-end">
    //     <div>
    //       <span className="fs-14px fw-bold">{`${currentDate.getDate()} ${currentDate.toLocaleString(
    //         "default",
    //         { month: "short" }
    //       )} ${currentDate.getFullYear()}`}</span>
    //     </div>

    //     <div>
    //       <Notifications className="fs-6" />
    //     </div>

    //     <div className="dropdown">
    //       <button
    //         className="btn border p-0 px-2 py-1 dropdown-toggle text-white"
    //         type="button"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <Person2Rounded />
    //       </button>
    //       <ul className="dropdown-menu">
    //         <li className="dropdown-item">
    //           {userDetails?.firstName + " " + userDetails?.lastName}
    //         </li>
    //         <li className="dropdown-item cursor-pointer" onClick={signUserLog}>
    //           Log out
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler fs-14px"
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
         {/* <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link text-white" href="/inventory">
                Inventory
              </Link>
            </li>
          </ul>*/}
          <div className="dropdown">
            <button
              className="btn border p-0 px-2 py-1 dropdown-toggle text-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Person2Rounded />
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                {userDetails?.firstName + " " + userDetails?.lastName}
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
