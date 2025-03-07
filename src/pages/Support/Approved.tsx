import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SearchInput from '../../common/Search/SearchInput';
import Pagination from '../../common/Pagination/Pagination';

const Approved = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Static Data
  const staticData = [
    {
      Userid: '2121212',
      walletType: 'main_wallet',
      fCode: { name: 'john' },
      status: 'pending',
      amount: '1000',
      replay: '',
    },
    {
      Userid: '13132121',
      walletType: 'fund_wallet',
      fCode: { name: 'doe' },
      status: 'success',
      amount: '2000',
      replay: '',
    },
    {
      Userid: '2121212',
      walletType: 'main_wallet',
      fCode: { name: 'john' },
      status: 'pending',
      amount: '1000',
      replay: '',
    },
    {
      Userid: '13132121',
      walletType: 'fund_wallet',
      fCode: { name: 'doe' },
      status: 'success',
      amount: '2000',
      replay: '',
    },
  ];

  // Filtered Data based on Search
  const filteredData = staticData.filter(
    (item) =>
      item.Userid.includes(searchTerm) ||
      item.fCode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.includes(searchTerm) ||
      item.status.includes(searchTerm) ||
      item.walletType.includes(searchTerm),
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
      <Breadcrumb pageName="Approved" />
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  S No.
                </th>
                <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
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
                  Reply
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td>{offset + index + 1}</td>
                    <td>{item.Userid}</td>
                    <td>{item.fCode?.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.walletType}</td>
                    <td>{item.status}</td>
                    <td>{item.replay}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No data found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Component */}
      {filteredData.length > itemsPerPage && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
};

export default Approved;
