import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import Buy from '../../functions/buy.js';
const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';
const nftAddress = '0xd7c3FCE1422004B127D83a16eA444F48A482dA6D';

const BuyItem = () => {

    const { tokenId, itemId, contractAddress, price, imageAddress } = useParams();
    const src = "https://ipfs.moralis.io:2053/ipfs/" + imageAddress

    return(
        <div>
            Buy this item : <br></br>
            <img src = {src} alt="NFT"/>
            Contract {contractAddress}<br></br>
            Token number {tokenId}
            Price {price}

            <Button 
                variant="outline-dark" 
                onClick={() => {
                    Buy(nftAddress, agoraAddress, itemId, price);
                }}>
                Buy
            </Button>
        </div>
    );

};

export default BuyItem;