import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      {/* <AllwaysScrollToTop /> */}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="/" render={() => <div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
