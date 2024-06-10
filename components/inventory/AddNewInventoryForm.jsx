"use client";

import { kSuccess } from "@/constants";
import { inventoryHandler } from "@/handlers/inventory/inventory-handler";
import { setToggleSystemNotification } from "@/redux/slices/stateProviderSlice";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewInventoryForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const userDetails = useSelector((state) => state.userHolder.userDetail);

  const dispatch = useDispatch();

  const inventoryCategoryList = useSelector(
    (state) => state.inventoryHolder.inventoryCategoryList
  );

  const formHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const result = await inventoryHandler(e, userDetails.userUid);

    if (result === kSuccess) {
      dispatch(
        setToggleSystemNotification({
          show: "show-notification-card",
          title: "Success",
          body: `Item added successfully`,
          color: "success",
        })
      );
      e.target.reset();
    }

    setLoadingBtn(false);
  };

  return (
    <form
      className="page-scroll-on-add-data overflow-y-scroll pb-3"
      onSubmit={formHandler}
    >
      <div className="bg-white p-3 rounded mb-3">
        <div className="mb-4">
          <label className="form-label text-muted fs-14px">Name</label>

          <input
            type="text"
            className="form-control"
            name="itemName"
            required={true}
            placeholder="enter new item name here"
          />
        </div>

        <div className="mb-5">
          <div className="row">
            <div className="col-lg-6">
              <label className="form-label text-muted fs-14px">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                required={true}

              />
            </div>
            <div className="col-lg-6">
              <label className="form-label text-muted fs-14px">
                Unit price
              </label>
              <div>
                <div className="input-group">
                  <span className="input-group-text">GH₵</span>
                  <input
                    type="number"
                    className="form-control"
                    name="unitPrice"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mb-3">
          <div className="form-floating">
            <select className="form-select" name="expenseCategoryId">
              {inventoryCategoryList ? (
                Object.entries(inventoryCategoryList).map(
                  ([key, category], index) => (
                    <option key={index} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  )
                )
              ) : (
                <option>empty</option>
              )}
            </select>
            <label>What is the expense category</label>
          </div>
        </div>
      </div>

      {loadingBtn ? (
        <button type="button" className="btn btn-success">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn btn-success">
          Add Expense
        </button>
      )}
    </form>
  );
};

export default AddNewInventoryForm;
