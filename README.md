# Truffle Mint Dai

This repo is a [Truffle](https://www.trufflesuite.com) project as an accompanying supplement to the article [Forking Ethereum Mainnet: Mint Your Own Dai](https://medium.com/ethereum-grid/forking-mainnet-for-an-easy-local-ethereum-developer-environment-d8b62a82b3f7).

This repo contains a test suite that shows you how you can mint your own Dai on a forked Mainnet with a contract called `ForceSend.sol` to send ether to the Dai ERC20 contract so you can call its own function `mint` for your newly generated `ganache-cli` addresses.

See the article for more. Please run `ganache-cli` with the `fork` and `unlock` args as so:

`ganache-cli --fork NODE_URL --unlock 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359 --unlock 0xdfbaf3e4c7496dad574a1b842bc85b402bdc298d`

or as an alias, edit your `/.profile` and add at the bottom:

`export ETHEREUM_NODE=http://localhost:8546`

Then reload it with:

`source ~/.profile`

Then in this directory run:

`yarn ganache`

### Development

To set up your dev environment, run `yarn`.

#### Tests

After your forked Mainnet with `ganache-cli` is up and running, simply run `yarn test`.

You should expect output like below:

![Sample Test Output](https://i.imgur.com/dZ9JJuf.png)
