import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import ApproveTransfer from '../../functions/approve.js';
import List from '../../functions/list.js';
const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';

const ListItem = () => {

    const { tokenId, contractAddress, imageAddress } = useParams();
    const src = "https://ipfs.moralis.io:2053/ipfs/" + imageAddress

    return(
        <div>
            List my item : <br></br>
            <img src = {src} alt="NFT"/>
            Contract {contractAddress}<br></br>
            Token number {tokenId}

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
    );

};

export default ListItem;