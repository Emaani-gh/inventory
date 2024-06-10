import GoBackFunction from '@/components/GoBackFunction';
import AddNewInventoryForm from '@/components/inventory/AddNewInventoryForm';
import React from 'react'

export const metadata = {
  title: "Add new item",
  description: "add an item to your system",
};


const page = () => {
  return (
    <div>
      <div className="d-flex gap-4 align-items-center">
        <GoBackFunction urlSet="inventory" />
        <h4 className="text-primary-emphasis m-0">Add new item</h4>
      </div>

      <AddNewInventoryForm />
      
    </div>
  );
}

export default page
