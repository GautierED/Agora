import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {ethers, Contract } from 'ethers';
import LoadNFTs from '../../functions/loadNFTs.js';
import abiDoodles from '../../abiDoodles.json';
import {Button} from 'react-bootstrap';
import '../../bootstrap.css';

const nftAddress = '0xd7c3FCE1422004B127D83a16eA444F48A482dA6D';

const Inventory = () => {

    let navigate = useNavigate(); 

    const [items, setItems] =  useState([]);

    useEffect(() => {
        const init = async () => {

            let provider = new ethers.providers.Web3Provider(window.$provider);
            const signer = provider.getSigner();

            const contract = new Contract(
                nftAddress,
                abiDoodles,
                signer
            );

            setItems(await LoadNFTs(contract, window.$account));
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
                            <div class="row justify-content-center">
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