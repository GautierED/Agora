import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap';
import Home from "./components/Home/index";
import About from "./components/About/index";
import Inventory from "./components/Inventory/index";
import Marketplace from "./components/Marketplace/index";
import BuyItem from "./components/BuyItem/index";
import SellItem from "./components/SellItem/index";
import detectEthereumProvider from '@metamask/detect-provider';

import './bootstrap.css';
import './App.css';

//const bscChainId = '97';
const mumbaiChainId = '80001';

const App = () => {

  const [isConnected, setisConnected] = useState(undefined);
  const [isRightChain, setisRightChain] = useState(undefined);

  useEffect(() => {
    const init = async () => {

      let provider = await detectEthereumProvider();

      if(provider){

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if(accounts[0]){

          setisConnected(1);
          let chain = await provider.request({ method: 'eth_chainId' });
          chain = String(parseInt(chain, 16));

          if(chain === mumbaiChainId){
            setisRightChain(1);
          }

        } 
      }  
    };    
    init();
}, []);    

window.ethereum.on('accountsChanged', (_account) => window.location.reload());
window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

return (

  <div>
    { isConnected ? ( 
        isRightChain ? (

          <Router>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="/">Agora</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/inventory">Inventory</Nav.Link>
                      <Nav.Link href="/marketplace">Marketplace</Nav.Link>
                      <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/buyItem/:contractAddress/:idToken/:imageAddress" element={<BuyItem />} />
              <Route path="/sellItem/:contractAddress/:idToken/:imageAddress" element={<SellItem />} />
            </Routes>
          </Router>

        ) : (
          <div><center>Please switch to binance smart chain testnet</center></div>
        )  

      ) : (
        <div><center>Please connect to Metamask</center></div>
      )}  

  </div>

  );
};

export default App;
