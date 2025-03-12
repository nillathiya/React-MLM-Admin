import React, { useEffect, useState } from 'react';
import './order.css'; // Import CSS file
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { IoEllipseSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { getOrderByIdAsync } from '../../features/order/orderSlice';
import { Order } from '../../types';
import { formatDate } from '../../utils/dateUtils';

const OrderView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('id');

  const { orders, order } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (!orderId) return;

    const existingOrder = orders.find((o) => o._id === orderId);
    if (!existingOrder) {
      dispatch(getOrderByIdAsync(orderId))
        .unwrap()
        .catch((error: any) => {
          toast.error(error || 'Server error');
        });
    }
  }, [orderId, orders, dispatch]);

  const selectedOrder: Order = orders.find((o) => o._id === orderId) || order;

  return (
    <>
      <Breadcrumb pageName="Order Details" />
      <div className="container">
        <div className="order-layout">
          <div className="order-main">
            <div className="card dark:bg-form-strokedark dark:text-white">
              <h2 style={{ fontSize: '20px' }}>Order Detail</h2>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>User</th>
                    <td>{selectedOrder.customerId?.username || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Amount</th>
                    <td>${selectedOrder.amount || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>
                      {selectedOrder.status == 0 ? 'Pending' : 'Confirmed'}
                    </td>
                  </tr>
                  <tr>
                    <th>Order BV</th>
                    <td>{selectedOrder.bv || 0}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{formatDate(selectedOrder.createdAt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <div className="card rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <h2 style={{ fontSize: '20px' }}>Order Products</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S no.</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Qty</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>P001</td>
                      <td>Wireless Headphones</td>
                      <td>2</td>
                      <td>
                        <button className="details-btn">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>

          {/* <div className="order-update">
            <div className="card rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
                Update Order
              </h2>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    style={{ padding: '10px' }}
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Order Status</label>
                  <select
                    style={{ padding: '10px' }}
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Dispatched">Dispatched</option>
                  </select>
                </div>

                <button
                  style={{ padding: '10px', backgroundColor: '#e6e6e6' }}
                  type="submit"
                >
                  SAVE
                </button>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default OrderView;
