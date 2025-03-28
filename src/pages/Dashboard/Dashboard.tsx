import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../../store/store';
import { getAllOrdersAsync } from '../../features/order/orderSlice';
import { getAllUserAsync } from '../../features/user/userSlice';
import { getAllIncomeTransactionAsync } from '../../features/transaction/transactionSlice';
import { getAllCompanyInfoAsync } from '../../features/settings/settingsSlice';
import CardDataStats from '../../components/CardDataStats';
import DashboardCards from '../../components/Tables/DashboardCards';
import CustomerList from './CustomerList';
import Cards from './Cards';
import './DashboardCard.css';
import {
  ApiResponse,
  Order,
  User,
  IncomeTransaction,
  ICompanyInfo,
} from '../../types';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const { companyInfo } = useSelector((state: RootState) => state.settings);
  const { orders } = useSelector((state: RootState) => state.orders);
  const { users } = useSelector((state: RootState) => state.user);
  const { incomeTransactions } = useSelector(
    (state: RootState) => state.transaction,
  );
  const { currentUser: loggedInUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [incomeData, setIncomeData] = useState({
    totalIncome: 0,
    stakingReward: 0,
    profitSharingReward: 0,
    royaltyReward: 0,
    arbBonusReward: 0,
  });

  const companyCurrency = companyInfo.find((data) => data.label === 'currency')
    ?.value;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (hasFetched || !loggedInUser?._id) return;

      try {
        setIsLoading(true);
        // Explicitly type the apiCalls array
        const apiCalls: Promise<
          ApiResponse<Order[] | User[] | ICompanyInfo[] | IncomeTransaction[]>
        >[] = [];

        if (orders.length === 0) {
          apiCalls.push(dispatch(getAllOrdersAsync()).unwrap());
        }
        if (users.length === 0) {
          apiCalls.push(dispatch(getAllUserAsync()).unwrap());
        }
        if (companyInfo.length === 0) {
          apiCalls.push(dispatch(getAllCompanyInfoAsync()).unwrap());
        }
        if (incomeTransactions.length === 0) {
          apiCalls.push(
            dispatch(getAllIncomeTransactionAsync({ txType: 'all' })).unwrap(),
          );
          apiCalls.push(
            dispatch(
              getAllIncomeTransactionAsync({ txType: 'income' }),
            ).unwrap(),
          );
        }

        if (apiCalls.length === 0) {
          setIsLoading(false);
          return;
        }

        const responses = await Promise.allSettled(apiCalls);
        let errorOccurred = false;

        responses.forEach((result, index) => {
          if (result.status === 'rejected') {
            errorOccurred = true;
            console.error(`API call ${index} failed:`, result.reason);
            setErrorCount((prev) => prev + 1);
          }
        });

        const incomeResponse = responses.find(
          (r, i) =>
            apiCalls[i] ===
            dispatch(
              getAllIncomeTransactionAsync({ txType: 'income' }),
            ).unwrap(),
        ) as PromiseSettledResult<ApiResponse<IncomeTransaction[]>> | undefined;

        if (incomeResponse?.status === 'fulfilled') {
          const transactions = incomeResponse.value?.data ?? [];
          let total = 0,
            staking = 0,
            profitSharing = 0,
            royalty = 0,
            arbBonus = 0;

          transactions.forEach((tx: IncomeTransaction) => {
            total += tx.amount || 0;
            if (tx.source === 'reward') staking += tx.amount || 0;
            if (tx.source === 'direct') profitSharing += tx.amount || 0;
            if (tx.source === 'roi') royalty += tx.amount || 0;
            if (tx.source === 'royalty') arbBonus += tx.amount || 0;
          });

          setIncomeData({
            totalIncome: total,
            stakingReward: staking,
            profitSharingReward: profitSharing,
            royaltyReward: royalty,
            arbBonusReward: arbBonus,
          });
        }

        if (errorOccurred && errorCount < 2) {
          toast.error('Some data couldn’t be loaded. Please try refreshing.');
        }
      } catch (error: any) {
        console.error('Fetch error:', error);
        if (errorCount < 2) {
          toast.error('An error occurred while loading data.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setHasFetched(true);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [loggedInUser, dispatch]);

  const activeUserCount = users.reduce(
    (acc, user) => (user.accountStatus?.activeStatus === 1 ? acc + 1 : acc),
    0,
  );
  const totalIncome = incomeTransactions.reduce(
    (acc, tx) => (tx.txType === 'income' ? acc + (tx.amount || 0) : acc),
    0,
  );
  const totalIncomeTransactionCharge = incomeTransactions.reduce(
    (acc, tx) => (tx.txType === 'income' ? acc + (tx.txCharge || 0) : acc),
    0,
  );
  const totalInvestment = orders.reduce(
    (acc, order) => (order.status === 1 ? acc + (order.bv || 0) : acc),
    0,
  );

  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Users"
          total={users.length || 0}
          isLoading={isLoading}
          bgGradient="bg-gradient-to-r from-blue-300 to-purple-300 dark:from-gray-800 dark:to-gray-800 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          <svg
            className="fill-gray dark:fill-white"
            width="26"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M4 20C4 16.6863 7.13401 14 12 14C16.866 14 20 16.6863 20 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Active"
          total={activeUserCount || 0}
          isLoading={isLoading}
          bgGradient="bg-gradient-to-r from-green-300 to-teal-300 dark:from-gray-800 dark:to-gray-800 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl"
        >
          <svg
            className="fill-gray dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 12L11 15L16 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Investment"
          total={totalInvestment || 0}
          isLoading={isLoading}
          bgGradient="bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-gray-800 dark:to-gray-800 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl"
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 20V10M10 20V4M16 20V14M22 20H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="17"
              cy="6"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M15.5 6.5L17 8L20 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Total Income"
          total={totalIncome || 0}
          isLoading={isLoading}
          bgGradient="bg-gradient-to-r from-green-300 to-blue-300 dark:from-gray-800 dark:to-gray-800 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl"
        >
          <svg
            className="fill-gray dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 7V17M9 10H15M9 14H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>

        <CardDataStats
          title="Income Charge"
          total={totalIncomeTransactionCharge || 0}
          isLoading={isLoading}
          bgGradient="bg-gradient-to-r from-purple-400 to-pink-400 dark:from-gray-800 dark:to-gray-800 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl"
        >
          <svg
            className="fill-gray dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 7V17M9 10H15M9 14H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6L12 2L8 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardDataStats>
      </div>

      <DashboardCards />
      <Cards />
      <CustomerList />
    </>
  );
};

export default Dashboard;
