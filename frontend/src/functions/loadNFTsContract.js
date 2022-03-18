import Item from '../classes/item.js';
import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const agoraAddress = '0x7d1DB53B7e4f31d7018edcFA7045fD68F58A5175';

//load every nfts from contract owned by a wallet
export default async function LoadNFTsContract(){
    const items = [Item];

    let provider = await detectEthereumProvider();
    provider = new ethers.providers.Web3Provider(provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    //

    return items
};