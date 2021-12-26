import React, { useState, useEffect } from 'react';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const Inventory = () => {

    const [message, setMessage] = useState('hello')

    useEffect(() => {

        const init = async () => {
 
            const provider = await detectEthereumProvider();
            if(provider) {
                alert('truc')
            }
            
        };    
        init();
    }, []);    


    return (
        <div>
            {message}
        </div>
    );
};

export default Inventory;