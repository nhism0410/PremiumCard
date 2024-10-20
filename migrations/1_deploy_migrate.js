const ItemManager = artifacts.require("ItemManager");
const Item = artifacts.require("Item");

module.exports = async function (deployer) {
  // Deploy the ItemManager contract
  await deployer.deploy(ItemManager);
  const itemManagerInstance = await ItemManager.deployed();

  // Define the parameters for the Item contract
  const priceInWei = web3.utils.toWei("1", "ether"); // Example price
  const index = 0; // Example index

  // Deploy the Item contract with all required parameters
  await deployer.deploy(Item, itemManagerInstance.address, priceInWei, index);
};
