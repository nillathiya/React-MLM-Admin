import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const FundTransfer: React.FC = () => {
  const [fund, setFund] = useState({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submited...');
  };

  const [filter, setFilter] = useState({
    mName: '',
    productKey: '',
  });
  const staticData = [
    {
      Userid: '123',
      walletType: '100',
      date: '',
      fCode: {
        name: 'john',
      },
      amount: '5454',
    },
  ];
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Breadcrumb pageName="Fund Transfer" />
      <div className="card card-body shadow-default dark:border-strokedark dark:bg-boxdark">
        <form className="flex" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2">
            <div className="form-group col-md-6 col-sm-12">
              <input
                type="text"
                placeholder="Enter Machine Name"
                name="mName"
                value={filter.mName}
                onChange={handleFilterChange}
                className="w-full rounded border border-stroke bg-transparent py-2 px-4 md:py-3 md:px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <input
                type="text"
                placeholder="Enter Product Key"
                name="productKey"
                value={filter.productKey}
                onChange={handleFilterChange}
                className="w-full rounded border border-stroke bg-transparent  py-2 px-4 md:py-3 md:px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="form-group col-md-6 col-sm-12">
              <button
                type="submit"
                name="submit"
                className="w-full rounded bg-primary py-2 px-4 md:py-3 md:px-6 text-white transition duration-200 ease-in-out hover:bg-primary-dark dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Filter
              </button>
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <button
                type="button"
                onClick={() => {
                  setFilter({
                    mName: '',
                    productKey: '',
                  });
                }}
                className="w-full rounded bg-gray-500 py-2 px-4 md:py-3 md:px-6 text-white transition duration-200 ease-in-out hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      <>
        <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Sr
                  </th>
                  <th className="min-w-[130px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Userid
                  </th>
                  <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Full Name
                  </th>
                  <th className="min-w-[200px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Amount
                  </th>
                  <th className="min-w-[210px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Wallet Type
                  </th>
                  <th className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {staticData.length > 0 ? (
                  staticData.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td>{index + 1}</td>
                      <td>{item.Userid}</td>
                      <td>{item.fCode?.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.walletType}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
};

export default FundTransfer;
