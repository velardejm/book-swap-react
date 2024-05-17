import Button from '../Common/Button';

export default function ConfirmationModal({
  setIsModalOpen,
  message,
  confirm,
  cancel,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden w-96">
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-8 pb-8 pt-4">
          <p className="text-lg font-medium mb-4 text-center">{message}</p>
          {/* <div className="flex justify-center">
            <Button
              label={'Ok'}
              className={'bg-blue-500 text-white mr-4'}
              onClick={confirm}
            />
            <Button
              label={'Cancel'}
              className={'bg-gray-300 text-gray-700'}
              onClick={() => setIsModalOpen(false)}
            />
          </div> */}

          <div className="flex justify-center">
            <button
              onClick={confirm}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-4 hover:bg-green-600"
            >
              Ok
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
