const Web3 = require('web3').default;
const fs = require('fs');

// Inicializar Web3
const web3 = new Web3('http://localhost:8545'); // Nodo RPC específico

// Cargar ABI y bytecode del contrato
const contractABI = JSON.parse(fs.readFileSync('./Counter.abi', 'utf-8'));
const contractBytecode = '0x' + fs.readFileSync('./Counter.bin', 'utf-8').trim();

const privateKey = '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'

// Función para desplegar el contrato
async function deployContract() {
  try {
    // Obtener la cuenta desde la clave privada
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);

    // Obtener el balance de la cuenta
    const balance = await web3.eth.getBalance(account.address);
    const balanceInEth = web3.utils.fromWei(balance, 'ether');
    console.log('Account balance:', balanceInEth, 'ETH');

    // Verificar si el balance es suficiente
    if (parseFloat(balanceInEth) < 0.1) { // Ajustar el umbral según sea necesario
      throw new Error('Insufficient balance to deploy the contract');
    }

    // Crear una instancia del contrato
    const myContract = new web3.eth.Contract(contractABI);

    // Definir la transacción de despliegue
    const deployTx = myContract.deploy({
      data: contractBytecode,
      arguments: [] // Argumentos del constructor (si los hay)
    });

    // Estimar el gas necesario para el despliegue
    const gasEstimate = await deployTx.estimateGas({ from: account.address });
    console.log('Gas estimate:', gasEstimate);

    // Obtener el precio del gas
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Gas Price (wei):', gasPrice);

    // Calcular el costo total en ETH
    const totalCostInEth = web3.utils.fromWei((gasEstimate * gasPrice).toString(), 'ether');
    console.log('Total cost (in ETH):', totalCostInEth);

    // Crear opciones de la transacción
    const rawTxOptions = {
      nonce: await web3.eth.getTransactionCount(account.address),
      from: account.address,
      data: deployTx.encodeABI(),
      gas: gasEstimate,
      gasPrice: gasPrice,
    };

    console.log("Firmando la transacción...");
    const signedTx = await web3.eth.accounts.signTransaction(rawTxOptions, privateKey);

    console.log("Enviando la transacción...");
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Contrato desplegado en la dirección:', receipt.contractAddress);
  } catch (error) {
    console.error('Error desplegando el contrato:', error);
  }
}

// Llamar a la función para desplegar el contrato
deployContract();