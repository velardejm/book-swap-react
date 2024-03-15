import SwapRequests from './SwapRequests';
import TransactionsToConfirm from './TransactionsToConfirm';
import useFetchData from '../../hooks/useFetchData';
import SentRequests from './SentRequests';
import CancelledTransactions from './CancelledTransactions';

export default function Transactions({
  userTransactions,
  setUserTransactions,
  books,
  setBooks,
}) {
  // const [userTransactions, setUserTransactions] = useFetchData(
  //   'http://localhost:3001/users/transactions'
  // );

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
        books={books}
        setBooks={setBooks}
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
