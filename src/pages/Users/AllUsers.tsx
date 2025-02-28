import React, { useEffect, useRef, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

// Tell the React wrapper to use the DataTables instance
DataTable.use(DT);
// import "datatables.net-dt/css/jquery.dataTables.css";
// import "datatables.net-select-dt/css/select.dataTables.css";
// import "datatables.net-responsive-dt/css/responsive.dataTables.css";

function AllUsers() {
  const [tableData, setTableData] = useState<string[][]>([
    ["Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "2012/03/29", "$433,060"],
  ]);

  const tableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      const dt = tableRef.current.dt();
      console.log("Page info:", dt.page.info());
    }
  }, []);

  const options = {
    paging: true,
    ordering: true,
    info: true,
    responsive: true,
    select: true,
    searching: true,
    dom: "lfrtip",
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">All Users</h1>
      <div className="card-body overflow-x-auto">
        <DataTable
          data={tableData}
          ref={tableRef}
          options={options}
          className="table bordered-table mb-0 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
        >
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Office</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-3 px-4 text-gray-800 dark:text-gray-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}

export default AllUsers;
