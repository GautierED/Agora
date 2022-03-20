import abiDoodles from '../abiDoodles.json';
import {ethers, Contract } from 'ethers';

//approve token before a transfer
export default async function ApproveTransfer(from, to, tokenId){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const Doodles = new Contract(
        from,
        abiDoodles,
        signer
    );

    const tx = await Doodles.approve(to, tokenId);
    await tx.wait();
};