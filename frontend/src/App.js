import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// import LogIn from './components/Auth/LogIn';
import SignUp from './components/Auth/SignUp';
// import NotFound from './pages/NotFound';
// import PrivateRoute from './components/Common/PrivateRoute';
import BookListings from './components/Books/BookListings';
// import SwapRequest from './components/Forms/SwapRequest';
// import { AuthContextProvider } from './contexts/AuthContext';
import SignUpModal from './components/SignUpModal/SignUpModal';

// import Dashboard from './pages/Dashboard';
// import Transactions from './components/Dashboard/Transactions';
// import CreateDb from './components/CreateDb';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/books/listings" element={<BookListings />} />
          {/* <Route path="/login" element={<LogIn />} />
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
        <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="/pg-create" element={<CreateDb />} /> */}
        </Routes>
      </Router>

      <SignUpModal />
    </>


  );
}

export default App;
