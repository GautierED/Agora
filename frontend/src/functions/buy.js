import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';

//approve token before a transfer
export default async function Buy(contractAddress, agoraAddress, tokenId, price){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    let tx = await Agora.buyItem(contractAddress, tokenId, { value: ethers.utils.parseEther(price) });
    await tx.wait();
};