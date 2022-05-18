// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

  // Returns the Etherem balance of a given address.
  async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

    // Logs the Ether balances for a list of addresses.
    async function printBalances(address) {
      let idx = 0;
      for (const address of addresses) {
        console.log('Address ${idx} balance: ', await getBalance(address));
        idx++;
      }
    }

    // Logs the memos stored on-chain from coffee purchases.
    async function printMemos(memos) {
      for (const memo of memos) {
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log('At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"');

      }
    }

    async function main() {
      // get example accounts.
      cont [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

      // Get the contract to  deploy.
      const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffe");
      const BuyMeACoffee = await BuyMeACoffee.deploy();
      await BuyMeACoffee.deployed();
      console.log("==start==");
      await printBalances(addresses);

      // Deploy contract.
     

      // Check balances before th coffee purcashe.
      const addresses = [owner.address, tipper.address, buyMeACoffee.address];
      console.log("==bought coffee==");
      await printBalances(addresses);

      // Buy the owner a few coffess.
      const tip = {value: hre.ethers.utils.parseEther("1")};
      await BuyMeACoffee.connect(tipper).buyCoffee("Carolina", "You're the best!", tip);
      await BuyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing teacher!", tip);
      await BuyMeACoffee.connect(tipper3).buyCoffee("Kay", "YI love my Proof of knowledge NFT", tip);

      // Check balances after cofee purchase.
      console.log("==bought coffee==");
      await printBalances(addresses);

      // Withdraw funds.
      await BuyMeACoffee.connect(owner).withdrawTips();

      // Check balance after withdraw.
      console.log("== withdrawTips ==");
      await printBalances(addresses);

      // Read all the memos left for the owner
      console.log("== memos ==");
      const memos = await buyMeACoffee.getMemos();
      printMemos(memos);
    }
  

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
