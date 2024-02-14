import { useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';

export default function SwapRequests({ swapRequests, setUserTransactions }) {
  // const [incomingRequests, setIncomingRequests] = useFetchData(
  //   'http://localhost:3001/users/transactions'
  // );

  const respondToRequest = async (response, requestId) => {
    const res = await fetch(`http://localhost:3001/swap/respond/${requestId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        response: response,
        requestId: requestId,
      }),
    });

    if (res.status === 200) {
      const { data } = await res.json();
      setUserTransactions(data);
    }
  };

  if (!swapRequests) return null;

  return (
    <div>
      <h1>Received Requests</h1>
      {swapRequests.map((request, index) => {
        const { requestId, requesterName, requestedBook, offerredBook } =
          request;

        console.log(requestId);
        return (
          <div key={index} className="bg-blue-100 mb-5 p-2">
            {/* <div className="flex">
              <div className="w-1/2">
                <p>Request Id: {requestId}</p>
                <p>Requested Book: {requestedBook.title}</p>
              </div>
              <div className="w-1/2">
                <p>Requestor: {requestor}</p>
                <p>Offerred Book: {bookToSwap.title}</p>
              </div>
            </div> */}
            <div>
              <p>{requesterName}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => respondToRequest('accept', 1)}
                className="text-green-800 mr-5"
              >
                Accept Offer
              </button>

              <button
                onClick={() => respondToRequest('reject', 2)}
                className="text-red-800 ml-5"
              >
                Reject Offer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
