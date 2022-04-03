import abiDoodles from '../abiDoodles.json';
import {ethers, Contract } from 'ethers';

//return a contract from an address and an abi
export default async function GetContract(contractAddress){
    
    let provider = new ethers.providers.Web3Provider(window.$provider);
    const signer = provider.getSigner();

    const con = new Contract(
        contractAddress,
        abiDoodles,
        signer
    );

    return con; 
};