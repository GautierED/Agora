import Item from '../classes/item.js'
import { Contract } from 'ethers';
import { contracts } from "../contracts";

//load every nfts from contract owned by a wallet
export default async function LoadNFTsByWallet(wallet,signer){
    let items = [];
    let baseURL = "https://ipfs.moralis.io:2053/ipfs/";
    let endURL = ".JSON";

    const unresolved = contracts.map(async(data) => {
        let address = data.address;
        let abi = data.abi;
        let name = data.name;
    
        const contract = new Contract(
            address,
            abi,
            signer
        );
            
        let supply = await contract.totalSupply();
        supply = parseInt(supply._hex, 16);
    
        for(let tokenId = 0; tokenId < supply; tokenId++){
            let ownerAddress = await contract.ownerOf(tokenId);
            let tokenURI = await contract.tokenURI(tokenId);
    
            if(ownerAddress.toLowerCase() === wallet.toLowerCase()){
    
                let data;
                if(name === 'Doodles'){
                    data = await fetch(baseURL + tokenURI.substring(7) + endURL);
                } else {
                    data = await fetch(baseURL + tokenURI.substring(7));
                }
                
                let output = await data.text();
                let json = JSON.parse(output);
    
                items.push(new Item(baseURL + json.image.substring(7), tokenId, contract.address))
            }
        }
    
    })

    await Promise.all(unresolved);
    return items;

};