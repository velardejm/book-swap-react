import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import NotFound from './components/pages/NotFound';
import PrivateRoute from './components/shared/PrivateRoute';
import BookListings from './components/pages/BookListings';
import SwapRequest from './components/pages/SwapRequest';
import { AuthContextProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import CreateDb from './components/CreateDb';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/books/listings" element={<BookListings />} />
          <Route
            path="/swap/:userId/:bookId"
            element={
              <PrivateRoute>
                <SwapRequest />
              </PrivateRoute>
            }
          />

          <Route path="/users/dashboard" element={<Dashboard />} />
          <Route path="/users/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pg-create" element={<CreateDb />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
