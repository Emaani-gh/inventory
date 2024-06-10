"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import { updateNameFilterValueExpense } from "@/redux/pageSlice/inventory-slice";

const InventorySearchForm = () => {
  const dispatch = useDispatch();

  const handleTextSearch = (e) => {
    const { value } = e.target;

    dispatch(updateNameFilterValueExpense(value.toLocaleLowerCase()));
  };

  return (
    <div className="d-flex mb-3 align-items-center gap-5">
      <form className="d-flex bg-light-subtle p-3 gap-3 flex-fill align-items-center rounded">
        <input
          type="text"
          className="form-control"
          onChange={handleTextSearch}
          placeholder="Search for an inventory by name, id"
        />

        <Search />
      </form>

      <Link
        href="/inventory/add-new-inventory"
        className="btn btn-info fs-14px"
      >
        Add new inventory
      </Link>
      <Link
        href="/inventory/category/add-new-category"
        className="btn btn-primary fs-14px"
      >
        Add new category
      </Link>
    </div>
  );
};

export default InventorySearchForm;
