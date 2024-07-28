"use client";

import GoBackFunction from "@/components/GoBackFunction";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopNavbar from "@/components/TopNavbar";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

const AddNewInventoryCategoryForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });
  const [notification, setNotification] = useState(null);

  const formHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const result = await fetch("/api/add-new-categ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (result.message === "Category created successfully") {
      setNotification({
        show: true,
        title: "Success",
        body: "Category created successfully",
        color: "success",
      });
      setFormData({
        categoryName: "",
        description: "",
      });
      e.target.reset();
    } else {
      setNotification({
        show: true,
        title: "Error",
        body: result.message,
        color: "danger",
      });
    }

    setLoadingBtn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <ProtectedRoute>
      <TopNavbar />
      <GoBackFunction />
      <form
        className="page-scroll-on-add-data overflow-y-scroll container"
        onSubmit={formHandler}
      >
        <div className="bg-white rounded mb-3 flex-fill h-fit-content">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="categoryName"
              required={true}
              type="text"
              className="form-control"
              value={formData.categoryName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
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

        {notification && notification.show && (
          <div className={`notification ${notification.color}`}>
            <strong>{notification.title}</strong> - {notification.body}
          </div>
        )}
      </form>
    </ProtectedRoute>
  );
};

export default AddNewInventoryCategoryForm;
