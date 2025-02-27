import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { fetchWithdrawals } from '../../features/withdrawal/withdrawalSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../../common/Search/SearchInput';
import Pagination from '../../common/Pagination/Pagination';

const WithdrawalCancle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const withdrawals = useSelector((state: RootState) => state.withdrawals.data);

  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, []);

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = withdrawals.filter((withdrawal) =>
    withdrawal.amount.toString().includes(searchTerm),
  );

  // Paginate Data
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Handle Page Change
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  return (
    <>
      <Breadcrumb pageName="Cancelled Withdrwals" />
      <SearchInput
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
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
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Tds
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
              {currentItems.length > 0 ? (
                currentItems.map((withdrawal: any, index: number) => (
                  <tr key={withdrawal._id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.uCode?.username || 'N/A'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {' '}
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
                        {withdrawal.txCharge}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.tds || '0'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.amount}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.accountDetails || 'N/A'}
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
                      style={{ borderBottom: '1px solid #eeeeee' }}
                    >
                      {withdrawal.status === 0
                        ? 'Pending'
                        : withdrawal.status === 1
                        ? 'Approved'
                        : 'Cancelled'}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.reasone || 'N/A'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
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
        {/* Pagination Component */}
        {filteredData.length > itemsPerPage && (
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        )}
      </div>
    </>
  );
};

export default WithdrawalCancle;
