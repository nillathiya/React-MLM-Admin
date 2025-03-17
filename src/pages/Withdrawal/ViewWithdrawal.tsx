import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  fetchWithdrawals,
  updateWithdrawalRequestAsync,
} from '../../features/withdrawal/withdrawalSlice';
import { AppDispatch, RootState } from '../../store/store';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

const ViewWithdrawal: React.FC = () => {
  const [reason, setReason] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { withdrawals, isLoading } = useSelector(
    (state: RootState) => state.withdrawal,
  );
  const { id: withdrawalId } = useParams();
  const [isWithdrawalUpdating, setIsWithdrawalUpdating] = useState<{
    label: string;
    value: boolean;
  }>({
    label: '',
    value: false,
  });
  const { companyInfo } = useSelector((state: RootState) => state.settings);
  useEffect(() => {
    const fetchAllWithdrawals = async () => {
      try {
        await dispatch(fetchWithdrawals()).unwrap();
      } catch (error: any) {
        toast.error(error || 'Server error');
      }
    };
    if (withdrawals.length === 0) {
      fetchAllWithdrawals();
    }
  }, [dispatch]);

  const withdrawal = withdrawals.find(
    (withdrawal: any) => withdrawal._id === withdrawalId,
  );
  // console.log("withdrawal",withdrawal);
  const handleAction = async (status: number) => {
    setIsWithdrawalUpdating({
      label: status === 1 ? 'approved' : 'cancelled',
      value: true,
    });

    try {
      const formData = {
        id: withdrawalId,
        status: status,
        reason: reason,
      };
      await dispatch(updateWithdrawalRequestAsync(formData)).unwrap();
      toast.success('Withdrawal updated successfully.');
    } catch (error: any) {
      toast.error(error || 'Server error');
    } finally {
      setIsWithdrawalUpdating({
        label: status === 1 ? 'approved' : 'cancelled',
        value: false,
      });
    }
  };

  const companyCurrency = companyInfo.find((data) => data.label === 'currency')
    ?.value;

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
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : withdrawals !== null && withdrawal !== undefined ? (
                      <React.Fragment>
                        {[
                          [
                            'User',
                            withdrawal.uCode?.username
                              ? `${withdrawal.uCode?.username}${
                                  withdrawal.uCode?.name
                                    ? ` (${withdrawal.uCode?.name})`
                                    : ''
                                }`
                              : 'N/A',
                          ],
                          ['Amount', `${companyCurrency}${withdrawal.amount}`],
                          [
                            'Tx Charge',
                            `${companyCurrency}${withdrawal.txCharge}`,
                          ],
                          ['wPool', `${companyCurrency}${withdrawal.wPool}`],
                          ['Date', formatDate(withdrawal.createdAt)],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b">
                            <th className="text-left px-4 py-2 font-medium w-1/3">
                              {label}
                            </th>
                            <td className="px-4 py-2">:</td>
                            <td className="px-4 py-2">{value}</td>
                          </tr>
                        ))}
                        <tr className="border-b">
                          <th className="text-left px-4 py-2 font-medium">
                            Status
                          </th>
                          <td className="px-4 py-2">:</td>
                          <td className="px-4 py-2">
                            {(() => {
                              let label = 'Cancelled';
                              let bgColor = 'bg-red-500';
                              if (withdrawal.status === 0) {
                                label = 'Pending';
                                bgColor = 'bg-orange-500';
                              } else if (withdrawal.status === 1) {
                                label = 'Approved';
                                bgColor = 'bg-green-500';
                              }

                              return (
                                <span
                                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${bgColor}`}
                                >
                                  {label}
                                </span>
                              );
                            })()}
                          </td>
                        </tr>
                        {withdrawal.status === 2 && (
                          <tr>
                            <th className="text-left px-4 py-2 font-medium">
                              Reason
                            </th>
                            <td className="px-4 py-2">:</td>
                            <td className="px-4 py-2">
                              {withdrawal.Reason || 'N/A'}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
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
                  className="w-1/2 bg-green-500 text-white px-1 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-center"
                  onClick={() => handleAction(1)}
                  disabled={
                    isWithdrawalUpdating.label === 'approved' &&
                    isWithdrawalUpdating.value === true
                  }
                >
                  {isWithdrawalUpdating.label === 'approved' &&
                  isWithdrawalUpdating.value === true
                    ? 'Updating...'
                    : 'Approve'}
                </button>
                <button
                  type="button"
                  className="w-1/2 bg-red-500 text-white px-1 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 text-center"
                  onClick={() => handleAction(2)}
                  disabled={
                    isWithdrawalUpdating.label === 'cancelled' &&
                    isWithdrawalUpdating.value === true
                  }
                >
                  {isWithdrawalUpdating.label === 'cancelled' &&
                  isWithdrawalUpdating.value === true
                    ? 'Updating...'
                    : 'Cancel'}
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
