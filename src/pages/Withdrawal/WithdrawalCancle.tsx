import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';

const WithdrawalCancle: React.FC = () => {
  const [withdrawal, SetWithdrawal] = useState<any[]>([]);

  return (
    <>
      <Breadcrumb pageName="Cancelled Withdrwals" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  S No.
                </th>
                <th className=" min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Tx user
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Total Amount
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Tx Charge
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  tds
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Payable Amount
                </th>

                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Account Details
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Reason
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawal.length > 0 ? (
                withdrawal.map((user: any, index: number) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal}
                      </h5>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WithdrawalCancle;
