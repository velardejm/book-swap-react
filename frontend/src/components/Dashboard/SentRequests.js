import { Link } from 'react-router-dom';

export default function SentRequests({ sentRequests }) {
  return (
    <div>
      <div>
        <h1>Sent Requests</h1>

        <div>
          {sentRequests.map((transaction, index) => {
            const { requestId, requestedBook, bookToSwap, requestor } =
              transaction;

            return (
              <div key={index} className="bg-blue-100 mb-5 p-2">
                <div className="flex">
                  <div className="w-1/2">
                    <p>Request Id: {requestId}</p>
                    <p>Requested Book: {requestedBook.title}</p>
                  </div>
                  <div className="w-1/2">
                    <p>Requestor: {requestor}</p>
                    <p>Offerred Book: {bookToSwap.title}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button onClick={() => {}} className="text-red-800 mr-5">
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
