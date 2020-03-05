const {BN, ether, balance} = require("openzeppelin-test-helpers");
const {expect} = require("chai");
const {asyncForEach} = require("./utils");

// Artifacts
const ForceSend = artifacts.require("ForceSend");

// ABI
const erc20ABI = require("./abi/erc20");

// Dai
// daiAddress must be unlocked using --unlock ADDRESS
const daiAddress = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359";
const daiContract = new web3.eth.Contract(erc20ABI, daiAddress);

// Utils
const getDaiBalance = async account => {
  return daiContract.methods.balanceOf(account).call();
};

contract("Truffle Mint Dai", async accounts => {
  it("should send ether to the Dai contract", async () => {
    // Send 1 eth to daiAddress to have gas to mint.
    // Uses ForceSend contract, otherwise just sending
    // a normal tx will revert.
    const forceSend = await ForceSend.new();
    await forceSend.go(daiAddress, {value: ether("1")});
    const ethBalance = await balance.current(daiAddress);
    expect(new BN(ethBalance)).to.be.bignumber.least(new BN(ether("1")));
  });

  it("should mint Dai for our first 5 generated accounts", async () => {
    // Get 100 Dai for first 5 accounts
    await asyncForEach(accounts.slice(0, 5), async account => {
      // daiAddress is passed to ganache-cli with flag `--unlock`
      // so we can use the `mint` method.
      await daiContract.methods
        .mint(account, ether("100").toString())
        .send({from: daiAddress});
      const daiBalance = await getDaiBalance(account);
      expect(new BN(daiBalance)).to.be.bignumber.least(ether("100"));
    });
  });
});
