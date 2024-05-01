import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DashboardRoutes from './pages/Dashboard/DashboardRoutes';
import SignUp from './components/Auth/SignUp';
import BookListings from './components/Books/BookListings';
import PrivateRoute from './components/Common/PrivateRoute';
import SwapRequest from './components/Forms/SwapRequest';
// import LogIn from './components/Auth/LogIn';
// import NotFound from './pages/NotFound';
// import { AuthContextProvider } from './contexts/AuthContext';
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
          <Route path="/user/*"
            element={
              <PrivateRoute>
                <DashboardRoutes />
              </PrivateRoute>} />

          <Route
            path="/swap/:userId/:bookId"
            element={
              <PrivateRoute>
                <SwapRequest />
              </PrivateRoute>
            }
          />
          {/* <Route path="/login" element={<LogIn />} />

        <Route path="/users/dashboard" element={<Dashboard />} />
        <Route path="/users/transactions" element={<Transactions />} />
        <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="/pg-create" element={<CreateDb />} /> */}
        </Routes>
      </Router>


    </>


  );
}

export default App;
