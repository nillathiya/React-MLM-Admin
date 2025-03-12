import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  deleteCompanyInfoAsync,
  getAllCompanyInfoAsync,
  // selectCompanyInfo,
  updateCompanyInfoAsync,
} from '../../features/settings/settingsSlice';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../constants';
import Loader from '../../common/Loader';
import { ICONS } from '../../constants';
import Icon from '../../components/Icons/Icon';

const CompanyInfoSetting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companyInfo, companyInfoLoading } = useSelector(
    (state: RootState) => state.settings,
  );

  const [submittingField, setSubmittingField] = useState<{
    name: string;
    index: number;
    value: boolean;
    action: string;
  }>({
    name: '',
    index: 0,
    value: false,
    action: '',
  });

  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        await dispatch(getAllCompanyInfoAsync()).unwrap();
      } catch (error: any) {
        toast.error(error || 'Server Error');
      }
    };
    if (companyInfo.length == 0) {
      fetchCompanyInfo();
    }
  }, [dispatch]);

  useEffect(() => {
    if (companyInfo) {
      companyInfo?.forEach((item: any) => {
        setFormData((prev) => ({
          ...prev,
          [item.label]: item.value,
        }));

        if (item.label === 'companyFavicon' || item.label === 'companyLogo') {
          setFilePreviews((prev) => ({
            ...prev,
            [item.label]: item.value,
          }));
        }
      });
    }
  }, [companyInfo, dispatch]);

  const initialSettings = [
    'companyTitle',
    'baseURL',
    'companyFavicon',
    'companyLogo',
    'companyAddress',
    'companyMobile',
    'currency',
    'companyName',
    'companyFacebookLink',
    'companyLinkedinLink',
    'companyTelegramLink',
    'companyMediumLink',
    'companyInstagramLink',
    'fakeUsers',
    'fakeMachines',
    'hashrate',
    'whatsappAppKey',
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

  const handleSubmit = async (name: string, index: number) => {
    const value = formData[name];

    // Find the actual _id for the given setting name
    const settingItem = companyInfo?.find((item: any) => item.label === name);
    const settingId = settingItem?._id;

    if (!settingId) {
      toast.error(`No matching setting found for ${name}`);
      return;
    }

    const formDataToSend = new FormData();

    if (name === 'companyFavicon' || name === 'companyLogo') {
      // Match the field name with backend
      formDataToSend.append('file', value as File);
    } else {
      formDataToSend.append('value', value as string);
    }
    setSubmittingField({ name, index, value: true, action: 'update' });

    try {
      await dispatch(
        updateCompanyInfoAsync({ id: settingId, formData: formDataToSend }),
      );
      toast.success('Updated successfully.');
    } catch (error) {
      toast.error('Failed to update.');
    } finally {
      setSubmittingField({ name, index, value: false, action: 'update' });
    }
  };

  const handleDelete = async (name: string, index: number) => {
    // Find the setting item
    const settingItem = companyInfo?.find((item: any) => item.label === name);
    const settingId = settingItem?._id;

    if (!settingId) {
      toast.error(`No matching setting found for ${name}`);
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }
    setSubmittingField({ name, index, value: true, action: 'delete' });

    try {
      await dispatch(deleteCompanyInfoAsync(settingId)).unwrap();
      setFormData((prev) => {
        const newFormData = { ...prev };
        delete newFormData[name];
        return newFormData;
      });
      toast.success(`${name} deleted successfully.`);
    } catch (error) {
      toast.error(`Failed to delete ${name}.`);
    } finally {
      setSubmittingField({ name, index, value: false, action: 'delete' });
    }
  };

  const handleRefresh = async () => {
    try {
      await dispatch(getAllCompanyInfoAsync()).unwrap();
    } catch (error: any) {
      toast.error(error || 'Server error');
    }
  };

  console.log('companyInfo', companyInfo);
  console.log('filePreviews', filePreviews);

  return (
    <>
      <Breadcrumb pageName="Company Info Setting" />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {companyInfoLoading ? (
          <Loader loader="ClipLoader" size={50} color="blue" />
        ) : (
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            {/* Refresh button */}

            <div className="flex mb-2 sticky  bg-white dark:bg-meta-4 z-10 w-14">
              <button onClick={handleRefresh} className="btn-refresh">
                <Icon Icon={ICONS.REFRESH} className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
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
                {initialSettings.map(
                  (name, index) =>
                    (formData[name] !== undefined ||
                      filePreviews[name] !== undefined) && (
                      <tr
                        key={index}
                        className="border-b dark:border-strokedark"
                      >
                        <td className="py-5 px-2">{index + 1}</td>
                        <td className="py-5 px-2 ">{name}</td>
                        <td className="py-5 px-2">
                          {name === 'companyLogo' ||
                          name === 'companyFavicon' ? (
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
                              value={formData[name] as string}
                              onChange={(e) =>
                                handleInputChange(name, e.target.value)
                              }
                              className="w-full rounded border border-stroke bg-transparent py-2 px-4 md:py-3 md:px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          )}
                        </td>
                        <td className="py-5 px-2 flex gap-2">
                          <button
                            onClick={() => handleSubmit(name, index)}
                            className="bg-primary text-white p-2 rounded w-full"
                            disabled={
                              submittingField.name === name &&
                              submittingField.value &&
                              submittingField.action === 'update'
                            }
                          >
                            {submittingField.name === name &&
                            submittingField.value &&
                            submittingField.action === 'update' ? (
                              <Loader
                                loader="ClipLoader"
                                size={20}
                                color="white"
                              />
                            ) : (
                              'Update'
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(name, index)}
                            className="bg-red-500 text-white p-2 rounded w-full"
                            disabled={
                              submittingField.name === name &&
                              submittingField.value &&
                              submittingField.action === 'delete'
                            }
                          >
                            {submittingField.name === name &&
                            submittingField.value &&
                            submittingField.action === 'delete' ? (
                              <Loader
                                loader="ClipLoader"
                                size={20}
                                color="white"
                              />
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyInfoSetting;
