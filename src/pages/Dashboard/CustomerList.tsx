import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const NewCustomerList: React.FC = () => {
  const navigate = useNavigate();

  const customers = [
    {
      id: 1,
      name: 'Dianne Russell',
      email: 'osgoodwy@gmail.com',
      username: 'ARB163827',
      date: '24 Jun 2024',
    },
    {
      id: 2,
      name: 'Wade Warren',
      email: 'redaniel@gmail.com',
      username: 'ARB750293',
      date: '24 Jun 2024',
    },
    {
      id: 3,
      name: 'Albert Flores',
      email: 'seema@gmail.com',
      username: 'ARB378296',
      date: '24 Jun 2024',
    },
    {
      id: 4,
      name: 'Bessie Cooper',
      email: 'hamli@gmail.com',
      username: 'ARB438915',
      date: '24 Jun 2024',
    },
  ];

  return (
    <div className="card new-customer-card mt-6" style={{ padding: '0px' }}>
      <div
        className=" bg-white card-header d-flex align-items-center justify-content-between mb-2 dark:bg-[#24303f] "
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '-6px',
          borderBottom: '1px solid lightgray',
        }}
      >
        <h6 className="fw-bold new-customerList">New Customer List</h6>
        <Link to="/users/all-users" className="customer-list">
          View All
        </Link>
      </div>
      <div className="card-body dark:bg-boxdark" style={{ padding: '10px' }}>
        <div
          className="table-responsive dark:border-strokedark dark:bg-boxdark"
          style={{ padding: '10px' }}
        >
          <table className="table table-striped dark:border-strokedark dark:bg-boxdark dark:text-gray-300">
            <thead>
              <tr className="bg-white text-gray-600 dark:bg-[#1a222c] dark:text-gray-300 ">
                <th>Sr no.</th>
                <th className="text-center">Name</th>
                <th className="text-center">Username</th>
                <th className="text-center">Email</th>
                <th className="text-center">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <td className="text-center">{customer.id}</td>
                  <td>{customer.name}</td>
                  <td className="text-center">{customer.username}</td>
                  <td className="text-center">{customer.email}</td>
                  <td className="text-center">{customer.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerList;
