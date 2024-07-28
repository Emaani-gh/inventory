"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopNavbar from "@/components/TopNavbar";
import GoBackFunction from "@/components/GoBackFunction";

const EditInventoryPage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    stock: "",
    unitPrice: "",
    addedBy: "",
  });
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/api/getInvetoryById/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    fetchItem();
  }, [id]);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    try {
      const res = await axios.put(`/api/editInventory/${id}`, formData);
      setNotification({
        show: true,
        title: "Success",
        body: res.data.message,
        color: "success",
      });
      router.push("/mainDashboard");
    } catch (error) {
      setNotification({
        show: true,
        title: "Error",
        body: error.response?.data?.message || "Error updating item",
        color: "danger",
      });
    }

    setLoadingBtn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <ProtectedRoute>
      <div className="">
        <TopNavbar />
        <GoBackFunction />
        <h1 className="container">Edit Inventory Item</h1>
        <form className="p-3 container" onSubmit={formHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="itemName"
              required={true}
              type="text"
              className="form-control"
              value={formData.itemName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              name="category"
              required={true}
              type="text"
              className="form-control"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              name="stock"
              required={true}
              type="number"
              className="form-control"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Unit Price</label>
            <input
              name="unitPrice"
              required={true}
              type="number"
              className="form-control"
              value={formData.unitPrice}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Added By</label>
            <input
              disabled
              name="addedBy"
              required={true}
              type="text"
              className="form-control"
              value={formData.addedBy}
              onChange={handleInputChange}
            />
          </div>

          {loadingBtn ? (
            <button type="button" className="btn btn-success">
              <CircularProgress className="text-white" />
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Update
            </button>
          )}

          {notification && notification.show && (
            <div className={`notification ${notification.color}`}>
              <strong>{notification.title}</strong> - {notification.body}
            </div>
          )}
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditInventoryPage;
