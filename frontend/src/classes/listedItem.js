export default class ListedItem {
    constructor(imageAddress, tokenId, itemId, contractAddress, seller, price) {
        this.imageAddress = imageAddress;
        this.tokenId = tokenId;
        this.itemId = itemId;
        this.contractAddress = contractAddress;
        this.seller = seller;
        this.price = price;
    }
}