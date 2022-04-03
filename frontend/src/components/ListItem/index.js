import { useParams } from "react-router-dom";
import { Card, FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useState } from "react";
import ApproveTransfer from '../../functions/approve.js';
import List from '../../functions/list.js';
import GetContractNameByAddress from '../../functions/getContractNameByAddress.js';
const agoraAddress = '0x0160569F5498Ea4252664068C3359ea83564c9Dc';

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
                        <Card.Title style={{textAlign: "center"}}>{GetContractNameByAddress(contractAddress)}</Card.Title>
                        <Card.Text style={{textAlign: "center"}}>n°{tokenId}</Card.Text>
                    </Card.Body>
                </Card> 
            </div> 

            <div className="row justify-content-center">
                <div className="align-self-center">
                    Set ETH price :
                </div>
                <div style={{width:"10%"}}>
                <FormControl
                    className="w-24"
                    style={{textAlign: "center"}}
                    aria-label="price"
                    aria-describedby="basic-addon2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>
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