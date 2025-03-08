import React from 'react';

const Cards: React.FC = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <div className="bg-white dark:bg-boxdark dark:border-strokedark border border-gray-200 rounded-lg shadow-md p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-6 text-center">
          Investment
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col items-center bg-gray-100 dark:bg-[#1a222c] rounded-lg shadow p-4 md:p-5 w-full">
            <h4 className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Total
            </h4>
            <strong className="text-lg md:text-base text-gray-600 dark:text-gray-300">
              $120,700
            </strong>
          </div>

          <div className="flex flex-col items-center bg-gray-100 dark:bg-[#1a222c] rounded-lg shadow p-4 md:p-5 w-full">
            <h4 className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Today
            </h4>
            <strong className="text-lg md:text-base text-gray-600 dark:text-gray-300">
              $0
            </strong>
          </div>

          <div className="flex flex-col items-center bg-gray-100 dark:bg-[#1a222c] rounded-lg shadow p-4 md:p-5 w-full">
            <h4 className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Yesterday
            </h4>
            <strong className="text-lg md:text-base text-gray-600 dark:text-gray-300">
              $0
            </strong>
          </div>
        </div>
      </div>

      <div className="cards income-card dark:border-strokedark dark:bg-boxdark">
        <h3 className="card-title">Income Report</h3>

        <div className="card-content">
          <p className="highlight dark:bg-[#1a222c]">
            <span>Total Income</span> <strong>5531</strong>
          </p>

          <p>
            <span>Staking Reward</span> <strong>4423</strong>
          </p>

          <p>
            <span>Profit Sharing Reward</span> <strong>808</strong>
          </p>

          <p>
            <span>Royalty Reward</span> <strong>300</strong>
          </p>

          <p>
            <span>ARB Bonus Reward</span> <strong>0</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
