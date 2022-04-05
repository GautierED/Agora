import { contracts } from "../contracts";

export default function GetContractAbiByAddress(contractAddress){
    
    let abi = '';

    {contracts.map((data) => {
        if(data.address == contractAddress){
            abi = data.abi;
        }
    })}

    return abi;
};