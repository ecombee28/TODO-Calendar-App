import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>RemindMe</title>
        <link rel="shortcut icon" href="./images/mini_logo.ico" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
          <Route path="/" render={() => <div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
