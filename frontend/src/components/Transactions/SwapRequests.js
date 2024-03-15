export default function SwapRequests({
  swapRequests,
  userTransactions,
  setUserTransactions,
  books,
  setBooks,
}) {
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
      const responseObject = await res.json();
      const { receivedBook, requestedBookId } = responseObject;
      const respondedRequestId = swapRequests.findIndex(
        (i) => i.requestId === requestId
      );
      swapRequests.splice(respondedRequestId, 1);
      setUserTransactions(swapRequests);

      if (response === 'accept') {
        const requestedBookIndex = books.findIndex(
          (i) => i.id === requestedBookId
        );
        books.splice(requestedBookIndex, 1);
        setBooks([...books, receivedBook]);
      }
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
            <div>
              <p>Requested book: {requestedBook.title}</p>
              <p>Offerred book: {offerredBook.title}</p>
              <p>Swap requested by: {requesterName}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => respondToRequest('accept', requestId)}
                className="text-green-800 mr-5"
              >
                Accept Offer
              </button>

              <button
                onClick={() => respondToRequest('reject', requestId)}
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
