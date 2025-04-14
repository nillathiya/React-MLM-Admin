import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAllOrdersAsync } from '../../features/order/orderSlice';
import { getAllUserAsync } from '../../features/user/userSlice';
import { INCOME_FIELDS } from '../../constants';

// Define type for INCOME_FIELDS keys
type IncomeFieldKey = keyof typeof INCOME_FIELDS;

// Define interface for transactions
interface Transaction {
  amount: number;
  source: IncomeFieldKey | string; // Allow string for unknown sources, but prefer IncomeFieldKey
  [key: string]: any; // Allow additional fields
}

// Define interface for income data
interface IncomeData {
  totalIncome: number;
  [key: string]: number; // Allow dynamic keys based on INCOME_FIELDS
}

const Cards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companyInfo } = useSelector((state: RootState) => state.settings);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { users } = useSelector((state: RootState) => state.user);
  const { incomeTransactions } = useSelector(
    (state: RootState) => state.transaction,
  );
  const { currentUser: loggedInUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [isLoading, setIsLoading] = useState(true);

  const companyCurrency =
    companyInfo.find((data) => data.label === 'currency')?.value || '$';

  // Define investment cards configuration
  const investmentCards = useMemo(
    () => [
      {
        label: 'Total',
        gradient:
          'from-blue-500 to-indigo-500 dark:from-gray-900 dark:to-gray-800',
        calculate: (updatedUsers: any[]) =>
          updatedUsers.reduce((acc, user) => acc + (user.package || 0), 0),
      },
      {
        label: 'Today',
        gradient:
          'from-green-400 to-emerald-500 dark:from-gray-800 dark:to-gray-700',
        calculate: (updatedUsers: any[]) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return updatedUsers.reduce((acc, user) => {
            return (
              acc +
              orders
                .filter(
                  (order) =>
                    new Date(order.createdAt).setHours(0, 0, 0, 0) ===
                      today.getTime() && order.customerId?._id === user._id,
                )
                .reduce((sum, order) => sum + (order.bv || 0), 0)
            );
          }, 0);
        },
      },
      {
        label: 'Yesterday',
        gradient:
          'from-red-400 to-orange-500 dark:from-gray-700 dark:to-gray-600',
        calculate: (updatedUsers: any[]) => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday.setHours(0, 0, 0, 0);
          return updatedUsers.reduce((acc, user) => {
            return (
              acc +
              orders
                .filter(
                  (order) =>
                    new Date(order.createdAt).setHours(0, 0, 0, 0) ===
                      yesterday.getTime() && order.customerId?._id === user._id,
                )
                .reduce((sum, order) => sum + (order.bv || 0), 0)
            );
          }, 0);
        },
      },
    ],
    [orders],
  );

  // Compute updated users with package data
  const updatedUsers = useMemo(() => {
    if (!orders.length || !users.length) return [];
    return users.map((user) => ({
      ...user,
      package: orders
        .filter((order) => order.customerId?._id === user._id)
        .reduce((acc, order) => acc + (order.bv || 0), 0),
    }));
  }, [users, orders]);

  // Compute income data dynamically based on INCOME_FIELDS
  const incomeData = useMemo(() => {
    const initialData: IncomeData = {
      totalIncome: 0,
      ...Object.keys(INCOME_FIELDS).reduce(
        (acc, key) => {
          acc[key] = 0;
          return acc;
        },
        {} as { [key: string]: number },
      ),
    };

    if (!incomeTransactions.length) return initialData;

    return incomeTransactions.reduce((acc: IncomeData, tx: Transaction) => {
      const amount = tx.amount || 0;
      acc.totalIncome += amount;
      if (tx.source in INCOME_FIELDS) {
        acc[tx.source] = (acc[tx.source] || 0) + amount;
      }
      return acc;
    }, initialData);
  }, [incomeTransactions]);

  // Fetch data
  useEffect(() => {
    if (!loggedInUser?._id) return;

    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiCalls = [];
        if (!orders.length)
          apiCalls.push(dispatch(getAllOrdersAsync()).unwrap());
        if (!users.length) apiCalls.push(dispatch(getAllUserAsync()).unwrap());

        if (apiCalls.length > 0) {
          await Promise.all(apiCalls);
        }
      } catch (error: any) {
        console.error('Fetch error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [loggedInUser, orders.length, users.length, dispatch]);

  // Filter income fields to show only non-zero values (except totalIncome)
  const visibleIncomeFields = useMemo(() => {
    const fields = [
      { key: 'totalIncome', label: 'Total Income', highlight: true },
    ];
    Object.entries(INCOME_FIELDS).forEach(([key, label]) => {
      if (incomeData[key] > 0) {
        fields.push({ key, label, highlight: false });
      }
    });
    return fields;
  }, [incomeData]);

  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      {/* Investment Section */}
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-6 text-center">
          Investment
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentCards.map(({ label, gradient, calculate }, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-lg shadow p-5 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-105 bg-gradient-to-r ${gradient}`}
            >
              <h4 className="text-base font-medium text-white dark:text-gray-300 mb-2">
                {label}
              </h4>
              <strong className="text-lg text-white dark:text-gray-300">
                {isLoading
                  ? '...'
                  : `${companyCurrency}${calculate(updatedUsers).toFixed(2)}`}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Income Report Section */}
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-6 text-center">
          Income Report
        </h3>
        <div className="space-y-4">
          {visibleIncomeFields.length === 1 && incomeData.totalIncome === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No income data available
            </div>
          ) : (
            visibleIncomeFields.map(({ key, label, highlight }) => (
              <div
                key={key}
                className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
                  highlight
                    ? 'bg-[#fca5a5] dark:bg-[#1a222c] text-white font-semibold'
                    : 'bg-gray-100 dark:bg-[#1a222c]'
                }`}
              >
                <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  {label}
                </span>
                <strong className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">
                  {isLoading
                    ? '...'
                    : `${companyCurrency}${(incomeData[key] || 0).toFixed(2)}`}
                </strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
