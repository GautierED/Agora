import { useParams, useRoutes } from "react-router-dom";

const BuyItem = () => {

    const { idToken, contractAddress } = useParams();

    return(
        <div>
            Buy an item : <br></br>
            Contract {contractAddress}<br></br>
            Token number {idToken}
        </div>
    );

};

export default BuyItem;