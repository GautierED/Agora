import { useParams } from "react-router-dom";

const SellItem = () => {

    const { idToken, contractAddress, imageAddress } = useParams();
    const src = "https://ipfs.moralis.io:2053/ipfs/" + imageAddress

    return(
        <div>
            Sell my item : <br></br>
            <img src = {src} alt="NFT"/>
            Contract {contractAddress}<br></br>
            Token number {idToken}
        </div>
    );

};

export default SellItem;