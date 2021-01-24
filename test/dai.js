const { expect } = require('chai');
const { BN, ether, balance } = require('@openzeppelin/test-helpers');
const daiABI = require('./abi/dai');

// userAddress and daiAddress must be unlocked in ganache-cli using --unlock
const userAddress = '0x7566126f2fd0f2dddae01bb8a6ea49b760383d5a';
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3.eth.Contract(daiABI, daiAddress);

contract('Truffle Mint DAI', async (accounts) => {
  it('should send ether to the DAI address', async () => {
    // Send 0.1 eth to userAddress to have gas to send an ERC20 tx.
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: userAddress,
      value: ether('0.1'),
    });
    const ethBalance = await balance.current(userAddress);
    expect(new BN(ethBalance)).to.be.bignumber.least(new BN(ether('0.1')));
  });

  it('should mint DAI for our first 5 generated accounts', async () => {
    // Verify dai balance
    const daiBalance = await daiContract.methods.balanceOf(userAddress).call();
    expect(new BN(daiBalance)).to.be.bignumber.least(ether('500'));

    // Send 100 DAI to the first 5 accounts
    for (const account of accounts.slice(0, 5)) {
      // daiAddress is passed to ganache-cli with flag `--unlock`
      // so we can use the `transfer` method
      await daiContract.methods
        .transfer(account, ether('100').toString())
        .send({ from: userAddress, gasLimit: 800000 });
      const daiBalance = await daiContract.methods.balanceOf(account).call();
      expect(new BN(daiBalance)).to.be.bignumber.least(ether('100'));
    }
  });
});
