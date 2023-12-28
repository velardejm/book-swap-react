import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/signup" Component={SignUp}/>
        <Route path="*" Component={NotFound}/>
      </Routes>
    </Router>
  );
}

export default App;
