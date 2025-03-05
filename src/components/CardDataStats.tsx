import React, { ReactNode } from 'react';
import Skeleton from './ui/Skeleton/Skeleton';

interface CardDataStatsProps {
  title: string;
  total: number;
  children: ReactNode;
  isLoading: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
  isLoading,
}) => {
  return (
    <div className="flex items-center justify-between rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {total}
            </h4>
          )}

          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
    </div>
  );
};

export default CardDataStats;
