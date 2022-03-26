import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';

//approve token before a transfer
export default async function List(contractAddress, agoraAddress, tokenId){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    let tx = await Agora.listItem(contractAddress, tokenId, ethers.utils.parseEther('0.01'), { value: ethers.utils.parseEther('0.01') });
    await tx.wait();
};