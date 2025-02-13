import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
// import {
//   selectTotalWithdrawals,
//   getTotalWithdrawalsAsync,
//   selectLoading as selectTransactionLoading,
// } from '../../features/transaction/transactionSlice';
// import {
//   selectTotalRewardPay,
//   selectTotalRewards,
//   getTotalRewardPayAsync,
//   getTotalRewardsAsync,
//   selectLoading as selectTotalRewardPayLoading,
// } from '../../features/block-rewards/blockRewardsSlice';

interface Card {
  title: string;
  value: string;
  color: string;
  icon: string;
}

const DashboardCards: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const totalWithdrawals = useSelector(selectTotalWithdrawals);
  // const totalRewardPay = useSelector(selectTotalRewardPay);
  // const totalRewards = useSelector(selectTotalRewards);
  // const transactionLoading = useSelector(selectTransactionLoading);
  // const totalRewardPayLoading = useSelector(selectTotalRewardPayLoading);

  // useEffect(() => {
  //   if (totalWithdrawals === null) {
  //     dispatch(getTotalWithdrawalsAsync());
  //   }
  //   if (totalRewardPay === null) {
  //     dispatch(getTotalRewardPayAsync());
  //   }
  //   if (totalRewards === null) {
  //     dispatch(getTotalRewardsAsync());
  //   }
  // }, [dispatch, totalWithdrawals]);

  const formatNumber = (num: number | null) => {
    return num === null ? 'Loading...' : num.toFixed(10);
  };

  const cards: Card[] = [
    {
      title: 'Withdrawal',
      value:"0",
      // value: transactionLoading ? 'Loading...' : formatNumber(totalWithdrawals || 0),
      color: 'bg-blue-400',
      icon: '💵',
    },
    {
      title: 'Rewards',
      value:"0",

      // value: totalRewardPayLoading ? 'Loading...' : formatNumber(totalRewards),
      color: 'bg-red-400',
      icon: '🏆',
    },
    {
      title: 'Payouts',
      value:"0",

      // value: totalRewardPayLoading ? 'Loading...' : formatNumber(totalRewardPay || 0),
      color: 'bg-blue-400',
      icon: '💰',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-black rounded-md shadow-md p-4 flex flex-col items-center`}
        >
          <div className="text-3xl mb-2">{card.icon}</div>
          <h3 className="text-xl font-bold mb-1">{card.title}</h3>
          <hr className="w-50 border-black mb-2" />
          <p className="text-sm">(Coin Wise)</p>
          <p className="text-lg font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
