import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../../src/pages/Order/order.css';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-select-dt';
// import 'datatables.net-responsive-dt';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { DEFAULT_PER_PAGE_ITEMS } from '../../constants';
import { formatDate } from '../../utils/dateUtils';
import { getAllOrdersAsync } from '../../features/order/orderSlice';

const Order: React.FC = () => {
  const { orders, isLoading } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (orders.length === 0) {
          await dispatch(getAllOrdersAsync()).unwrap();
        }
      } catch (error: any) {
        toast.error(error?.message || 'Server error');
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (tableRef.current && !isLoading && orders.length > 0) {
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
  }, [orders]);

  const groupOrdersByCustomer = (orders: any) => {
    const groupedOrders = orders.reduce((acc: any, order: any) => {
      const username = order.customerId?.username || 'Guest'; // Handle null customerId
      if (!acc[username]) {
        acc[username] = { ...order, amount: order.amount };
      } else {
        acc[username].amount += order.amount;
      }
      return acc;
    }, {});

    return Object.values(groupedOrders);
  };

  const groupedOrders = groupOrdersByCustomer(orders);

  const handleView = (id: string) => {
    navigate(`/order/OrderView?id=${id}`);
  };
  return (
    <div>
      <Breadcrumb pageName="All Orders" />
      <div className="table-bg">
        <div className="card-body overflow-x-auto">
          <table
            ref={tableRef}
            className="table bordered-table mb-0 w-full border border-gray-300 dark:border-gray-700 rounded-lg display overflow-x-auto"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <th>S No.</th>
                <th>Action</th>
                <th>USER</th>
                <th>Order Amount ($)</th>
                <th>Payment Status</th>
                <th>Date</th>
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
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="text-center py-4 text-gray-600 dark:text-gray-300"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                groupedOrders.map((order: any, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={() => handleView(order._id)}
                      >
                        View
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        Print All
                      </button>
                    </td>

                    <td>
                      {order.customerId?.username
                        ? order.customerId.name
                          ? `${order.customerId.username} (${order.customerId.name})`
                          : order.customerId.username
                        : 'N/A'}
                    </td>
                    <td>${order.amount || 'N/A'}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        order.status === 0
                          ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300'
                      } rounded-md`}
                    >
                      {order.status === 0 ? 'Pending' : 'Confirmed'}
                    </td>

                    <td>{formatDate(order.createdAt)}</td>
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

export default Order;
