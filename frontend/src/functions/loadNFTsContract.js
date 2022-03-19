import Item from '../classes/item.js';

//load every nfts from contract owned by a wallet
export default async function LoadNFTsContract(contract){
    const items = [Item];

    //need to read that variable from the contract 
    let nbNFTs = 1;

    let itm = await contract.getItemById(3);
    console.log(itm);

    return items
};