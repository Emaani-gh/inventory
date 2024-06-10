import AllInventoryTable from "@/components/inventory/AllInventoryTable";
import InventorySearchForm from "@/components/inventory/InventorySearchForm";
import React from "react";

export const metadata = {
  title: "Inventory",
  description: "Update, Add, Delete and Update inventories",
};

const page = () => {
  return (
    <div className="overview-h overflow-y-scroll overflow-x-hidden">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h4 className="text-primary-emphasis">Inventory</h4>
      </div>
 
      <InventorySearchForm />
      <AllInventoryTable />
    </div>
  );
};

export default page;
