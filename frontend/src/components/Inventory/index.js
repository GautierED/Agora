import React, { useState, useEffect } from 'react';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';


import contractABI from '../../abi.json';

const contractAddress = '0x2aBf143BF98197f1cE3893F882f3b3222d0cFcc9';
const bscChainId = '97';

const ipfsClient = require("ipfs-http-client");
/*
const client = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
*/

const Inventory = () => {

    const [userAddress, setUserAddress] = useState(undefined);
    const [chainId, setChainId] = useState(undefined);
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        let itemsList = [];
        const init = async () => {

            let provider = await detectEthereumProvider();
            if(provider){

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if(accounts[0]){

                    setUserAddress(accounts[0]);

                    let chain = await provider.request({ method: 'eth_chainId' });
                    chain = String(parseInt(chain, 16));
                    setChainId(chain);

                    if(chain === bscChainId){

                        provider = new ethers.providers.Web3Provider(provider);
                        const signer = provider.getSigner();

                        const contract = new Contract(
                            contractAddress,
                            contractABI,
                            signer
                        );

                        loadInventory(contract, itemsList);

                    } else alert('Please switch to the binance smart chain');

                } else alert('Pease login with Metamask');

            } else alert('Please install Metamask');
            
        };    
        init();
    }, []);    

    window.ethereum.on('accountsChanged', (_account) => window.location.reload());
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    async function loadInventory(contract, itemsList){
        let baseURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
        let supply = await contract.totalSupply();
        supply = parseInt(supply._hex, 16);

        for(var tokenId = 0; tokenId < supply; tokenId++){
            let ownerAddress = await contract.ownerOf(tokenId);
            let tokenURI = await contract.tokenURI(tokenId);
            
            itemsList.push({

                id:tokenId,
                owner: ownerAddress,
                uri:tokenURI,

            });

            let data = await fetch(baseURL + tokenURI.substring(7));
            let output = await data.text();
            let json = JSON.parse(output);

            setImgs(imgs => [...imgs, baseURL + json.image.substring(7)]);
        }

    };

    const images = []

    for(const[index, value] of imgs.entries()){
        images.push(<img src={value}/>)
    }

    return (
        <div>
            {userAddress}<br></br>
            {chainId}<br></br>
            {images}
        </div>
    );
};

export default Inventory;