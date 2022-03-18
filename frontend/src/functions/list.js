import abiAgora from '../abiAgora.json';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

//approve token before a transfer
export default async function List(nftAddress, agoraAddress, tokenId){
    let provider = await detectEthereumProvider();
    provider = new ethers.providers.Web3Provider(provider);
    const signer = provider.getSigner();

    const Agora = new Contract(
        agoraAddress,
        abiAgora,
        signer
    );

    let tx = await Agora.listItem(nftAddress, tokenId, '1000000', { value: ethers.utils.parseEther('0.01') });
    await tx.wait();
};