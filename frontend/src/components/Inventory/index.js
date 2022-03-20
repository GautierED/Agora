import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ethers, Contract } from 'ethers';
import LoadNFTs from '../../functions/loadNFTs.js';
import abiNFT from '../../abiNFT.json';
import Item from '../../classes/item.js'
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const nftAddress = '0xd7c3FCE1422004B127D83a16eA444F48A482dA6D';

const Inventory = () => {

    let navigate = useNavigate(); 

    const [items, setItems] =  useState([Item]);

    useEffect(() => {
        const init = async () => {

            setItems([]);
            
            let provider = new ethers.providers.Web3Provider(window.$provider);
            const signer = provider.getSigner();

            const contract = new Contract(
                nftAddress,
                abiNFT,
                signer
            );

            setItems(await LoadNFTs(contract, window.$account));
            
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
                                navigate("/listItem/" + item.contractAddress + "/" + item.tokenId + "/" + item.imageAddress.substring(34));
                            }}>
                            List
                        </Button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Inventory;