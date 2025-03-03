import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// Tell the React wrapper to use the DataTables instance
DataTable.use(DT);
// import "datatables.net-dt/css/jquery.dataTables.css";
// import "datatables.net-select-dt/css/select.dataTables.css";
// import "datatables.net-responsive-dt/css/responsive.dataTables.css";

function AllUsers() {
  const [tableData, setTableData] = useState<string[][]>([
    [
      '1',
      'Action',
      'Name',
      'username',
      'email',
      'mobile',
      'my pakage',
      'my rank',
      'user address',
      'join Date',
      'Active status',
      'block status',
      'sponser',
    ],
    [
      '1',
      'Action',
      'Name',
      'username',
      'email',
      'mobile',
      'my pakage',
      'my rank', 
      'user address',
      'join Date',
      'Active status',
      'block status',
      'sponser',
    ],
  ]);

  const tableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      const dt = tableRef.current.dt();
      console.log('Page info:', dt.page.info());
    }
  }, []);

  const options = {
    paging: true,
    ordering: true,
    info: true,
    responsive: true,
    select: true,
    searching: true,
    dom: 'lfrtip',
  };

  return (
    <>
      <Breadcrumb pageName="All Users" />
      <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
        <div className="card-body">
          <DataTable
            data={tableData}
            ref={tableRef}
            options={options}
            className="table bordered-table mb-0 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">My Package</th>
                <th className="py-3 px-4 text-left">My Rank</th>
                <th className="py-3 px-4 text-left">User Address</th>
                <th className="py-3 px-4 text-left">Join Date</th>
                <th className="py-3 px-4 text-left">Active Status</th>
                <th className="py-3 px-4 text-left">Block Status</th>
                <th className="py-3 px-4 text-left">Sponsor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="py-3 px-4 text-gray-800 dark:text-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
