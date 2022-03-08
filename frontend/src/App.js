import React from "react";
import { Link, Routes, BrowserRouter as Router, Route } from "react-router-dom";
import {Navbar, Nav, NavItem, Container} from 'react-bootstrap';
import Inventory from "./components/Inventory/index";
import Marketplace from "./components/Marketplace/index";
import './bootstrap.css';

import './App.css';

const App = () => {

  return (
    <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Agora</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/inventory">Inventory</Nav.Link>
                <Nav.Link href="/marketplace">Marketplace</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
