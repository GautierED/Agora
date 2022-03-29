import ListedItem from '../classes/listedItem.js'
import GetContract from './getContract.js';

//load every nfts from contract owned by a wallet
export default async function LoadNFTsContract(contract){
    let items = [];
    let baseURL = "https://ipfs.moralis.io:2053/ipfs/";
    let endURL = ".JSON";

    //need to read that variable from the contract 
    let nbNFTs = 1;

    for(let i = 0; i < nbNFTs; i++){

        let itm = await contract.getItemById(12);
        let tokenId = parseInt(itm.tokenId._hex, 16);
        let con = await GetContract(itm.nftContract);
        let tokenURI = await con.tokenURI(tokenId);
        let itemId = parseInt(itm.itemId._hex, 16);
        let price = parseInt(itm.price._hex, 16);
        let data = await fetch(baseURL + tokenURI.substring(7) + endURL);
        let output = await data.text();
        let json = JSON.parse(output);

        items.push(new ListedItem(baseURL + json.image.substring(7), tokenId, itemId, con.address, itm.seller, price))

    }
    
    return items
};