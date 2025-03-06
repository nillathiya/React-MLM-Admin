import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../../src/pages/Withdrawal/withdrawal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithdrawals } from '../../features/withdrawal/withdrawalSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PER_PAGE_ITEMS } from '../../constants';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import toast from 'react-hot-toast';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-select-dt';
import { formatDate } from '../../utils/dateUtils';

const WithdrawalPending: React.FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelectAll = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
  };

  const withdrawals = useSelector((state: RootState) => state.withdrawals.data);
  const isLoading = useSelector((state: RootState) => state.withdrawals.data);

  useEffect(() => {
    (async () => {
      try {
        if (withdrawals.length === 0) {
          await dispatch(fetchWithdrawals()).unwrap();
        }
      } catch (error: any) {
        toast.error(error?.message || 'Server error');
      }
    })();
  }, [dispatch, withdrawals]);

  const handleRowSelect = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleClick = (id: string) => {
    navigate(`/view-withdrawal/${id}`);
  };

  const tableRef = useRef<HTMLTableElement>(null);
  console.log('tableReftableRef', tableRef);
  useEffect(() => {
    if (tableRef.current && !isLoading && withdrawals.length > 0) {
      const table = $(tableRef.current).DataTable({
        paging: true,
        ordering: true,
        info: true,
        responsive: true,
        searching: true,
        pageLength: DEFAULT_PER_PAGE_ITEMS,
      });

      return () => {
        table.destroy();
        console.log('tabletable', table);
      };
    }
  }, [withdrawals, isLoading]);
  const groupOrdersByCustomer = (withdrawals: any) => {
    const groupedOrders = withdrawals.reduce((acc: any, withdrawal: any) => {
      const username = withdrawal.customerId?.username || 'Guest';
      if (!acc[username]) {
        acc[username] = { ...withdrawal, amount: withdrawal.amount };
      } else {
        acc[username].amount += withdrawal.amount;
      }
      return acc;
    }, {});

    return Object.values(groupedOrders);
  };

  const groupedOrders = groupOrdersByCustomer(withdrawals);
  console.log('groupedOrdersgroupedOrders', groupedOrders);
  return (
    <div>
      <Breadcrumb pageName="Pending Withdrwals" />
      <div className="row"></div>

      <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table
            ref={tableRef}
            className="table bordered-table mb-0 w-full border border-gray-300 dark:border-gray-700 rounded-lg display overflow-x-auto"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  S.No
                </th>
                <th className=" min-w-[50px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className=" min-w-[130px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Tx user
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Action
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Amount
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Tx Charge
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Withdrawal pool
                </th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Payable Amount
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  TDS
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Status
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(5)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array(13)
                        .fill(null)
                        .map((_, cellIndex) => (
                          <td key={cellIndex}>
                            <Skeleton width="100%" height="20px" />
                          </td>
                        ))}
                    </tr>
                  ))
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="text-center py-4 text-gray-600 dark:text-gray-300"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                groupedOrders.map((withdrawal: any, index: number) => (
                  <tr key={withdrawal._id}>
                    <td>{index + 1}</td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(withdrawal._id)}
                          onChange={() => handleRowSelect(withdrawal._id)}
                          className="cursor-pointer"
                        />
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.uCode?.username || 'N/A'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        <button
                          onClick={() => handleClick(withdrawal._id)}
                          className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                        >
                          View
                        </button>
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        $
                        {(
                          (withdrawal.amount ?? 0) +
                          (withdrawal.txCharge ?? 0) +
                          (withdrawal.wPool ?? 0)
                        ).toFixed(2)}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        ${withdrawal.txCharge}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.wPool ? `$${withdrawal.wPool}` : 0}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        ${withdrawal.amount}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.tds || '0'}
                      </h5>
                    </td>
                    <td
                      className={`
                      rounded-md font-semibold text-start border-b border-[#eee] py-5 px-4 dark:border-strokedark
                        ${
                          withdrawal.status === 0
                            ? ' !text-yellow-700'
                            : withdrawal.status === 1
                            ? ' !text-green-700'
                            : ' !text-red-700'
                        }
                      `}
                    >
                      {withdrawal.status === 0
                        ? 'Pending'
                        : withdrawal.status === 1
                        ? 'Approved'
                        : 'Cancelled'}
                    </td>
                    <td>{formatDate(withdrawal.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPending;
