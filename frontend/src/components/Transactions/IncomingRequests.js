import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';

export default function IncomingRequests() {
  const [incomingRequests, setIncomingRequests] = useFetchData(
    'http://localhost:3001/users/transactions'
  );

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
      setIncomingRequests(data);
    }
  };

  if (!incomingRequests) return null;

  return (
    <div>
      {incomingRequests.map((request, index) => {
        const { requestId, requestedBook, bookToSwap, requestor } = request;
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
              <Link
                onClick={() => respondToRequest('accept', requestId)}
                className="text-green-800 mr-5"
                to="#"
              >
                Accept Offer
              </Link>
              <Link
                onClick={() => respondToRequest('reject', requestId)}
                className="text-red-800 ml-5"
                to="#"
              >
                Reject Offer
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
