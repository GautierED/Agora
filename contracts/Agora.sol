// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Agora is IERC721Receiver {

    uint public count; 
    address payable owner;
    uint256 listingPrice = 0.01 ether;

    event itemListed(address nftContract, uint256 tokenId, uint256 price);
    event itemBought(address nftContract, uint256 tokenId, uint256 price, address buyer);

    constructor() {
        count = 0;
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
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
    }

    mapping(uint256 => Item) private items;

    function listItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");
    
        items[count] =  Item(
            nftContract,
            tokenId,
            payable(msg.sender),
            price
        );

        count++;

        payable(msg.sender).transfer(listingPrice);
        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);

        emit itemListed(nftContract, tokenId, price);

    }

    function buyItem(
        uint256 id
    ) public payable {
        address nftContract = items[id].nftContract;
        uint price = items[id].price;
        uint tokenId = items[id].tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        items[id].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        remove(id);
        emit itemBought(nftContract, tokenId, price, msg.sender);
    }

     function remove(uint index) public {
        if (index >= count) return;
        items[index] = items[count-1];
        delete items[count-1];
        count--;
    }

    function getItemById(uint256 id) public view returns (Item memory) {
        Item memory itm = items[id];
        return itm;
    }

}