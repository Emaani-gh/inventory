"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import GetNameFromIdEmployee from "../GetNameFromIdEmployee";
import GetNameFromIdCategory from "../GetNameFromIdCategory";

const AllInventoryTable = () => {
  const inventoryList = useSelector(
    (state) => state.inventoryHolder.inventoryList
  );

  const searchResultValue = useSelector(
    (state) => state.inventoryHolder.nameFilterValueExpense
  );

  return (
    <div className="overflow-scroll fs-14px h-100">
      <InventorySearchForm />
      <div className="table-container">
        <table className="table w-100 text-nowrap table-responsive table-hover">
          <thead className="table-dark position-relative">
            <tr className="position-sticky top-0">
              <th className="fw-light">No</th>
              {/* <th className="fw-light">Id</th> */}
              <th className="fw-light">Item</th>
              <th className="fw-light">Category</th>
              <th className="fw-light">Stock</th>
              <th className="fw-light">Unity price</th>
              <th className="fw-light">Added by</th>
              {/* <th className="fw-light text-end">Action</th> */}
            </tr>
          </thead>

          {inventoryList ? (
            <tbody>
              {searchResultValue !== null
                ? Object.entries(inventoryList).map(([key, item], index) => {
                    if (
                      searchResultValue !== null &&
                      item.itemName
                        .toLocaleLowerCase()
                        .includes(searchResultValue)
                    ) {
                      return (
                        <tr key={key}>
                          <th scope="row">{index + 1}</th>
                          {/* <td>{item.itemId}</td> */}
                          <td>{item.itemName}</td>
                          <td>
                            <GetNameFromIdCategory
                              idTag={item.expenseCategoryId}
                            />
                          </td>
                          <td>{item.unitPrice}</td>
                          <td>
                            <GetNameFromIdEmployee idTag={item.addedBy} />
                          </td>

                          {/* <td className="text-end">
                          <Link
                            href={`/users/${employee.userUid}`}
                            className="text-center rounded px-2 py-1 bg-secondary text-white fs-14px text-decoration-none me-1"
                          >
                            View
                          </Link>
                        </td> */}
                        </tr>
                      );
                    }
                  })
                : Object.entries(inventoryList).map(([key, item], index) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{item.itemId}</td> */}
                        <td>{item.itemName}</td>
                        <td>
                          <GetNameFromIdCategory
                            idTag={item.expenseCategoryId}
                          />
                        </td>
                        <td>{item.stock}</td>
                        <td>{item.unitPrice}</td>
                        <td>
                          <GetNameFromIdEmployee idTag={item.addedBy} />
                        </td>

                        {/* <td className="text-end">
                        <Link
                          href={`/users/${employee.userUid}`}
                          className="text-center rounded px-2 py-1 bg-secondary text-white fs-14px text-decoration-none me-1"
                        >
                          View
                        </Link>
                      </td> */}
                      </tr>
                    );
                  })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td>1</td>
                <td>Id</td>
                <td>Item</td>
                <td>Category</td>
                <td>Stock</td>
                <td>Unity price</td>
                <td className="text-end">
                  <Link
                    href={`/inventory/inventory-id`}
                    className="text-center rounded px-2 py-1 bg-secondary text-white fs-14px text-decoration-none me-1"
                  >
                    View
                  </Link>{" "}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AllInventoryTable;
