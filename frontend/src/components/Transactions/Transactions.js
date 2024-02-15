import SwapRequests from './SwapRequests';
import TransactionsToConfirm from './TransactionsToConfirm';
import useFetchData from '../../hooks/useFetchData';
import SentRequests from './SentRequests';
import CancelledTransactions from './CancelledTransactions';

export default function Transactions() {
  const [userTransactions, setUserTransactions, context] = useFetchData(
    'http://localhost:3001/users/transactions'
  );

  if (!userTransactions) return null;
  const {
    swapRequests,
    // transactionsToConfirm,
    // sentRequests,
    // cancelledTransactions,
    // userId,
  } = userTransactions;

  return (
    <div>
      <h1>Transactions Page</h1>
      <hr></hr>
      <SwapRequests
        swapRequests={swapRequests}
        userTransactions={userTransactions}
        setUserTransactions={setUserTransactions}
      />
      <hr></hr>
      {/* <SentRequests sentRequests={sentRequests} />
      <hr></hr>
      <TransactionsToConfirm
        transactionsToConfirm={transactionsToConfirm}
        userId={userId}
      />
      <hr></hr>
      <CancelledTransactions cancelledTransactions={cancelledTransactions} /> */}
    </div>
  );
}
