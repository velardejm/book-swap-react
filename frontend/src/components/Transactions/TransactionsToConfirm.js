import { Link } from 'react-router-dom';

export default function TransactionsToConfirm({ transactionsToConfirm }) {
  return (
    <div>
      <h1>Transactions to Confirm</h1>

      <div>
        {transactionsToConfirm.map((transaction, index) => {
          const {
            requestId,
            requestedBook,
            bookToSwap,
            requestor,
            requestorId,
            bookOwnerId,
            requestorConfirmed,
            ownerConfirmed,
          } = transaction;
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
                <Link onClick={() => {}} className="text-green-800 mr-5" to="#">
                  Confirm
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
