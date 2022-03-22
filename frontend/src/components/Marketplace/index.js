import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ethers, Contract } from 'ethers';
import LoadNFTsContract from '../../functions/loadNFTsContract.js';
import abiAgora from '../../abiAgora.json';
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';

const Marketplace = () => {

    let navigate = useNavigate(); 
    
    const [items, setItems] =  useState([]);

    useEffect(() => {
        const init = async () => {

            let provider = new ethers.providers.Web3Provider(window.$provider);
            const signer = provider.getSigner();

            const contract = new Contract(
                agoraAddress,
                abiAgora,
                signer
            );

            setItems(await LoadNFTsContract(contract, signer));
        };    
        init();
    }, []);  
    

    return (
        <div>
            <div>
                {items.map((item, index) => (
                    <p key={index}>
                        <img src = {item.imageAddress} alt="NFT"/>
                        Contract : {item.contractAddress}
                        NFT number {item.tokenId}
                        Price {item.price}
                        <Button 
                            variant="outline-dark" 
                            onClick={() => {
                                navigate("/buyItem/" + item.contractAddress + "/" + item.tokenId + "/" + item.itemId + "/"   + item.price + "/" + item.imageAddress.substring(34));
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