import ListedItem from '../classes/listedItem.js'
import GetContract from './getContract.js';

//load every nfts from contract owned by a wallet
export default async function LoadNFTsContract(contract){
    let items = [];
    let baseURL = "https://ipfs.moralis.io:2053/ipfs/";
    let endURL = ".JSON";

    let nbItems = await contract.count();
    nbItems = parseInt(nbItems._hex, 16);

    for(let i = 0; i < nbItems; i++){

        let itm = await contract.getItemById(i);
        let tokenId = parseInt(itm.tokenId._hex, 16);
        let con = await GetContract(itm.nftContract);
        let tokenURI = await con.tokenURI(tokenId);

        let price = parseInt(itm.price._hex, 16);
        price = price * Math.pow(10, -18);

        let data = await fetch(baseURL + tokenURI.substring(7) + endURL);
        let output = await data.text();
        let json = JSON.parse(output);

        items.push(new ListedItem(baseURL + json.image.substring(7), tokenId, i, con.address, itm.seller, price))

    }
    
    return items
};