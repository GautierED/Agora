import { useParams } from "react-router-dom";
import { Card, FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useState } from "react";
import ApproveTransfer from '../../functions/approve.js';
import List from '../../functions/list.js';
const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';

const ListItem = () => {

    const [price, setPrice] = useState(0.00);

    const { tokenId, contractAddress, cid } = useParams();
    const imgSrc = "https://ipfs.moralis.io:2053/ipfs/" + cid

    return(
        <div>
            <div className="row justify-content-center">
                <Card className="col-xs-1" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imgSrc} />
                    <Card.Body>
                        <Card.Title>{contractAddress}</Card.Title>
                        <Card.Text style={{textAlign: "center"}}>NFT n°{tokenId}</Card.Text>
                    </Card.Body>
                </Card> 
            </div> 

            <div className="row justify-content-center">
                Set ETH price
                <FormControl
                    style={{textAlign: "center"}}
                    aria-label="price"
                    aria-describedby="basic-addon2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="row justify-content-center">
                <Button 
                    variant="outline-dark" 
                    onClick={() => {
                        ApproveTransfer(contractAddress, agoraAddress, tokenId);
                    }}>
                    Approve
                </Button>

                <Button 
                    variant="outline-dark" 
                    onClick={() => {
                        if(!isNaN(price)){
                            List(contractAddress, agoraAddress, tokenId, price);
                        } 
                    }}>
                    List
                </Button>
            </div>
        </div>
    );

};

export default ListItem;