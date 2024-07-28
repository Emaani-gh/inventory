"use client";

import Link from "next/link";
import React from "react";
import { Search } from "@mui/icons-material";

const InventorySearchForm = ({ onSearch }) => {
  const handleTextSearch = (e) => {
    const { value } = e.target;
    onSearch(value.toLocaleLowerCase());
  };

  return (
    <div className="container d-flex mb-3 align-items-center gap-5">
      <form className="d-flex bg-light-subtle p-3 gap-3 flex-fill align-items-center rounded">
        <input
          type="text"
          className="form-control"
          onChange={handleTextSearch}
          placeholder="Search for an inventory by name"
        />
        <Search />
      </form>

      <Link
        href="/mainDashboard/add-new-inventory"
        className="btn btn-info fs-14px"
      >
        Add new inventory
      </Link>
      <Link
        href="/mainDashboard/add-new-category"
        className="btn btn-primary fs-14px"
      >
        Add new category
      </Link>
    </div>
  );
};

export default InventorySearchForm;
