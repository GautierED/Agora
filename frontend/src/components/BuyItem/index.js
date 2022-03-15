import { useParams } from "react-router-dom";

const BuyItem = () => {

    const { idToken, contractAddress, imageAddress } = useParams();
    const src = "https://ipfs.moralis.io:2053/ipfs/" + imageAddress

    return(
        <div>
            Buy an item : <br></br>
            <img src = {src} alt="NFT"/>
            Contract {contractAddress}<br></br>
            Token number {idToken}
        </div>
    );

};

export default BuyItem;