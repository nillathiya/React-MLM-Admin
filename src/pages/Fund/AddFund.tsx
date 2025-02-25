import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const AddFund: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    reason: '',
    amount: '',
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitted...');
  };
  return (
    <div>
      <Breadcrumb pageName="Add Fund" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit} className="p-6.5">
            {/* MAC Address Input */}
            <div className="mb-4.5">
              <label className="block mb-2.5 text-black dark:text-white">
                Username
              </label>
              <input
                type="text"
                name="macAddress"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            {/* Product Key Input */}
            <div className="mb-4.5">
              <label className="block mb-2.5 text-black dark:text-white">
                Enter Amount
              </label>
              <input
                type="text"
                name="productKey"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            {/* Notes */}
            <div className="mb-4.5">
              <label className="block mb-2.5 text-black dark:text-white">
                Enter Reason
              </label>

              <input
                type="text"
                name="productKey"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full rounded bg-primary py-3 px-6 text-white ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
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
