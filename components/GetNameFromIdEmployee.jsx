"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetNameFromIdEmployee = ({ idTag }) => {
  const [tagName, setTagName] = useState("---");

  const usersList = useSelector((state) => state.allUsersHolder.usersList);

  useEffect(() => {
    Object.entries(usersList).map(([key, user]) => {
      if (idTag === user.userUid) {
        setTagName(user.firstName + " " + user.lastName);
      }
    });
  }, []);

  return tagName;
};

export default GetNameFromIdEmployee;
