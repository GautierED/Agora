import React from 'react';
import Item from '../classes/item.js'

//load every nfts from contract owned by a wallet
export default async function LoadOwnedFromContract(contract, wallet){
    const items = [Item];

    //cant use infura api anymore for some reason
    //let baseURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
    let baseURL = "https://ipfs.moralis.io:2053/ipfs/"
    let supply = await contract.totalSupply();
    supply = parseInt(supply._hex, 16);

    for(var tokenId = 0; tokenId < supply; tokenId++){
        let ownerAddress = await contract.ownerOf(tokenId);
        let tokenURI = await contract.tokenURI(tokenId);

        if(ownerAddress.toLowerCase() === wallet.toLowerCase()){

            let data = await fetch(baseURL + tokenURI.substring(7));
            let output = await data.text();
            let json = JSON.parse(output);

            items.push(new Item(baseURL + json.image.substring(7), contract.address))
        }

    }

    return items
};