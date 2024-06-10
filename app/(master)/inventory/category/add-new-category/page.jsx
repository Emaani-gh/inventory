import GoBackFunction from "@/components/GoBackFunction";
import AddNewInventoryCategoryForm from "@/components/inventory/AddNewInventoryCategoryForm";
import React from "react";

export const metadata = {
  title: "Add new category",
  description: "Add a new inventory category to the system",
};

const page = () => {
  return (
    <div>
      <div className="d-flex gap-4 align-items-center">
        <GoBackFunction urlSet='inventory'/>
        <h4 className="text-primary-emphasis m-0">Add new category</h4>
      </div>

      <AddNewInventoryCategoryForm />
    </div>
  );
};

export default page;
