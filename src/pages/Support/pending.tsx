import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const Pending: React.FC = () => {
  const staticData = [
    {
      Userid: '123',
      walletType: '100',
      ticketId: '',
      date: '',
      fCode: {
        name: 'john',
      },
      amount: '5454',
      status: '',
      description: '',
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Pending" />

      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  S No.
                </th>
                <th className="min-w-[130px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Ticket Id
                </th>
                <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  User Id
                </th>
                <th className="min-w-[200px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Description
                </th>
                <th className="min-w-[210px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Create Date
                </th>
                <th className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Status
                </th>

                <th className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {staticData.length > 0 ? (
                staticData.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td>{index + 1}</td>
                    <td>{item.ticketId}</td>
                    <td>{item.Userid}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>{item.date}</td>
                    <td>
                      <button className="btn-edit">Edit</button>
                      <button className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pending;
