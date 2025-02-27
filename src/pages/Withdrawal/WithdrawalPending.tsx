import React from 'react';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../../src/pages/Withdrawal/withdrawal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithdrawals } from '../../features/withdrawal/withdrawalSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SearchInput from '../../common/Search/SearchInput';
import Pagination from '../../common/Pagination/Pagination';

const WithdrawalPending: React.FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate(); // Initialize navigation function

  const handleSelectAll = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
  };

  const withdrawals = useSelector((state: RootState) => state.withdrawals.data);
  console.log('withdrawals', withdrawals);
  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, []);

  // Handle row checkbox selection
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
    <div>
      <Breadcrumb pageName="Pending Withdrwals" />
      <div className="row">
        {/* <div
          className="flex-wrap gap-2 mt-3 justify-content-md-end justify-content-center"
          style={{ display: 'flex' }}
        >
          <button className="btn btn-sm approveButton responsive-btn">
            Approve All
          </button>
          <button className="btn btn-sm rejectButton responsive-btn">
            Reject All
          </button>
        </div> */}
        <div className="mt-3">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Payable Amount
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Usd
                </th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Account Details
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
              {currentItems.length > 0 ? (
                currentItems.map((withdrawal: any, index: number) => (
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
                        {withdrawal.txCharge}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.amount}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {withdrawal.tds || '0'}
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
                    >
                      {withdrawal.status === 0
                        ? 'Pending'
                        : withdrawal.status === 1
                        ? 'Approved'
                        : 'Cancelled'}
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
      </div>
      {filteredData.length > itemsPerPage && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
};

export default WithdrawalPending;
