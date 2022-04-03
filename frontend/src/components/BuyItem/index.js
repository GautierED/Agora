import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Buy from '../../functions/buy.js';
const agoraAddress = '0x0160569F5498Ea4252664068C3359ea83564c9Dc';
const nftAddress = '0xd7c3FCE1422004B127D83a16eA444F48A482dA6D';

const BuyItem = () => {

    const { tokenId, itemId, contractAddress, price, cid } = useParams();
    const imgSrc = "https://ipfs.moralis.io:2053/ipfs/" + cid

    return(
        <div>
            <div className="row justify-content-center">
                <Card className="col-xs-1" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imgSrc} />
                    <Card.Body>
                        <Card.Title>{contractAddress}</Card.Title>
                        <Card.Text style={{textAlign: "center"}}>NFT n°{tokenId} <br></br>Price {price} ETH</Card.Text>
                    </Card.Body>
                </Card> 
            </div> 

            <div className="row justify-content-center">
                <Button 
                    variant="outline-dark" 
                    onClick={() => {
                        Buy(nftAddress, agoraAddress, itemId, price);
                    }}>
                    Buy
                </Button>
            </div>
        </div>
    );

};

export default BuyItem;