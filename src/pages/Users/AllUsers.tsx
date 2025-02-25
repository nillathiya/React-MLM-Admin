import React, { useState } from 'react';
import { ICONS } from '../../constants';
import Icon from '../../components/Icons/Icon';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SearchInput from '../../common/Search/SearchInput';
import Pagination from '../../common/Pagination/Pagination';

interface ToggleStatusLoadingData {
  id: string | null;
  name: string | null;
}

interface ToggleStatusFormData {
  accountStatus?: { blockStatus?: boolean; isActive?: boolean };
  adminRegisterStatus?: boolean;
  emailVerification?: { isVerified: boolean };
}

const AllUsers: React.FC = () => {
  const [toggleData, setToggleData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [toggleStatusLoadingData, setToggleStatusLoadingData] =
    useState<ToggleStatusLoadingData>({
      id: null,
      name: null,
    });
  const handleToggleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string,
    currentStatus: boolean,
  ) => {};

  function handleEditClick(_id: any): void {
    throw new Error('Function not implemented.');
  }

  function handleRequestImpersonationToken(_id: any) {
    throw new Error('Function not implemented.');
  }

  function handleMachineClick(_id: any) {
    throw new Error('Function not implemented.');
  }

  // filter table data
  const [searchTerm, setSearchTerm] = useState('');

  // filter data
  const filteredData = users.filter(
    (item) =>
      item.Userid.includes(searchTerm) ||
      item.fCode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.includes(searchTerm) ||
      item.status.includes(searchTerm) ||
      item.replay.includes(searchTerm) ||
      item.walletType.includes(searchTerm),
  );

  // pagoination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <Breadcrumb pageName="All Users" />
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div
            className="machine-total"
            style={{ justifyContent: 'end', marginBottom: '5px' }}
          >
            | All Users: ({users.length})
          </div>
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    ID
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Action
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    USER NAME
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Country
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Mobile
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Email
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Join Date
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Total Machines
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Block Status
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Active Status
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Register Status
                  </th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                    Email verify status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((user: any, index: number) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-white hover:bg-[#0ba4d8] bg-[#11cdef] px-2 py-1 rounded-md text-black"
                            onClick={() => handleEditClick(user._id)}
                          >
                            <Icon Icon={ICONS.EDITPAN} className="w-5 h-5" />
                          </button>
                          <button className="hover:text-white hover:bg-[#0ba4d8] bg-[#11cdef] px-2 py-1 rounded-md text-black">
                            <Icon Icon={ICONS.DOWNLOAD} className="w-5 h-5" />
                          </button>
                          <button
                            className="hover:text-white hover:bg-[#0ba4d8] bg-[#11cdef] px-3 py-1 rounded-md text-black"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRequestImpersonationToken(user._id);
                            }}
                          >
                            LOGIN
                          </button>

                          <button
                            className="hover:text-white hover:bg-[#0ba4d8] bg-[#11cdef] px-3 py-1 rounded-md text-black"
                            onClick={(e) => {
                              e.preventDefault();
                              handleMachineClick(user._id);
                            }}
                          >
                            MACHINE
                          </button>
                        </div>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              toggleData[index]?.accountStatus?.isActive
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          ></span>
                          <h5 className="font-medium text-black dark:text-white">
                            {user.username}
                          </h5>
                        </div>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {user?.address?.country}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.mobile}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.email}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {
                            new Date(user?.createdAt)
                              .toISOString()
                              .split('T')[0]
                          }
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.userTotalMachine
                            ? user.userTotalMachine?.activeMachines +
                              user.userTotalMachine?.inactiveMachines
                            : 0}
                        </p>
                      </td>
                      {/* Block status */}
                      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                        <label className="flex cursor-pointer items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="blockStatus"
                              checked={
                                toggleData[index]?.accountStatus
                                  ?.blockStatus === true
                              }
                              onChange={(e) =>
                                handleToggleChange(
                                  e,
                                  user._id,
                                  toggleData[index]?.accountStatus?.blockStatus,
                                )
                              }
                              className="sr-only"
                            />
                            {toggleStatusLoadingData.id === user._id &&
                            toggleStatusLoadingData.name === 'blockStatus' ? (
                              <div className="flex w-10 mx-auto">
                                <Loader
                                  loader="ClipLoader"
                                  size={20}
                                  color="blue"
                                />
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`block w-14 h-8 rounded-full ${
                                    toggleData[index]?.accountStatus
                                      ?.blockStatus === true
                                      ? 'bg-green-500'
                                      : 'bg-gray-500'
                                  }`}
                                ></div>
                                <div
                                  className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition ${
                                    toggleData[index]?.accountStatus
                                      ?.blockStatus === true
                                      ? 'translate-x-full bg-primary'
                                      : ''
                                  }`}
                                ></div>
                              </>
                            )}
                          </div>
                        </label>
                      </td>
                      {/* Active Status */}
                      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                        <label className="flex cursor-pointer items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="isActive"
                              checked={
                                toggleData[index]?.accountStatus?.isActive ===
                                true
                              } // Status 1 = On, 0 = Off
                              onChange={(e) =>
                                handleToggleChange(
                                  e,
                                  user._id,
                                  toggleData[index]?.accountStatus?.isActive,
                                )
                              }
                              className="sr-only"
                            />
                            {toggleStatusLoadingData.id === user._id &&
                            toggleStatusLoadingData.name === 'isActive' ? (
                              <div className="flex w-10 mx-auto">
                                <Loader
                                  loader="ClipLoader"
                                  size={20}
                                  color="blue"
                                />
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`block w-14 h-8 rounded-full ${
                                    toggleData[index]?.accountStatus
                                      ?.isActive === true
                                      ? 'bg-green-500'
                                      : 'bg-gray-500'
                                  }`}
                                ></div>
                                <div
                                  className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition ${
                                    toggleData[index]?.accountStatus
                                      ?.isActive === true
                                      ? 'translate-x-full bg-primary'
                                      : ''
                                  }`}
                                ></div>
                              </>
                            )}
                          </div>
                        </label>
                      </td>
                      {/* Register status */}
                      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                        <label className="flex cursor-pointer items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="adminRegisterStatus"
                              checked={
                                toggleData[index]?.adminRegisterStatus === true
                              }
                              onChange={(e) =>
                                handleToggleChange(
                                  e,
                                  user._id,
                                  toggleData[index]?.adminRegisterStatus,
                                )
                              }
                              className="sr-only"
                            />
                            {toggleStatusLoadingData.id === user._id &&
                            toggleStatusLoadingData.name ===
                              'adminRegisterStatus' ? (
                              <div className="flex w-10 mx-auto">
                                <Loader
                                  loader="ClipLoader"
                                  size={20}
                                  color="blue"
                                />
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`block w-14 h-8 rounded-full ${
                                    toggleData[index]?.adminRegisterStatus ===
                                    true
                                      ? 'bg-green-500'
                                      : 'bg-gray-500'
                                  }`}
                                ></div>
                                <div
                                  className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition ${
                                    toggleData[index]?.adminRegisterStatus ===
                                    true
                                      ? 'translate-x-full bg-primary'
                                      : ''
                                  }`}
                                ></div>
                              </>
                            )}
                          </div>
                        </label>
                      </td>
                      {/* Email verify status */}
                      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                        <label className="flex cursor-pointer items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="isVerified"
                              checked={
                                toggleData[index]?.emailVerification
                                  .isVerified === true
                              }
                              onChange={(e) =>
                                handleToggleChange(
                                  e,
                                  user._id,
                                  toggleData[index]?.emailVerification
                                    .isVerified,
                                )
                              }
                              className="sr-only"
                            />
                            {toggleStatusLoadingData.id === user._id &&
                            toggleStatusLoadingData.name === 'isVerified' ? (
                              <div className="flex w-10 mx-auto">
                                <Loader
                                  loader="ClipLoader"
                                  size={20}
                                  color="blue"
                                />
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`block w-14 h-8 rounded-full ${
                                    toggleData[index]?.emailVerification
                                      .isVerified === true
                                      ? 'bg-green-500'
                                      : 'bg-gray-500'
                                  }`}
                                ></div>
                                <div
                                  className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition ${
                                    toggleData[index]?.emailVerification
                                      .isVerified === true
                                      ? 'translate-x-full bg-primary'
                                      : ''
                                  }`}
                                ></div>
                              </>
                            )}
                          </div>
                        </label>
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default AllUsers;
