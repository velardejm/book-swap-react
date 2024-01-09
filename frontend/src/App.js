import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/NotFound";
import Protected from "./components/pages/Protected";
import PrivateRoute from "./components/shared/PrivateRoute";
import BookListings from "./components/pages/BookListings";
import SwapRequest from "./components/pages/SwapRequest";
import { AuthContextProvider } from "./contexts/AuthContext";
import Dashboard from "./components/pages/Dashboard";

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/listings" element={<BookListings />} />
          <Route path="/swap/:user/:bookId" element={<PrivateRoute><SwapRequest /></PrivateRoute>} />
          {/* <Route path="/protected" element={<PrivateRoute><Protected /></PrivateRoute>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
