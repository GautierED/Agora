import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';

//approve token before a transfer
export default async function List(contractAddress, agoraAddress, tokenId, price){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    let tx = await Agora.listItem(contractAddress, tokenId, ethers.utils.parseEther(price.toString()), { value: ethers.utils.parseEther('0.01') });
    await tx.wait();
};