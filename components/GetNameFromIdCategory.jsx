"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetNameFromIdCategory = ({ idTag }) => {
  const [tagName, setTagName] = useState("---");

   const inventoryCategoryList = useSelector(
     (state) => state.inventoryHolder.inventoryCategoryList
   );

  useEffect(() => {
    Object.entries(inventoryCategoryList).map(([key, category]) => {
      if (idTag === category.categoryId) {
        setTagName(category.categoryName);
      }
    });
  }, []);

  return tagName;
};

export default GetNameFromIdCategory;
