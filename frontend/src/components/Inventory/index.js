import React, { useState, useEffect } from 'react';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const Inventory = () => {

    const [message, setMessage] = useState('hello')

    useEffect(() => {

        const init = async () => {

            const provider = await detectEthereumProvider();

            if(!provider) alert('Please download Metamask');

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert(accounts[0]);
            
        };    
        init();
    }, []);    

    window.ethereum.on('accountsChanged', (_account) => window.location.reload());
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    async function loadInventory(contractAddress, userAddress){

    };

    return (
        <div>
            {message}
        </div>
    );
};

export default Inventory;