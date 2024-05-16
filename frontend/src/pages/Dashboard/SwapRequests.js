import useAuthorizedFetch from "../../hooks/useAuthorizedFetch"
import SwapDetails from "../../components/Swap/SwapDetails";

export default function SwapRequests() {
  const [swapRequests, setSwapRequests] = useAuthorizedFetch('http://localhost:3001/users/requests-in');

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
      {
        swapRequests.map((requests, index) => {
          return <SwapDetails request={requests} key={index} updateSwapRequests={updateSwapRequests} />
        })
      }
    </div>
  )
}