import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { fetchWithdrawals } from '../../features/withdrawal/withdrawalSlice';
import { AppDispatch, RootState } from '../../store/store';

const ViewWithdrawal: React.FC = () => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const withdrawals = useSelector((state: RootState) => state.withdrawals.data);

  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, [dispatch]);

  const handleAction = (status: number) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <Breadcrumb pageName="Edit Withdrawal" />
      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 flex justify-center">
            <div className="shadow-md rounded-lg p-6 w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h5 className="text-lg font-semibold mb-4">Withdrawal Details</h5>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : withdrawals.length > 0 ? (
                      withdrawals.map((withdrawal: any, index: number) => (
                        <React.Fragment key={index}>
                          {[
                            ['User', withdrawal.name || 'N/A'],
                            ['Amount', `$${withdrawal.amount}`],
                            [
                              'Account Details',
                              withdrawal.accountDetails || 'N/A',
                            ],
                            ['Date', withdrawal.createdAt],
                          ].map(([label, value], idx) => (
                            <tr key={idx} className="border-b">
                              <th className="text-left px-4 py-2 font-medium w-1/3">
                                {label}
                              </th>
                              <td className="px-4 py-2">:</td>
                              <td className="px-4 py-2">{value}</td>
                            </tr>
                          ))}
                          <tr>
                            <th className="text-left px-4 py-2 font-medium">
                              Status
                            </th>
                            <td className="px-4 py-2">:</td>
                            <td className="px-4 py-2">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                  withdrawal.status === 'Pending'
                                    ? 'bg-orange-500'
                                    : 'bg-green-500'
                                }`}
                              >
                                {withdrawal.status}
                              </span>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="shadow-md rounded-lg p-6 w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4">
                <label htmlFor="reason" className="block font-medium mb-1">
                  Reason (Give Reason on cancellation)
                </label>
                <textarea
                  id="reason"
                  className="w-full rounded border border-stroke bg-white py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter cancellation reason..."
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                  onClick={() => handleAction(1)}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Approve'}
                </button>
                <button
                  type="button"
                  className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
                  onClick={() => handleAction(2)}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWithdrawal;
