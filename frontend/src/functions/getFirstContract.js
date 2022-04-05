import { contracts } from "../contracts";

export default function GetContractAbiByAddress(contractAddress){
    
    let address = '';

    {contracts.map((data, index) => {
        if(index == 0){
            address = data.address;
        }
    })}
    return address;
};