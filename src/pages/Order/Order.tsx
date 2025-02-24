import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import '../../../src/pages/Order/order.css';
import { useNavigate } from 'react-router-dom';

const Order: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOrders([
      {
        _id: '1',
        userId: 'U001',
        userName: 'John Doe',
        orderId: '1',
        amount: 150.0,
        paymentStatus: 'Success',
        date: '2024-02-19',
      },
    ]);
  }, []);
  const handleView = (id: string) => {
    navigate(`/order/OrderView?id=${id}`);
  };
  return (
    <div>
      <Breadcrumb pageName="Orders" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  S No.
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  Action
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  USERID (NAME)
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  Order Id
                </th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  Order Amount ($)
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  Payment Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {index + 1}
                    </td>
                    <td
                      className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <button
                        className="ViewButton"
                        onClick={() => handleView(order._id)}
                      >
                        View
                      </button>
                      <button className="ViewButton">Print All</button>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {order.userId} ({order.userName})
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {order.orderId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {order.paymentStatus}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {order.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
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

export default Order;
