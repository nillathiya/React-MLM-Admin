import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FormMethod, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updateSupportRequestAsync } from '../../features/support/supportSlice';

const SupportView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [reply, setReply] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reply) {
      toast.error('Reply is required!');
      return;
    }
    try {
      setSubmitting(true);
      if (id) {
        const formData = {
          reply,
          status: 1,
        };
        dispatch(updateSupportRequestAsync({ id, formData }));
        toast.success('Reply sent successfully!');
        setReply('');
      } else {
        toast.error('Support Request ID is required!');
        return;
      }
    } catch (error: any) {
      toast.error(error || 'Server Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Message Detail" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Reply
                  </label>
                  <input
                    type="text"
                    name="reply"
                    placeholder="Enter Reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  style={{ backgroundColor: '#5e72e4' }}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? <span>Submitting...</span> : 'Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportView;
