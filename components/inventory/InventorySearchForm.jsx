"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const InventorySearchForm = () => {
  const dispatch = useDispatch();

  const handleTextSearch = (e) => {
    const { value } = e.target;
  };

  return (
    <div className="d-flex mb-3 align-items-center gap-5"> 
      <form className="d-flex bg-light-subtle p-3 gap-3 flex-fill rounded">
        <input
          type="text"
          className="form-control"
          onChange={handleTextSearch}
          placeholder="Search for an inventory by name, id"
        />
      </form>

      <Link href="#" className="btn btn-info fs-14px">
        Add new inventory
      </Link>
    </div>
  );
};

export default InventorySearchForm;
