# Truffle Mint Dai

[![Actions Status](https://github.com/ryanio/truffle-mint-dai/workflows/Build/badge.svg)](https://github.com/ryanio/truffle-mint-dai/actions)

This repo is a [Truffle](https://www.trufflesuite.com) project as an accompanying supplement to the article [Forking Ethereum Mainnet: Mint Your DAI](https://medium.com/ethereum-grid/forking-mainnet-for-an-easy-local-ethereum-developer-environment-d8b62a82b3f7).

This repo contains a test suite that shows you how you can acquire your own DAI on a forked mainnet.

First run `yarn`.

Then, in a separate terminal run:

`ETHEREUM_NODE=https://mainnet.infura.io/v3/your_project_id yarn ganache`

If using geth, `ETHEREUM_NODE` may look like: `http://localhost:8545`

#### Tests

After your forked mainnet with `ganache-cli` is up and running, in a separate terminal run:

`ETHEREUM_NODE=https://mainnet.infura.io/v3/your_project_id yarn test`

You should expect output like below:

![Sample Test Output](https://i.imgur.com/mR2vhMT.png)
