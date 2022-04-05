import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import LoadNFTsByWallet from '../../functions/loadNFTsByWallet.js';
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const Inventory = () => {

    let navigate = useNavigate(); 

    const [items, setItems] =  useState([]);

    useEffect(() => {
        const init = async () => {

            let provider = new ethers.providers.Web3Provider(window.$provider);
            const signer = provider.getSigner();

            setItems(await LoadNFTsByWallet(window.$account,signer));
        };    
        init();
    }, []);    

    return (
        <div className="container">
            <div className="row">
                {items.map((item, index) => (
                    <Card className="col-xs-1" style={{ width: '18rem' }} key={index}>
                        <Card.Img variant="top" src={item.cid} />
                        <Card.Body>
                            <Card.Title>{item.contractAddress}</Card.Title>
                            <Card.Text style={{textAlign: "center"}}>NFT n°{item.tokenId}</Card.Text>
                            <div className="row justify-content-center">
                                <Button 
                                    variant="outline-dark" 
                                    onClick={() => {
                                        navigate("/listItem/" + item.contractAddress + "/" + item.tokenId + "/" + item.cid.substring(34));
                                    }}>
                                    List
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>  
                ))}
            </div>
        </div>
    );
};

export default Inventory;