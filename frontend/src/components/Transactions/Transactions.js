import IncomingRequests from './IncomingRequests';
import TransactionsToConfirm from './TransactionsToConfirm';
import useFetchData from '../../hooks/useFetchData';
// import { useEffect, useState } from 'react';

export default function Transactions() {
  const [userTransactions, setUserTransactions] = useFetchData(
    'http://localhost:3001/users/transactions'
  );

  if (!userTransactions) return null;
  // setIncomingRequests(userTransactions.incomingRequests);
  const { incomingRequests, transactionsToConfirm } = userTransactions;

  return (
    <div>
      <h1>Transactions Page</h1>
      <hr></hr>
      <IncomingRequests
        incomingRequests={incomingRequests}
        setUserTransactions={setUserTransactions}
      />
      <hr></hr>
      <TransactionsToConfirm transactionsToConfirm={transactionsToConfirm} />
    </div>
  );
}
