// src/pages/admin/Cron.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Icon from '../../components/Icons/Icon';
import { API_URL, ICONS } from '../../constants';
import { apiClient } from '../../api/apiClient';

const Cron = () => {
  const [loading, setLoading] = useState({
    roi: false,
    reward: false,
    weekly: false,
    monthly: false,
    resetWeekMonth: false,
    dailyDirect: false
  });

  const handleRunCron = async (type: 'roi' | 'reward' | 'weekly' | 'monthly' | 'resetWeekMonth' | 'dailyDirect') => {
    const urls: Record<string, string> = {
      roi: `${API_URL}/api/income/roi`,
      reward: `${API_URL}/api/income/reward`,
      weekly: `${API_URL}/api/income/weekly`,
      monthly: `${API_URL}/api/income/monthly`,
      resetWeekMonth: `${API_URL}/api/income/resetWeekMonth`,
      dailyDirect: `${API_URL}/api/income/dailyDirect`,
    };

    setLoading((prev) => ({ ...prev, [type]: true }));

    try {
        const response = await apiClient.post(urls[type], {
          method: 'POST',
        });
    
        if (!response) {
          const errorText = await response;
          throw new Error(errorText || 'Failed to run cron');
        }
    
        const result = await response;
        toast.success(`${type.toUpperCase()} Cron Executed: ${result.data.message || 'Success'}`);
      } catch (error: any) {
        toast.error(`${type.toUpperCase()} Cron Failed: ${error.message}`);
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
  };

  return (
    <div>
      <Breadcrumb pageName="Cron Jobs" />
      <div className="card-body p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleRunCron('roi')}
            className="btn bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.roi}
          >
            {loading.roi ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.DOLLAR} className="w-5 h-5 mr-2" />
            )}
            Run ROI Cron
          </button>

          <button
            onClick={() => handleRunCron('reward')}
            className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.reward}
          >
            {loading.reward ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.IOSETTINGS} className="w-5 h-5 mr-2" />
            )}
            Run Reward Cron
          </button>

          <button
            onClick={() => handleRunCron('weekly')}
            className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.weekly}
          >
            {loading.weekly ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.IOSETTINGS} className="w-5 h-5 mr-2" />
            )}
            Run Weekly Distribution
          </button>

          <button
            onClick={() => handleRunCron('monthly')}
            className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.monthly}
          >
            {loading.monthly ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.IOSETTINGS} className="w-5 h-5 mr-2" />
            )}
            Run monthly Distribution
          </button>

          <button
            onClick={() => handleRunCron('resetWeekMonth')}
            className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.resetWeekMonth}
          >
            {loading.resetWeekMonth ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.IOSETTINGS} className="w-5 h-5 mr-2" />
            )}
            Run resetWeekMonth
          </button>

          <button
            onClick={() => handleRunCron('dailyDirect')}
            className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading.dailyDirect}
          >
            {loading.dailyDirect ? (
              <span className="animate-spin mr-2">&#9696;</span>
            ) : (
              <Icon Icon={ICONS.IOSETTINGS} className="w-5 h-5 mr-2" />
            )}
            Run dailyDirect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cron;
