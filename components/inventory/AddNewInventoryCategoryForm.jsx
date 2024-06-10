"use client";

import { kSuccess } from "@/constants";
import { inventoryCategoryHandler } from "@/handlers/inventory/add-category-handler";
import { setToggleSystemNotification } from "@/redux/slices/stateProviderSlice";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddNewInventoryCategoryForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const dispatch = useDispatch();

  const formHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const result = await inventoryCategoryHandler(e);

    if (result === kSuccess) {
      dispatch(
        setToggleSystemNotification({
          show: "show-notification-card",
          title: "Success",
          body: `Category created successfully`,
          color: "success",
        })
      );
      e.target.reset();
    }

    setLoadingBtn(false);
  };

  return (
    <form
      className="page-scroll-on-add-data overflow-y-scroll"
      onSubmit={formHandler}
    >
      <div className="bg-white p-3 rounded mb-3 flex-fill h-fit-content">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="categoryName"
            required={true}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control"></textarea>
        </div>
      </div>

      {loadingBtn ? (
        <button type="button" className="btn btn-success">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn btn-success">
          Create
        </button>
      )}
    </form>
  );
};

export default AddNewInventoryCategoryForm;
