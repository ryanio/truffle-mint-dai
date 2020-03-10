const { BN, ether, balance } = require('openzeppelin-test-helpers');
const { expect } = require('chai');
const { asyncForEach } = require('./utils');

// Artifacts
const ForceSend = artifacts.require('ForceSend');

// ABI
const erc20ABI = require('./abi/erc20');

// saiAddress must be unlocked using --unlock 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359
const saiAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
const saiContract = new web3.eth.Contract(erc20ABI, saiAddress);

// Utils
const getSaiBalance = async account => {
  return saiContract.methods.balanceOf(account).call();
};

contract('Truffle Mint SAI', async accounts => {
  it('should send ether to the SAI contract', async () => {
    // Send 1 eth to saiAddress to have gas to mint.
    // Uses ForceSend contract, otherwise just sending
    // a normal tx will revert.
    const forceSend = await ForceSend.new();
    await forceSend.go(saiAddress, { value: ether('1') });
    const ethBalance = await balance.current(saiAddress);
    expect(new BN(ethBalance)).to.be.bignumber.least(new BN(ether('1')));
  });

  it('should mint SAI for our first 5 generated accounts', async () => {
    // Get 100 SAI for first 5 accounts
    await asyncForEach(accounts.slice(0, 5), async account => {
      // saiAddress is passed to ganache-cli with flag `--unlock`
      // so we can use the `mint` method.
      await saiContract.methods
        .mint(account, ether('100').toString())
        .send({ from: saiAddress });
      const saiBalance = await getSaiBalance(account);
      expect(new BN(saiBalance)).to.be.bignumber.least(ether('100'));
    });
  });
});
