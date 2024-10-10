var Web3 = require('web3').default;

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let create_account = web3.eth.accounts.create(web3.utils.randomHex(32));
console.log(create_account);
console.log(create_account.privateKey);

