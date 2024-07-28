import GoBackFunction from "@/components/GoBackFunction";
import AddNewInventoryForm from "@/components/inventory/AddNewInventoryForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopNavbar from "@/components/TopNavbar";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <div className="">
        <TopNavbar />
        <GoBackFunction />
        <h1 className="container">Add New</h1>
        <AddNewInventoryForm />
      </div>
    </ProtectedRoute>
  );
};

export default page;
