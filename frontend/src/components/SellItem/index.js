import { useParams, useRoutes } from "react-router-dom";

const SellItem = () => {

    const { idToken, contractAddress } = useParams();

    return(
        <div>
            Sell my item : <br></br>
            Contract {contractAddress}<br></br>
            Token number {idToken}
        </div>
    );

};

export default SellItem;