import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import Inventory from "./components/Inventory/index";

import './App.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
