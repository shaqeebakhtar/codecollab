import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
