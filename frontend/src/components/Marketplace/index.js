import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import LoadOwnedFromContract from '../../functions/loadNFTs.js';
import abiNFT from '../../abiNFT.json';
import Item from '../../classes/item.js'
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const nftAddress = '0x2aBf143BF98197f1cE3893F882f3b3222d0cFcc9';
const agoraAddress = '0xBDb7828472FA1Cb332a1128636a53b2996B11BCC';
const bscChainId = '97';

const Marketplace = () => {

    let navigate = useNavigate(); 
    
    const [isRightChain, setisRightChain] = useState(undefined);
    const [items, setItems] =  useState([Item]);

    useEffect(() => {
        const init = async () => {

            setItems([]);
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

                        setItems(await LoadOwnedFromContract(contract, agoraAddress));

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
                <div>
                    {items.map((item, index) => (
                        <p key={index}>
                            {index}
                            <img src = {item.imageAddress}/>
                            Contract : {item.contractAddress}
                            NFT number {item.tokenId}
                            <Button 
                                variant="outline-dark" 
                                onClick={() => {
                                    navigate("/buyItem/" + item.tokenId + "/" + item.contractAddress);
                                  }}>
                                Buy
                            </Button>
                        </p>
                    ))}
                </div>
            ) : (
                <div>Switch to the Binance Smart Chain</div>
            )}
        </div>
    );
};

export default Marketplace;