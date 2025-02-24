import { useState } from 'react';
import React from 'react';
import { ICONS } from '../../constants';
import Icon from '../../components/Icons/Icon';
import Loader from '../../common/Loader';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
interface ToggleStatusLoadingData {
  id: string | null;
  name: string | null;
}

const Member: React.FC = () => {
  const [toggleData, setToggleData] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  const [toggleStatusLoadingData, setToggleStatusLoadingData] =
    useState<ToggleStatusLoadingData>({
      id: null,
      name: null,
    });
  const handleToggleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string,
    currentStatus: boolean,
  ) => {};
  function handleEditClick(_id: any): void {
    throw new Error('Function not implemented.');
  }

  function handleRequestImpersonationToken(_id: any) {
    throw new Error('Function not implemented.');
  }

  function handleMachineClick(_id: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Breadcrumb pageName="Reward" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  S.No
                </th>
                <th className=" min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  USERID(NAME)
                </th>
                <th className=" min-w-[150px]py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Rank
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white uppercase ">
                  Complete Date
                </th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((user: any, index: number) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {members}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {members}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {members}
                      </h5>
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

export default Member;
