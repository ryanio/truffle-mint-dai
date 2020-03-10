# Truffle Mint Dai

This repo is a [Truffle](https://www.trufflesuite.com) project as an accompanying supplement to the article [Forking Ethereum Mainnet: Mint Your Own Dai](https://medium.com/ethereum-grid/forking-mainnet-for-an-easy-local-ethereum-developer-environment-d8b62a82b3f7).

This repo contains a test suite that shows you how you can mint your own DAI or SAI on a forked mainnet.

In a separate terminal run `ganache-cli` with the `fork` and `unlock` args as so:

`ganache-cli --fork NODE_URL --unlock 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359 --unlock 0xdfbaf3e4c7496dad574a1b842bc85b402bdc298d`

If using geth, `NODE_URL` could look like `http://localhost:8545` or if using infura `https://mainnet.infura.io/v3/your_project_id`.

### Development

To set up your dev environment, run `yarn`.

#### Tests

After your forked mainnet with `ganache-cli` is up and running, in a separate terminal simply run `yarn test`.

You should expect output like below:

![Sample Test Output](https://i.imgur.com/f4Vwd77.png)
