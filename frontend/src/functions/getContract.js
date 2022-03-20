import abiDoodles from '../abiDoodles.json';
import {ethers, Contract } from 'ethers';

//return a contract from an address
//need a database to store the abi and the name for each contract address
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