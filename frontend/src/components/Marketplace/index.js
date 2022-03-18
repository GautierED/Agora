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
//const bscChainId = '97';
const mumbaiChainId = '80001';

const Marketplace = () => {

    let navigate = useNavigate(); 
    
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

                    if(chain === mumbaiChainId){

                        provider = new ethers.providers.Web3Provider(provider);
                        const signer = provider.getSigner();

                        const contract = new Contract(
                            nftAddress,
                            abiNFT,
                            signer
                        );

                        setItems(await LoadOwnedFromContract(contract, agoraAddress));

                    } 
                } 
            } 
            
        };    
        init();
    }, []);    

    return (
        <div>
            <div>
                {items.map((item, index) => (
                    <p key={index}>
                        {index}
                        <img src = {item.imageAddress} alt="NFT"/>
                        Contract : {item.contractAddress}
                        NFT number {item.tokenId}
                        <Button 
                            variant="outline-dark" 
                            onClick={() => {
                                navigate("/buyItem/" + item.contractAddress + "/" + item.tokenId + "/" + item.imageAddress.substring(34));
                            }}>
                            Buy
                        </Button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;