export default function SwapDetails({ request, updateSwapRequests }) {

    const { requestId, requesterName, requestedBook, offerredBook } = request

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
        }
    }

    return (
        <div className="bg-yellow-100 mb-5 p-2">

            <div className="text-center">
                <p>Requested book: {requestedBook.title}</p>
                <p>Offerred book: {offerredBook.title}</p>
                <p>Swap requested by: {requesterName}</p>
            </div>

            <div className="flex justify-center bg-sky-200">
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
}


