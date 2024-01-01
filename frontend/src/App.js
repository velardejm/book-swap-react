import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Protected from "./pages/Protected";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <PrivateRoute path="/protected" element={<Protected />} isAuthenticated={isAuthenticated} /> */}
        <Route path="/private" element={<PrivateRoute><Protected /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
