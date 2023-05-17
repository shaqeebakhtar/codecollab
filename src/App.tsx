import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top",
            duration: 2500,
            variant: "top-accent",
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:id" element={<Editor />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
