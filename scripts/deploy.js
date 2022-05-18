const hre = require("hardhat");

async function main() {
    //get the contract to deploy & deploy
      const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffe");
      const BuyMeACoffee = await BuyMeACoffee.deploy();
      await BuyMeACoffee.deployed();
      console.log("BuyMeACoffee deployed to", BuyMeACoffee.address);
      
}

    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main()
        .then(() => process.exit(0))
        .catch((error) => {
         console.error(error);
         process.exit(1);
        });