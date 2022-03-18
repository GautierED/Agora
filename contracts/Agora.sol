// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Agora is IERC721Receiver {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.01 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    function onERC721Received(
        address, 
        address, 
        uint256, 
        bytes calldata
    )external override returns(bytes4) {
            return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    } 

    struct Item {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
    }

    mapping(uint256 => Item) private idItem;

    function listItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
    
        idItem[itemId] =  Item(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            price
        );

        payable(msg.sender).transfer(listingPrice);
        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);
    }

    function buyItem(
        address nftContract,
        uint256 itemId
    ) public payable {
        uint price = idItem[itemId].price;
        uint tokenId = idItem[itemId].tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        _itemsSold.increment();
        delete idItem[itemId];
    }

    function getItemById(uint256 Id) public view returns (Item memory) {
        Item memory itm = idItem[Id];
        return itm;
    }

}