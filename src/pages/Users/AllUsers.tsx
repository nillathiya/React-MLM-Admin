import React, { useEffect, useMemo, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-select-dt';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAllUserAsync } from '../../features/user/userSlice';
import { DEFAULT_PER_PAGE_ITEMS } from '../../constants';
import { formatDate } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

function AllUsers() {
  const { users, isLoading } = useSelector((state: RootState) => state.user);
  const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllUserAsync()).unwrap();
      } catch (error: any) {
        toast.error(error?.message || 'Server error');
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (tableRef.current && !isLoading && users.length > 0) {
      const existingTable = ($.fn as any).DataTable.isDataTable(
        tableRef.current,
      ); // Cast $.fn to 'any'

      if (existingTable) {
        $(tableRef.current).DataTable().destroy(); // Destroy existing DataTable
      }

      $(tableRef.current).DataTable({
        paging: true,
        ordering: true,
        info: true,
        responsive: true,
        searching: true,
        pageLength: DEFAULT_PER_PAGE_ITEMS,
      });
    }
  }, [users]);

  const updatedUsers = useMemo(() => {
    return users.map((user) => {
      const userId = user._id;
      const userOrders = orders.filter((or) => or.customerId._id === userId);
      const totalInvestment = userOrders.reduce((acc, or) => acc + or.bv, 0);
      return {
        ...user,
        package: totalInvestment,
      };
    });
  }, [users, orders]);

  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/users/edituser/${id}`);
  };
  return (
    <>
      <Breadcrumb pageName="All Users" />
      <div className="table-bg">
        <div className="card-body overflow-x-auto">
          <table
            ref={tableRef}
            className="table bordered-table mb-0 w-full border border-gray-300 dark:border-gray-700 rounded-lg display overflow-x-auto"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th>ID</th>
                <th>Action</th>
                <th>Sponsor</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>My Package</th>
                <th>My Rank</th>
                <th>User Address</th>
                <th>Join Date</th>
                <th>Active Status</th>
                <th>Block Status</th>
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
              ) : updatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="text-center py-4 text-gray-600 dark:text-gray-300"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                updatedUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {index + 1}
                    </td>
                    <td className="flex gap-2 ">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        Login
                      </button>
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.uSponsor?.username
                        ? user.uSponsor.name
                          ? `${user.uSponsor.username} (${user.uSponsor.name})`
                          : user.uSponsor.username
                        : 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.name || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.username || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.email || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.mobile || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.package || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.myRank || 'N/A'}
                    </td>

                    <td className="!text-gray-800 dark:!text-gray-300">
                      {user.walletAddress || 'N/A'}
                    </td>
                    <td className="!text-gray-800 dark:!text-gray-300">
                      {formatDate(user.createdAt)}
                    </td>
                    <td
                      className={`!font-semibold 
                      ${
                        user.accountStatus.activeStatus == 1
                          ? '!text-green-600 dark:!text-green-400'
                          : '!text-red-600 dark:!text-red-400'
                      }`}
                    >
                      {user.accountStatus.activeStatus == 1
                        ? 'Active'
                        : 'Inactive'}
                    </td>
                    <td
                      className={`!font-semibold 
      ${
        user.isBlocked
          ? '!text-red-500 !dark:text-red-400'
          : '!text-green-600 !dark:text-green-400'
      }`}
                    >
                      {user.isBlocked ? 'Blocked' : 'Unblocked'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
