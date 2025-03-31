import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchWithdrawals } from '../../features/withdrawal/withdrawalSlice';
import { FundTransaction } from '../../types';

interface Card {
  title: string;
  value: string;
  color: string;
  icon: string;
  status: string;
}

const DashboardCards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [hasFetched, setHasFetched] = useState(false); // Track if we've attempted to fetch

  const { withdrawals, isLoading } = useSelector(
    (state: RootState) => state.withdrawal,
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      // Skip if already fetched, currently loading, or data exists
      if (hasFetched || isLoading || withdrawals.length > 0) return;

      try {
        await dispatch(fetchWithdrawals()).unwrap();
        if (isMounted) setHasFetched(true); // Mark as fetched on success
      } catch (error: any) {
        console.error('Failed to fetch withdrawals:', error); // Log for debugging
        if (isMounted) setHasFetched(true); // Still mark as fetched to prevent retries
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]); // Stable dependencies

  // Memoize withdrawal counts, default to 0 if no data
  const withdrawalCounts = React.useMemo(
    () => ({
      pending:
        withdrawals.length > 0
          ? withdrawals.filter((w: FundTransaction) => w.status === 0).length
          : 0,
      approved:
        withdrawals.length > 0
          ? withdrawals.filter((w: FundTransaction) => w.status === 1).length
          : 0,
      rejected:
        withdrawals.length > 0
          ? withdrawals.filter((w: FundTransaction) => w.status === 2).length
          : 0,
    }),
    [withdrawals],
  );

  const cards: Card[] = [
    {
      title: 'Withdrawal',
      value: withdrawalCounts.approved.toString(),
      color: 'bg-blue-200',
      icon: '💵',
      status: 'Approved',
    },
    {
      title: 'Withdrawal',
      value: withdrawalCounts.pending.toString(),
      color: 'bg-red-300',
      icon: '💵',
      status: 'Pending',
    },
    {
      title: 'Withdrawal',
      value: withdrawalCounts.rejected.toString(),
      color: 'bg-blue-200',
      icon: '💵',
      status: 'Rejected',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {isLoading && !hasFetched ? (
        <div className="col-span-3 text-center">Loading withdrawals...</div>
      ) : (
        cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} text-black dark:bg-[#24303f] dark:text-gray-300 rounded-md shadow-md p-4 flex flex-col items-center transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105`}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <h3 className="text-xl font-bold mb-1">{card.title}</h3>
            <hr className="w-50 border-black mb-2 dark:border-gray-300" />
            <p className="text-sm">{card.status}</p>
            <p className="text-lg font-semibold">{card.value}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardCards;
