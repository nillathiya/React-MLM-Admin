import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
import './setting.css';
import Select, { MultiValue } from 'react-select';

// Interfaces for type safety
interface SettingItem {
  _id: string;
  name: string;
  title: string;
  value: string | string[];
  type:
    | 'text'
    | 'image'
    | 'singular_array'
    | 'option'
    | 'json_array'
    | 'number';
  options?: string[] | string;
}

interface SelectOption {
  value: string;
  label: string;
}

// SingularArraySetting Component
interface SingularArraySettingProps {
  setting: SettingItem;
  formData: Record<string, string | string[] | File>;
  handleSelectChange: (
    id: string,
    selected: MultiValue<SelectOption> | null,
  ) => void;
}

const SingularArraySetting: React.FC<SingularArraySettingProps> = ({
  setting,
  formData,
  handleSelectChange,
}) => {
  if (setting.type !== 'singular_array' || !Array.isArray(setting.options)) {
    return null;
  }

  const parseValue = (value: string | string[] | undefined): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const selectOptions = useMemo<SelectOption[]>(
    () =>
      (setting.options as string[]).map((opt) => ({
        value: opt,
        label: opt,
      })),
    [setting.options],
  );

  const selectedValues = useMemo<SelectOption[]>(() => {
    const rawValue = formData[setting._id] ?? parseValue(setting.value);
    return Array.isArray(rawValue)
      ? rawValue
          .filter((key) => (setting.options as string[]).includes(key))
          .map((key) => ({
            value: key,
            label: key,
          }))
      : [];
  }, [formData, setting._id, setting.value, setting.options]);

  const formatSelectedValues = (values: SelectOption[]): string =>
    values.length > 0 ? values.map(({ label }) => label).join(', ') : 'None';

  return (
    <div>
      <Select
        isMulti
        options={selectOptions}
        value={selectedValues}
        onChange={(selected) => handleSelectChange(setting._id, selected)}
        placeholder="Select options..."
        className="w-full"
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: '#e5e7eb',
            borderRadius: '0.375rem',
            padding: '0.5rem 1rem',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#3b82f6',
            },
            '&:focus-within': {
              borderColor: '#3b82f6',
            },
            zIndex: 999,
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#ffffff',
            borderRadius: '0.375rem',
            marginTop: '0.25rem',
            zIndex: 9999,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? '#3b82f6'
              : isFocused
              ? '#eff6ff'
              : '#ffffff',
            color: isSelected ? '#ffffff' : '#1f2937',
            '&:active': {
              backgroundColor: '#2563eb',
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: '#9ca3af',
          }),
          singleValue: (base) => ({
            ...base,
            color: '#1f2937',
          }),
          input: (base) => ({
            ...base,
            color: '#1f2937',
          }),
          clearIndicator: (base) => ({
            ...base,
            color: '#9ca3af',
            '&:hover': {
              color: '#2563eb',
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#3b82f6',
            primary25: '#eff6ff',
            primary50: '#dbeafe',
            neutral0: '#ffffff',
            neutral80: '#1f2937',
          },
        })}
        // styles={{
        //   container: (base) => ({
        //     ...base,
        //     width: 300,
        //   }),
        // }}
        // className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
      />
      <p>Selected Values: {formatSelectedValues(selectedValues)}</p>
    </div>
  );
};

// Main EditSetting Component
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
        (setting) => setting.title.trim() === title.trim(),
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

  const handleSelectChange = useCallback(
    (id: string, selectedOptions: MultiValue<SelectOption> | null) => {
      const selectedValues = selectedOptions
        ? Array.from(selectedOptions).map((option) => option.value)
        : [];
      setFormData((prev) => ({ ...prev, [id]: selectedValues }));
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

  const handleSubmit = useCallback(
    async (setting: SettingItem) => {
      if (!category) return;

      setIsUpdating((prev) => ({ ...prev, [setting._id]: true }));
      let value;
      value = formData[setting._id];

      if (setting.type === 'number') {
        value = Number(value);
      }
      console.log('setting', setting);
      console.log('selected value', value);

      console.log('value', value);
      try {
        let result;

        if (setting.type === 'image') {
          // Handle FormData only for image
          const formDataToSend = new FormData();
          formDataToSend.append('file', value as File);

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
        } else {
          const payload = {
            id: setting._id,
            formData: {
              value: typeof value === 'string' ? value : value,
            },
          };

          switch (category) {
            case 'user-settings':
              result = await dispatch(updateUserSettingAsync(payload)).unwrap();
              break;
            case 'admin-settings':
              result = await dispatch(
                updateAdminSettingAsync(payload),
              ).unwrap();
              break;
            default:
              throw new Error('Unsupported category for update');
          }
        }

        if (result?.status === 'success' && result?.data) {
          setFormData((prev) => ({
            ...prev,
            [setting._id]: result.data.value,
          }));

          if (setting.type === 'image') {
            setFilePreviews((prev) => ({
              ...prev,
              [setting._id]: ` ${API_URL}${result.data.value}`,
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
                    className="border-b border-[#eee] dark:border-strokedark"
                  >
                    <td className="py-5 px-2">{index + 1}</td>
                    <td className="py-5 px-2">{setting.name}</td>
                    <td className="py-5 px-2">
                      {setting.type.trim() === 'text' && (
                        <input
                          type="text"
                          value={(formData[setting._id] as string) || ''}
                          onChange={(e) =>
                            handleInputChange(setting._id, e.target.value)
                          }
                          className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                      )}

                      {setting.type.trim() === 'string' && (
                        <input
                          type="text"
                          value={(formData[setting._id] as string) || ''}
                          onChange={(e) =>
                            handleInputChange(setting._id, e.target.value)
                          }
                          className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                      )}

                      {setting.type.trim() === 'number' && (
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

                      {setting.type === 'singular_array' && (
                        <SingularArraySetting
                          setting={setting}
                          formData={formData}
                          handleSelectChange={handleSelectChange}
                        />
                      )}

                      {setting.type.trim() === 'json_array' &&
                        (() => {
                          let parsedOptions: Record<string, string> = {};

                          try {
                            let firstParse = JSON.parse(
                              setting.options as string,
                            );
                            parsedOptions =
                              typeof firstParse === 'string'
                                ? JSON.parse(firstParse)
                                : firstParse;
                          } catch (error) {
                            console.error(
                              '❌ Error parsing setting.options:',
                              error,
                            );
                          }

                          if (
                            !parsedOptions ||
                            typeof parsedOptions !== 'object'
                          ) {
                            return <p>Error: Options are not valid</p>;
                          }

                          const optionsArray = Object.entries(
                            parsedOptions,
                          ).map(([key, label]) => ({
                            key,
                            label,
                          }));

                          // Ensure value is a string or empty string
                          const selectValue =
                            typeof formData[setting._id] === 'string'
                              ? formData[setting._id]
                              : '';

                          return (
                            <div className="flex flex-col space-y-2">
                              <select
                                value={selectValue as string[]}
                                onChange={(e) =>
                                  handleInputChange(setting._id, e.target.value)
                                }
                                className="w-full rounded border border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                              >
                                <option value="">Select an option</option>
                                {optionsArray.length > 0 ? (
                                  optionsArray.map((opt) => (
                                    <option key={opt.key} value={opt.key}>
                                      {String(opt.label)}
                                    </option>
                                  ))
                                ) : (
                                  <option disabled>No options available</option>
                                )}
                              </select>
                            </div>
                          );
                        })()}

                      {setting.type.trim() === 'option' &&
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
