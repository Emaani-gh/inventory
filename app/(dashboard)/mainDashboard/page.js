"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InventorySearchForm from "@/components/inventory/InventorySearchForm";
import TopNavbar from "@/components/TopNavbar";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Edit, Delete } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const AllInventoryTable = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [searchResultValue, setSearchResultValue] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("/api/getInventory");
        const inventories = res.data;
        setInventoryList(inventories);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventory();
  }, []);

  const handleSearch = (value) => {
    setSearchResultValue(value.toLowerCase());
  };

  const handleDelete = async (id) => {
    setLoadingDelete(id);
    try {
      await axios.delete(`/api/deleteInventory/${id}`);
      setInventoryList(inventoryList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
    setLoadingDelete(null);
  };

  const handleEdit = (id) => {
    router.push(`/mainDashboard/editInventory/${id}`);
  };

  const filteredList = inventoryList.filter((item) =>
    item.itemName.toLowerCase().includes(searchResultValue)
  );

  const sortedList = filteredList.sort((a, b) =>
    a.itemName.localeCompare(b.itemName)
  );

  const listToDisplay = searchResultValue ? sortedList : inventoryList;

  return (
    <ProtectedRoute>
      <div className=" fs-14px h-100">
        <div className="t-nav-div">
          <TopNavbar />
        </div>
        <InventorySearchForm onSearch={handleSearch} />
        <div className="table-container" style={{ overflowX: "auto" }}>
          <table className="table w-100 text-nowrap table-hover">
            <thead className="table-dark position-relative">
              <tr className="position-sticky top-0">
                <th className="fw-light">No</th>
                <th className="fw-light">Item</th>
                <th className="fw-light">Category</th>
                <th className="fw-light">Stock</th>
                <th className="fw-light">Unit price</th>
                <th className="fw-light">Added by</th>
                <th className="fw-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listToDisplay.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.addedBy}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(item._id)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                      disabled={loadingDelete === item._id}
                    >
                      {loadingDelete === item._id ? (
                        <CircularProgress size={20} className="text-white" />
                      ) : (
                        <Delete />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AllInventoryTable;
