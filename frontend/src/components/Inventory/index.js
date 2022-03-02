import React, { useState, useEffect } from 'react';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import LoadOwnedFromContract from '../../functions/loadNFTs.js';
import abiNFT from '../../abiNFT.json';

const nftAddress = '0x2aBf143BF98197f1cE3893F882f3b3222d0cFcc9';
const bscChainId = '97';

const Inventory = () => {

    const [isRightChain, setisRightChain] = useState(undefined);
    const [images, setImages] =  useState([]);

    useEffect(() => {
        console.log('here');
        let itemsList = [];
        const init = async () => {

            let provider = await detectEthereumProvider();
            if(provider){
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if(accounts[0]){
                    
                    let chain = await provider.request({ method: 'eth_chainId' });
                    chain = String(parseInt(chain, 16));

                    if(chain === bscChainId){

                        setisRightChain(1);
                        provider = new ethers.providers.Web3Provider(provider);
                        const signer = provider.getSigner();

                        const contract = new Contract(
                            nftAddress,
                            abiNFT,
                            signer
                        );

                        setImages(await LoadOwnedFromContract(contract, accounts[0], itemsList));

                    } else alert('Please switch to the binance smart chain'); 

                } else alert('Pease login with Metamask'); 

            } else alert('Please install Metamask'); 
            
        };    
        init();
    }, []);    

    window.ethereum.on('accountsChanged', (_account) => window.location.reload());
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    return (
        <div>
            {isRightChain ? (
                <div>My NFTs : <br></br>{images}</div>
            ) : (
                <div>Switch to the Binance Smart Chain</div>
            )}
        </div>
    );
};

export default Inventory;