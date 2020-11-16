const XMunToken = artifacts.require('XMunToken.sol')
const MasterChef = artifacts.require('MasterChef.sol')

module.exports = async function(deployer) {
  // Deploy Sushi Token
  await deployer.deploy(XMunToken)
  const sushiToken = await XMunToken.deployed()

  // Deploy Masterchef Contract
  await deployer.deploy(
    MasterChef,
    sushiToken.address,
    process.env.DEV_ADDRESS, // Your address where you get sushi tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  )

  // Make Masterchef contract token owner
  const masterChef = await MasterChef.deployed()
  await sushiToken.transferOwnership(masterChef.address)

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false
  )

  // Add more liquidity pools here upon deployment, or add them later manually
   // Add Liquidity pool for rewards, e.g., "ETH/BAT Pool"
  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_1,
    false
  )

  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_2,
    false
  )

  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_3,
    false
  )
}
