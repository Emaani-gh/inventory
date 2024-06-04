import Link from 'next/link';
import React from 'react'

const AllInventoryTable = () => {
  return (
    <div className="overflow-scroll fs-14px h-100">
      <div className="table-container">
        <table className="table w-100 text-nowrap table-responsive table-hover">
          <thead className="table-dark position-relative">
            <tr className="position-sticky top-0">
              <th className="fw-light">No</th>
              <th className="fw-light">Id</th>
              <th className="fw-light">Item</th>
              <th className="fw-light">Category</th>
              <th className="fw-light">Stock</th>
              <th className="fw-light">Unity price</th>
              <th className="fw-light text-end">Action</th>
            </tr>
          </thead>
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
                  href={`/users/`}
                  className="text-center rounded px-2 py-1 bg-secondary text-white fs-14px text-decoration-none me-1"
                >
                  View
                </Link>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllInventoryTable
