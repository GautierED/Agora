import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Inventory from "./components/Inventory/index";
import NFTforSale from "./components/NFTforSale/index";

import './App.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/nftforsale" element={<NFTforSale />} />
      </Routes>
    </Router>
  );
}

export default App;
