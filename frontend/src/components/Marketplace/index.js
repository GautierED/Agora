import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import LoadOwnedFromContract from '../../functions/loadNFTs.js';
import abiNFT from '../../abiNFT.json';
import Item from '../../classes/item.js'
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const nftAddress = '0xd7c3FCE1422004B127D83a16eA444F48A482dA6D';
const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';
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