const Web3 = require('web3');
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/d20a6707063443e2923d57fe03ac6863');
const { ABI, ADDRESS: CONTRACT_ADDRESS } = require('./constants/pizza/contract');
const PIZZA = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
const store = require("../store/index");

PIZZA.events.WithdrawPZA()
    .on('data', event => {
        let {
            userAddress: wallet,
            amount: pizzas
        } = event.returnValues;
        const user = store.default().getters['connection/metamaskAddress'].toLowerCase()

        if (user === wallet.toLowerCase()) {
            store.default()._actions['balance/reduceAmount'][0](pizzas)
        }
    })


PIZZA.events.DepositPZA()
    .on('data', event => {
        let {
            userAddress: wallet,
            amount: pizzas
        } = event.returnValues;
        const user = store.default().getters['connection/metamaskAddress'].toLowerCase()

        if (user === wallet.toLowerCase()) {
            console.log('deposit', wallet, pizzas);
            store.default()._actions['balance/addAmount'][0](pizzas)
        }
    })