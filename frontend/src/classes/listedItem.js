export default class ListedItem {
    constructor(cid, tokenId, itemId, contractAddress, seller, price) {
        this.cid = cid;
        this.tokenId = tokenId;
        this.itemId = itemId;
        this.contractAddress = contractAddress;
        this.seller = seller;
        this.price = price;
    }
}