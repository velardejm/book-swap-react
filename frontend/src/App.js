import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DashboardRoutes from './pages/Dashboard/DashboardRoutes';
import BookListings from './components/Books/BookListings';
import PrivateRoute from './components/Common/PrivateRoute';
import SwapRequest from './components/Forms/SwapRequest';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </Router>


    </>


  );
}

export default App;
