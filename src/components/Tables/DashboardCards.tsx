import React from 'react';

interface Card {
  title: string;
  value: string;
  color: string;
  icon: string;
  status: string;
}

const DashboardCards: React.FC = () => {
  const cards: Card[] = [
    {
      title: 'Withdrawal',
      value: '0',
      color: 'bg-blue-200',
      icon: '💵',
      status: 'Approved',
    },
    {
      title: 'Withdrawal',
      value: '0',
      color: 'bg-red-300',
      icon: '💵',
      status: 'Pending',
    },
    {
      title: 'Withdrawal',
      value: '0',
      color: 'bg-blue-200',
      icon: '💵',
      status: 'Rejected',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-black dark:bg-[#24303f] dark:text-gray-300 rounded-md shadow-md p-4 flex flex-col items-center`}
        >
          <div className="text-3xl mb-2">{card.icon}</div>
          <h3 className="text-xl font-bold mb-1">{card.title}</h3>
          <hr className="w-50 border-black mb-2 dark:border-gray-300" />
          <p className="text-sm">{card.status}</p>
          <p className="text-lg font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
