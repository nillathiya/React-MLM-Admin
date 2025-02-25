import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Contact: React.FC = () => {
  const staticData = [
    {
      name: '',
      email: '',
      mobile: '',
      subject: '',
      massage: '',
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Contact" />
      <div>
        <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    S No.
                  </th>
                  <th className="min-w-[130px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Name
                  </th>
                  <th className="min-w-[150px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Email
                  </th>
                  <th className="min-w-[200px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Mobile
                  </th>
                  <th className="min-w-[210px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Subject
                  </th>

                  <th className="min-w-[100px] py-2 px-2 font-medium text-black dark:text-white uppercase">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {staticData.length > 0 ? (
                  staticData.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.subject}</td>
                      <td>{item.massage}</td>
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
      </div>
    </div>
  );
};

export default Contact;
