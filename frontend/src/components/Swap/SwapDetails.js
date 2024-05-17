export default function SwapDetails({ request, updateSwapRequests }) {
    const { requestId, requesterName, requestedBook, offerredBook } = request;
  
    const respondToRequest = async (response, requestId) => {
      const res = await fetch(`http://localhost:3001/swap/respond/`, {
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
  
      updateSwapRequests(requestId);
  
      if (res.status === 200) {
        // handle success if needed
      }
    };
  
    return (
      <div className="border rounded-lg bg-yellow-100 mb-5 p-4">
        <div className="text-center mb-4">
          <p className="font-bold">Requested book: {requestedBook.title}</p>
          <p className="font-bold">Offered book: {offerredBook.title}</p>
          <p className="font-bold">Swap requested by: {requesterName}</p>
        </div>
  
        <div className="flex justify-center">
          <button
            onClick={() => respondToRequest('accept', requestId)}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-4 hover:bg-green-600"
          >
            Accept Offer
          </button>
  
          <button
            onClick={() => respondToRequest('reject', requestId)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Reject Offer
          </button>
        </div>
      </div>
    );
  }
  