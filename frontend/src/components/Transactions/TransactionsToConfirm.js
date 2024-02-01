import { Link } from 'react-router-dom';

export default function TransactionsToConfirm({
  transactionsToConfirm,
  userId,
}) {
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
            bookOwnerId,
            requestorConfirmed,
            ownerConfirmed,
          } = transaction;

          const userType = userId === bookOwnerId ? 'Book Owner' : 'Requestor';
          return (
            <div key={index} className="bg-blue-100 mb-5 p-2">
              <p>You are the {userType}</p>
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
                <button onClick={() => {}} className="text-green-800 mr-5">
                  Confirm
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
