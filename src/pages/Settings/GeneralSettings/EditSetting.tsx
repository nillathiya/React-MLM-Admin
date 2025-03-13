import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import {
  getAdminSettingsAsync,
  getUserSettingsAsync,
  updateUserSettingAsync,
  updateAdminSettingAsync,
} from '../../../features/settings/settingsSlice';
import toast from 'react-hot-toast';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../../common/Loader';
import { API_URL } from '../../../constants';

interface SettingItem {
  _id: string;
  name: string;
  title: string;
  value: string | string[];
  type: 'text' | 'image' | 'date' | 'multi_values' | 'option';
  options?: string[] | string;
}

const EditSetting: React.FC = () => {
  const { category, title } = useParams<{ category: string; title: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userSettings, adminSettings } = useSelector(
    (state: RootState) => state.settings,
  );
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [editableSettings, setEditableSettings] = useState<SettingItem[]>([]);
  const [formData, setFormData] = useState<
    Record<string, string | string[] | File>
  >({});
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const fetchSettings = useCallback(async () => {
    if (!category) return;

    setIsLoading(true);
    try {
      switch (category) {
        case 'rank-settings':
          navigate('/setting/general-setting/rank-settings');
          break;
        case 'user-settings':
          if (userSettings.length === 0) {
            await dispatch(getUserSettingsAsync()).unwrap();
          }
          setSettings(userSettings);
          break;
        case 'admin-settings':
          if (adminSettings.length === 0) {
            await dispatch(getAdminSettingsAsync()).unwrap();
          }
          setSettings(adminSettings);
          break;
        case 'companyInfo-settings':
          navigate('/setting/general-setting/companyinfo');
          break;
        default:
          toast.error('Invalid category');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Server Error');
    } finally {
      setIsLoading(false);
    }
  }, [category, dispatch, navigate, userSettings, adminSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings.length > 0 && title) {
      const matchedSettings = settings.filter(
        (setting) => setting.title === title,
      );
      setEditableSettings(matchedSettings);
      const newFormData: Record<string, string | string[] | File> = {};
      const newFilePreviews: Record<string, string> = {};
      matchedSettings.forEach((setting) => {
        newFormData[setting._id] = setting.value;
        if (setting.type === 'image' && setting.value) {
          newFilePreviews[setting._id] = (setting.value as string).startsWith(
            '/uploads',
          )
            ? `${API_URL}${setting.value}`
            : (setting.value as string);
        }
      });
      setFormData(newFormData);
      setFilePreviews(newFilePreviews);
    }
  }, [settings, title]);

  const handleInputChange = useCallback(
    (id: string, value: string | string[] | File) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    [],
  );

  const handleFileChange = useCallback(
    (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
          toast.error('Please upload a valid image file.');
          return;
        }
        setFormData((prev) => ({ ...prev, [id]: file }));
        setFilePreviews((prev) => ({
          ...prev,
          [id]: URL.createObjectURL(file),
        }));
      }
    },
    [],
  );

  const handleMultiValueChange = useCallback(
    (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const values = e.target.value
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v);
      handleInputChange(id, values);
    },
    [handleInputChange],
  );

  const handleSubmit = useCallback(
    async (setting: SettingItem) => {
      if (!category) return;

      setIsUpdating((prev) => ({ ...prev, [setting._id]: true }));
      const value = formData[setting._id];
      const formDataToSend = new FormData();

      if (setting.type === 'image') {
        formDataToSend.append('file', value as File);
      } else {
        formDataToSend.append(
          'value',
          typeof value === 'string' ? value : JSON.stringify(value),
        );
      }

      try {
        let result;
        switch (category) {
          case 'user-settings':
            result = await dispatch(
              updateUserSettingAsync({
                id: setting._id,
                formData: formDataToSend,
              }),
            ).unwrap();
            break;
          case 'admin-settings':
            result = await dispatch(
              updateAdminSettingAsync({
                id: setting._id,
                formData: formDataToSend,
              }),
            ).unwrap();
            break;
          default:
            throw new Error('Unsupported category for update');
        }

        if (result?.status === 'success' && result?.data) {
          setFormData((prev) => ({
            ...prev,
            [setting._id]: result.data.value,
          }));
          if (setting.type === 'image') {
            setFilePreviews((prev) => ({
              ...prev,
              [setting._id]: `${API_URL}${result.data.value}`,
            }));
          }
          toast.success(`${setting.name} updated successfully`);
        }
      } catch (error: any) {
        toast.error(error?.message || `Failed to update ${setting.name}`);
      } finally {
        setIsUpdating((prev) => ({ ...prev, [setting._id]: false }));
      }
    },
    [dispatch, formData, category],
  );

  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((preview) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [filePreviews]);

  if (!category || !title) {
    return <div className="p-6">Invalid category or title</div>;
  }

  return (
    <>
      <Breadcrumb pageName={`Edit ${title} (${category})`} />
      <div className="rounded-sm border mt-6 border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {isLoading ? (
          <Loader loader="ClipLoader" size={50} color="blue" />
        ) : editableSettings.length > 0 ? (
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
                {editableSettings.map((setting, index) => (
                  <tr
                    key={setting._id}
                    className="border-b dark:border-strokedark"
                  >
                    <td className="py-5 px-2">{index + 1}</td>
                    <td className="py-5 px-2">{setting.name}</td>
                    <td className="py-5 px-2">
                      {setting.type === 'text' && (
                        <input
                          type="text"
                          value={(formData[setting._id] as string) || ''}
                          onChange={(e) =>
                            handleInputChange(setting._id, e.target.value)
                          }
                          className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                      )}
                      {setting.type === 'image' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(setting._id, e)}
                          />
                          {filePreviews[setting._id] && (
                            <img
                              src={filePreviews[setting._id]}
                              alt={`${setting.name} Preview`}
                              className="w-32 h-32 object-cover border rounded"
                            />
                          )}
                        </div>
                      )}
                      {setting.type === 'date' && (
                        <input
                          type="date"
                          value={(formData[setting._id] as string) || ''}
                          onChange={(e) =>
                            handleInputChange(setting._id, e.target.value)
                          }
                          className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                      )}
                      {setting.type === 'multi_values' && (
                        <input
                          type="text"
                          value={(
                            (formData[setting._id] as string[]) || []
                          ).join(', ')}
                          onChange={(e) =>
                            handleMultiValueChange(setting._id, e)
                          }
                          placeholder={
                            setting.options?.join(',') ||
                            'Enter values, separated by commas'
                          }
                          className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                      )}
                      {setting.type === 'option' &&
                        (() => {
                          const options: string[] = Array.isArray(
                            setting.options,
                          )
                            ? setting.options
                            : typeof setting.options === 'string'
                            ? setting.options
                                .split(',')
                                .map((opt) => opt.trim())
                            : ['Yes', 'No'];

                          const filteredOptions = options.filter(
                            (opt) => opt.length > 0,
                          );
                          if (filteredOptions.length === 0) return null;

                          return (
                            <select
                              value={(formData[setting._id] as string) || ''}
                              onChange={(e) =>
                                handleInputChange(setting._id, e.target.value)
                              }
                              className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                            >
                              <option value="">Select an option</option>
                              {filteredOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          );
                        })()}
                    </td>
                    <td className="py-5 px-2">
                      <button
                        onClick={() => handleSubmit(setting)}
                        className="bg-primary text-white p-2 rounded w-full disabled:opacity-50 transition-opacity"
                        disabled={isUpdating[setting._id] || false}
                      >
                        {isUpdating[setting._id] ? (
                          <Loader loader="ClipLoader" size={20} color="white" />
                        ) : (
                          'Update'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-5 text-center text-black dark:text-white">
            No settings found for "{title}" in "{category}"
          </div>
        )}
      </div>
    </>
  );
};

export default EditSetting;
