const Hash = require('ipfs-only-hash');
const nbImages = 25;
const fs = require('fs')

hashCanvas = async (image) => {
    const imageHash = await Hash.of(image);
    return imageHash
}

generateMetadata = async () => {
    for (let i = 0; i < nbImages; i++ ){

        const img = fs.readFileSync('./images/' + i + '.png');
        let hash = await hashCanvas(img);
        console.log(hash);

        let tempMetadata = {
            image: 'ipfs://' + hash,
        };

        fs.writeFileSync('./metadata/' + i + '.JSON', JSON.stringify(tempMetadata));
    }
}

(() => {
    generateMetadata();
  })();
