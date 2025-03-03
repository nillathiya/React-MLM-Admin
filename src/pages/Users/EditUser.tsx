import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import { ICONS } from '../../constants';
import Icon from '../../components/Icons/Icon';
const EditUser: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    name: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    accountStatus: {
      blockStatus: '',
      isActive: '',
    },
    emailVerification: {
      isVerified: '',
    },
    adminRegisterStatus: '',
  });
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResetPasswordFormSubmitting, setIsResetPasswordFormSubmitting] =
    useState<boolean>(false);

  function handleSubmit(e: any): void {
    throw new Error('Function not implemented.');
  }

  function handleFormResetPassword(e: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Breadcrumb pageName="Edit Profile" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Profile
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Username
                      </label>
                      <input
                        disabled
                        type="text"
                        value={formData.username}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Mobile
                    </label>
                    <input
                      type="text"
                      value={formData.mobile}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                    />
                  </div>
                  {/* user block status */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Change Status
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={formData.accountStatus?.blockStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accountStatus: {
                              ...formData.accountStatus,
                              blockStatus: e.target.value,
                            },
                          })
                        }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      >
                        <option
                          value={'true'}
                          className="text-body dark:text-bodydark"
                        >
                          Enable
                        </option>
                        <option
                          value={'false'}
                          className="text-body dark:text-bodydark"
                        >
                          disable
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-6 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* user active status */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Change Active Status
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={formData.accountStatus?.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accountStatus: {
                              ...formData.accountStatus,
                              isActive: e.target.value,
                            },
                          })
                        }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      >
                        <option
                          value={'true'}
                          className="text-body dark:text-bodydark"
                        >
                          Enable
                        </option>
                        <option
                          value={'false'}
                          className="text-body dark:text-bodydark"
                        >
                          disable
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* admin register status */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Register Status
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={formData.adminRegisterStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            adminRegisterStatus: e.target.value,
                          })
                        }
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      >
                        <option
                          value={'true'}
                          className="text-body dark:text-bodydark"
                        >
                          Enable
                        </option>
                        <option
                          value={'false'}
                          className="text-body dark:text-bodydark"
                        >
                          disable
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* Email verified status */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email verify Status
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        value={formData.emailVerification.isVerified}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            emailVerification: {
                              ...formData.emailVerification,
                              isVerified: e.target.value,
                            },
                          });
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                      >
                        <option
                          value={'true'}
                          className="text-body dark:text-bodydark"
                        >
                          Enable
                        </option>
                        <option
                          value={'false'}
                          className="text-body dark:text-bodydark"
                        >
                          disable
                        </option>
                      </select>

                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    style={{ backgroundColor: '#5e72e4' }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <span>Saving...</span> : 'SAVE'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <form action="#" onSubmit={handleFormResetPassword}>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full relative">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Set New Password
                        </label>
                        <input
                          value={password || ''}
                          type={showPassword ? 'text' : 'password'}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-12 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[70%] -translate-y-1/2 text-gray-500 dark:text-gray-400"
                          style={{ border: 'none', width: '6%' }}
                        >
                          {showPassword ? (
                            <Icon Icon={ICONS.EYE} className="w-5 h-5" />
                          ) : (
                            <Icon Icon={ICONS.EYEOFF} className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                      style={{ backgroundColor: '#5e72e4' }}
                      type="submit"
                      disabled={isResetPasswordFormSubmitting}
                    >
                      {isResetPasswordFormSubmitting ? (
                        <span>Saving...</span>
                      ) : (
                        'SET PASSWORD'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default EditUser;
