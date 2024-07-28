"use client";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddNewInventoryForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [inventoryCategoryList, setInventoryCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    stock: "",
    unitPrice: "",
    expenseCategoryId: "",
  });

  useEffect(() => {
    const fetchInventoryCategories = async () => {
      try {
        const response = await fetch("/api/getCategory");
        const categories = await response.json();
        setInventoryCategoryList(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchInventoryCategories();
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please login again.");
      setLoadingBtn(false);
      return;
    }

    try {
      const response = await fetch("/api/add-new-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Item added successfully");
        e.target.reset();
        setFormData({
          itemName: "",
          stock: "",
          unitPrice: "",
          expenseCategoryId: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item.");
    }

    setLoadingBtn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="page-scroll-on-add-data overflow-y-scroll pb-3 container"
      onSubmit={formHandler}
    >
      <div className="bg-white rounded mb-3">
        <div className="mb-4">
          <label className="form-label text-muted fs-14px">Name</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            required={true}
            placeholder="Enter new item name here"
            value={formData.itemName}
            onChange={handleInputChange}
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
                value={formData.stock}
                onChange={handleInputChange}
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
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mb-3">
          <div className="form-floating">
            <select
              className="form-select"
              name="expenseCategoryId"
              value={formData.expenseCategoryId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {inventoryCategoryList.length > 0 ? (
                inventoryCategoryList.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.categoryName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No categories available
                </option>
              )}
            </select>
            <label>What is the Inventory category</label>
          </div>
        </div>
      </div>

      {loadingBtn ? (
        <button type="button" className="btn btn-success">
          <CircularProgress className="text-white" />
        </button>
      ) : (
        <button type="submit" className="btn btn-success">
          Add New
        </button>
      )}
    </form>
  );
};

export default AddNewInventoryForm;
