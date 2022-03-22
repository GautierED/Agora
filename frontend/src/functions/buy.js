import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';

//approve token before a transfer
export default async function Buy(nftAddress, agoraAddress, itemId, price){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    let tx = await Agora.buyItem(nftAddress, itemId, { value: ethers.utils.parseEther('0.01') });
    await tx.wait();
};