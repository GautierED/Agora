import React from 'react';

//load every nfts from contract owned by a wallet
export default async function LoadOwnedFromContract(contract, wallet, itemsList){
    const imgs = [];

    let baseURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
    let supply = await contract.totalSupply();
    supply = parseInt(supply._hex, 16);

    for(var tokenId = 0; tokenId < supply; tokenId++){
        let ownerAddress = await contract.ownerOf(tokenId);
        let tokenURI = await contract.tokenURI(tokenId);

        if(ownerAddress.toLowerCase() === wallet.toLowerCase()){

            itemsList.push({

                id:tokenId,
                owner: ownerAddress,
                uri:tokenURI,

            });

            let data = await fetch(baseURL + tokenURI.substring(7));
            let output = await data.text();
            let json = JSON.parse(output);

            imgs.push(baseURL + json.image.substring(7))
        }

    }

    const images = []

    //push every nfts images 
    for(const[index, value] of imgs.entries()){
        images.push(<img src={value} key = {index}/>)
    }

    return images
};