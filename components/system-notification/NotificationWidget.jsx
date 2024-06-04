"use client";

import { setToggleSystemNotification } from "@/redux/slices/stateProviderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationWidget = () => {
  const dispatch = useDispatch();
  const systemNotification = useSelector(
    (state) => state.stateProviderHolder.systemNotification
  );

  const closeNotification = () => {
    dispatch(
      setToggleSystemNotification({
        show: "",
        title: "",
        body: "",
        color: "",
      })
    );
  };

  useEffect(() => {
    if (systemNotification.show === "show-notification-card") {
      setTimeout(() => {
        closeNotification();
        console.log("I will still run");
      }, 5000);
    }
  }, [systemNotification]);

  return (
    <div className={`notification-widget ${systemNotification.show}`}>
      <div
        className={`notification-card bg-white rounded  py-3 shadow border border-2 border-${systemNotification.color}`}
      >
        <div className="px-3 notification-title d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className={`notification-color-type rounded  me-2 bg-${systemNotification.color}`}
            ></div>
            <h6 className="m-0 fw-bold">{systemNotification.title}</h6>
          </div>

          <button
            onClick={closeNotification}
            type="button"
            className="btn-close fs-14px"
          ></button>
        </div>
        <hr className="hr my-2" />
        <div className="notification-body px-3">
          <p className="m-0">{systemNotification.body}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
