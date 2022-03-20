export default class ListedItem {
    constructor(imageAddress, tokenId, contractAddress, seller, price) {
        this.imageAddress = imageAddress;
        this.tokenId = tokenId;
        this.contractAddress = contractAddress;
        this.seller = seller;
        this.price = price;
    }
}