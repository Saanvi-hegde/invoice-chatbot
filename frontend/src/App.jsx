import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Compare from "./pages/Compare"; // (create this later)
import History from "./pages/History"; // (create this later)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
