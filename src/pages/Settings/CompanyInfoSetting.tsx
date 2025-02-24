import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  getCompanyInfoAsync,
  // selectCompanyInfo,
  updateCompanyInfoAsync,
} from '../../features/companyInfo/companyInfoSlice';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../constants';

const CompanyInfoSetting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const companyInfo = useSelector(selectCompanyInfo);

  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(getCompanyInfoAsync({}));
  }, [dispatch]);

  const initialSettings = [
    'Company Name',
    'Base URL',
    'Company Favicon',
    'Company Logo',
    'Company Title',
    'Company Address',
    'Company Mobile',
    'Currency',
    'Token Rate',
    'Company Founder Name',
    'Company Founder Name',
    'Company FacebookLink',
    'Company Twitter Link',
    'Company LinkedinLink',
    'Company TelegramLink',
    'Company Pinterest Link',
    'Company InstagramLink',
  ];

  const handleInputChange = (name: string, value: string | File) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
      setFilePreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (name: string) => {
    const value = formData[name];

    // Find the actual _id for the given setting name
    // const settingItem = companyInfo?.find((item: any) => item.label === name);
    // const settingId = settingItem?._id;

    // if (!settingId) {
    //   toast.error(`No matching setting found for ${name}`);
    //   return;
    // }

    // const formDataToSend = new FormData();

    // if (name === 'companyFavicon' || name === 'companyLogo') {
    //   // Match the field name with backend
    //   formDataToSend.append('file', value as File);
    // } else {
    //   formDataToSend.append('value', value as string);
    // }

    // try {
    //   await dispatch(
    //     updateCompanyInfoAsync({ id: settingId, formData: formDataToSend }),
    //   );
    //   toast.success('Updated successfully.');
    // } catch (error) {
    //   toast.error('Failed to update.');
    // }
  };

  return (
    <>
      <Breadcrumb pageName="Company Info Setting" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Sr.No
                </th>
                <th className="py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Setting Name
                </th>
                <th className="py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Value
                </th>
                <th className="py-2 px-2 font-medium text-black dark:text-white uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {initialSettings.map((name, index) => (
                <tr key={index}>
                  <td className="border-b py-5 px-2 dark:border-strokedark">
                    {index + 1}
                  </td>
                  <td className="border-b py-5 px-2 dark:border-strokedark">
                    {name}
                  </td>
                  <td className="border-b py-5 px-2 dark:border-strokedark">
                    {name.includes('Logo') || name.includes('Favicon') ? (
                      <div
                        className="flex items-center gap-2"
                        style={{ paddingRight: '120px' }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(name, e)}
                        />
                        {filePreviews[name] && (
                          <img
                            src={
                              filePreviews[name].startsWith('/uploads')
                                ? `${API_URL}${filePreviews[name]}`
                                : filePreviews[name]
                            }
                            alt={`${name} Preview`}
                            className="w-32 h-32 object-cover border rounded"
                          />
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={
                          typeof formData[name] === 'string'
                            ? formData[name]
                            : ''
                        }
                        onChange={(e) =>
                          handleInputChange(name, e.target.value)
                        }
                        className="w-full rounded border border-stroke bg-transparent py-2 px-4 md:py-3 md:px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    )}
                  </td>
                  <td className="border-b py-5 px-2 dark:border-strokedark">
                    <button
                      onClick={() => handleSubmit(name)}
                      className="bg-primary text-white p-2 rounded w-full"
                      style={{ backgroundColor: '#5e72e4' }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompanyInfoSetting;
