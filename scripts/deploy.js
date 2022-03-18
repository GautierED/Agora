async function main() {
    const Agora = await ethers.getContractFactory("Agora");
 
    // Start deployment, returning a promise that resolves to a contract object
    const a = await Agora.deploy();   
    console.log("Contract deployed to address:", a.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });