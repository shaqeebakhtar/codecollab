import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Editor from "./components/Editor";
import Home from "./components/Home";

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
