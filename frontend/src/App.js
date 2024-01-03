import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/NotFound";
import Protected from "./components/pages/Protected";
import PrivateRoute from "./components/shared/PrivateRoute";

function App() {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
