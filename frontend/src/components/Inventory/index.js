import React, { useState, useEffect } from 'react';
import {ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';


import abiNFT from '../../abiNFT.json';
import abiAgora from '../../abiAgora.json';

const nftAddress = '0x2aBf143BF98197f1cE3893F882f3b3222d0cFcc9';
const agoraAddress = '0xBDb7828472FA1Cb332a1128636a53b2996B11BCC';


const bscChainId = '97';

const ipfsClient = require("ipfs-http-client");

const Inventory = () => {

    const [userAddress, setUserAddress] = useState(undefined);
    const [chainId, setChainId] = useState(undefined);
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        setImgs([]);
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
                            nftAddress,
                            abiNFT,
                            signer
                        );

                        //loadFromContract(contract, itemsList)
                        loadOwnedFromContract(contract, agoraAddress, itemsList);

                    } else alert('Please switch to the binance smart chain');

                } else alert('Pease login with Metamask');

            } else alert('Please install Metamask');
            
        };    
        init();
    }, []);    

    window.ethereum.on('accountsChanged', (_account) => window.location.reload());
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    //load every nfts from a contract
    async function loadFromContract(contract, itemsList){
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

    //load every nfts from contract owned by a wallet
    async function loadOwnedFromContract(contract, wallet, itemsList){
        let baseURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
        let supply = await contract.totalSupply();
        supply = parseInt(supply._hex, 16);

        for(var tokenId = 0; tokenId < supply; tokenId++){
            let ownerAddress = await contract.ownerOf(tokenId);
            let tokenURI = await contract.tokenURI(tokenId);

            if(ownerAddress.toLowerCase() === wallet.toLowerCase()){

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

        }

    };

    const images = []

    //push every nfts images 
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