import React, { useState } from 'react';
import './order.css'; // Import CSS file
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const OrderView = () => {
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [orderStatus, setOrderStatus] = useState('Pending');

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(`Payment Status: ${paymentStatus}, Order Status: ${orderStatus}`);
  };

  return (
    <>
      <Breadcrumb pageName="Order Details" />
      <div className="container">
        <div className="order-layout">
          <div className="order-main">
            <div className="card">
              <h2 style={{ fontSize: '20px' }}>Order Detail</h2>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>User</th>
                    <td>ARB513209</td>
                  </tr>
                  <tr>
                    <th>Amount</th>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>2025-02-06 10:25:06</td>
                  </tr>
                  <tr>
                    <th>Shipping Address</th>
                    <td>
                      <div className="address-box">Address content here</div>
                    </td>
                  </tr>
                  <tr>
                    <th>Order ID</th>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>
                      <span className={`badge ${paymentStatus.toLowerCase()}`}>
                        {paymentStatus}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>
                      <span className={`badge ${orderStatus.toLowerCase()}`}>
                        {orderStatus}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Order BV</th>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
            </div>
          </div>

          <div className="order-update">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderView;
