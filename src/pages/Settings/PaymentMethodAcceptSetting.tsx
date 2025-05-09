import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Package } from '../../types/package';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import { useNavigate } from 'react-router-dom';

const PaymentMethodAcceptSetting: React.FC = () => {
  const packageData: Package[] = [
    {
      id: 1,
      name: 'UPI',
      invoiceDate: `Jan 13,2023`,
      status: 'Paid',
    },
    {
      id: 2,
      name: 'BANK',
      invoiceDate: `Jan 13,2023`,
      status: 'Paid',
    },
    {
      id: 3,
      name: 'USDT(bep-20)',
      invoiceDate: `Jan 13,2023`,
      status: 'Paid',
    },
  ];

  const navigate = useNavigate();

  const handleEditClick = (id: number, name: string) => {
    switch (name) {
      case 'UPI':
        navigate(`/setting/general-setting/paymentmethodaccept/upi/${id}`);
        break;
      case 'BANK':
        navigate(`/setting/general-setting/paymentmethodaccept/bank/${id}`);
        break;
      case 'USDT(bep-20)':
        navigate(`/setting/general-setting/paymentmethodaccept/usdt/${id}`);
        break;

      default:
        console.warn(`No handler defined for ${name}`);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Payment Method  Setting" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[200px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Sr.No
                </th>
                <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Setting Name
                </th>
                <th className="min-w-[130px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Value
                </th>
                <th className="min-w-[130px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData.length ? (
                packageData.map((packageItem) => (
                  <tr key={packageItem.id}>
                    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                      <div className="flex items-center">
                        <h5 className="font-medium text-black dark:text-white">
                          {packageItem.id}
                        </h5>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                      <div>
                        <SwitcherOne />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          On Enable value = "yes", On Disable value = "no"
                        </p>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark flex gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleEditClick(packageItem.id, packageItem.name)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodAcceptSetting;
