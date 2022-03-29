import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import ApproveTransfer from '../../functions/approve.js';
import List from '../../functions/list.js';
const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';

const ListItem = () => {

    const { tokenId, contractAddress, cid } = useParams();
    const imgSrc = "https://ipfs.moralis.io:2053/ipfs/" + cid

    return(
        <div>
            <div class="row justify-content-center">
                <Card className="col-xs-1" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imgSrc} />
                    <Card.Body>
                        <Card.Title>{contractAddress}</Card.Title>
                        <Card.Text style={{textAlign: "center"}}>NFT n°{tokenId}</Card.Text>
                    </Card.Body>
                </Card> 
            </div> 

            <div class="row justify-content-center">
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
                        List(contractAddress, agoraAddress, tokenId);
                    }}>
                    List
                </Button>
            </div>
        </div>
    );

};

export default ListItem;