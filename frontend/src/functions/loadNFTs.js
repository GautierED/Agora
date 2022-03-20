import Item from '../classes/item.js'

//load every nfts from contract owned by a wallet
export default async function LoadNFTs(contract, wallet){
    let items = [];

    //cant use infura api anymore for some reason
    //let baseURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
    let baseURL = "https://ipfs.moralis.io:2053/ipfs/";
    let endURL = ".JSON";
    let supply = await contract.totalSupply();
    supply = parseInt(supply._hex, 16);

    for(let tokenId = 0; tokenId < supply; tokenId++){
        let ownerAddress = await contract.ownerOf(tokenId);
        let tokenURI = await contract.tokenURI(tokenId);

        if(ownerAddress.toLowerCase() === wallet.toLowerCase()){

            let data = await fetch(baseURL + tokenURI.substring(7) + endURL);
            let output = await data.text();
            let json = JSON.parse(output);

            items.push(new Item(baseURL + json.image.substring(7), tokenId, contract.address))
        }
    }

    return items
};