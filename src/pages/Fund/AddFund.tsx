import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useForm } from 'react-hook-form';
import { checkUsernameAsync } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import toast from 'react-hot-toast';
import { directTransferFundAsync } from '../../features/transaction/transactionSlice';
const AddFund: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [userActiveStatus, setUserActiveStatus] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,

    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const username = watch('username')?.trim();

  // Function to check username validity
  useEffect(() => {
    const checkUsername = async () => {
      if (!username) return;
      try {
        const formData = {
          username,
        };
        const response = await dispatch(checkUsernameAsync(formData)).unwrap();
        console.log(response);
        if (response.data.valid) {
          setUsernameValid(true);
          setUserActiveStatus(response.data.activeStatus);
          clearErrors('username');
        } else {
          setUsernameValid(false);
          setError('username', {
            type: 'manual',
            message: 'Username not found',
          });
        }
      } catch (error) {
        setUsernameValid(false);
        setError('username', { type: 'manual', message: 'Username not found' });
      }
    };

    const delayDebounce = setTimeout(() => {
      checkUsername();
    }, 500); // Debounce API call

    return () => clearTimeout(delayDebounce);
  }, [username, setError, clearErrors]);

  const handleSubmitAddFund = async (data: any) => {
    const formData = {
      ...data,
      txType: 'direct_fund_transfer',
      debitCredit: 'CREDIT',
      walletType: 'fund_wallet',
    };

    try {
      await dispatch(directTransferFundAsync(formData)).unwrap();
      toast.success('Fund added successfully');
    } catch (error: any) {
      toast.error(error || 'Server error');
    }
  };
  return (
    <div className="">
      <Breadcrumb pageName="Add Fund" />

      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark p-8">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
            Fund Transfer
          </h2>

          <form
            onSubmit={handleSubmit(handleSubmitAddFund)}
            className="space-y-6"
          >
            {/* Username Input */}
            <div>
              <label className="block !mb-2 text-sm font-medium text-black dark:text-white">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter Username"
                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:focus:ring-primary"
              />
              {errors.username?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.username.message)}
                </p>
              )}
              {usernameValid && (
                <p className="text-green-500 text-sm mt-1">
                  ✅ Username is valid
                </p>
              )}
            </div>

            {/* Amount Input */}
            <div>
              <label className="block !mb-2 text-sm font-medium text-black dark:text-white">
                Enter Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 1, message: 'Amount must be at least 1' },
                })}
                placeholder="Enter amount"
                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:focus:ring-primary"
              />
              {errors.amount?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.amount.message)}
                </p>
              )}
            </div>

            {/* Reason Input */}
            <div>
              <label className="block !mb-2 text-sm font-medium text-black dark:text-white">
                Enter Reason
              </label>
              <input
                type="text"
                {...register('reason')}
                placeholder="Enter reason"
                className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 outline-none focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full rounded-lg bg-primary py-3 px-6 text-white text-center font-medium transition duration-300 ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-opacity-90'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Transfer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
