import React, { useEffect, useRef } from 'react';
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
      const table = $(tableRef.current).DataTable({
        paging: true,
        ordering: true,
        info: true,
        responsive: true,
        searching: true,
        pageLength: DEFAULT_PER_PAGE_ITEMS,
        // select: true as any,
        // destroy: true, // Ensure it gets destroyed before reinitialization
      });

      return () => {
        table.destroy(); // Cleanup DataTable when unmounting
      };
    }
  }, [users]);
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/users/edituser/${id}`); // Pass ID as a URL param
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
                <th>Sponsor</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="text-center py-4 text-gray-600 dark:text-gray-300"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => handleEdit(123)}
                      >
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        Login
                      </button>
                    </td>

                    <td>{user.name || 'N/A'}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.mobile || 'N/A'}</td>
                    <td>{user.package || 'N/A'}</td>
                    <td>{user.myRank || 'N/A'}</td>
                    <td>{user.walletAddress || 'N/A'}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      {user.accountStatus.activeStatus == 1
                        ? 'Active'
                        : 'Inactive'}
                    </td>
                    <td>{user.isBlocked ? 'Blocked' : 'Unblocked'}</td>
                    <td>
                      {user.uSponsor?.username
                        ? user.uSponsor.name
                          ? `${user.uSponsor.username} (${user.uSponsor.name})`
                          : user.uSponsor.username
                        : 'N/A'}
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
