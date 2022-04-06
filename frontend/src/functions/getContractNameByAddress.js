import { contracts } from "../contracts";

export default function GetContractNameByAddress(contractAddress){
    
    let name = '';

    {contracts.map((data) => {
        if(data.address === contractAddress){
            name = data.name;
        }
    })}

    return name;
};