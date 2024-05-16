import useAuthorizedFetch from "../../hooks/useAuthorizedFetch"
// import SwapDetails from "../../components/Swap/SwapDetails";
import SwapStatus from "../../components/Swap/SwapStatus";

export default function SentRequests() {
  const [swapRequests, setSwapRequests] = useAuthorizedFetch('http://localhost:3001/users/requests-out');

  const updateSwapRequests = (requestId) => {
    const requestsArray = swapRequests.slice();

    const requestIndex = requestsArray.findIndex((request) => {
      return request.requestId === requestId;
    });

    if (requestIndex !== -1) {
      requestsArray.splice(requestIndex, 1);
      setSwapRequests(requestsArray);
    }
  }

  if (!swapRequests) return null;

  return (
    <div>
      <h1 className="text-center">Sent Requests</h1>
      {
        swapRequests.map((requests, index) => {
          return <SwapStatus request={requests} key={index} updateSwapRequests={updateSwapRequests} />
        })
      }
    </div>
  )
}