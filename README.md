
## Deploy Blockchain private developer network
Docker compose para levantar una red de desarrollo blockchain para el desarrollo de DAPPS con web3

Requirements:
- docker
- docker compose
- vscode
- node & npm

```
git clone https://github.com/Akaronte/besu-tessera.git
cd besu-tessera
code .
```
Fix new lines change CRLF to LF in file ./config/tessera/generate.sh
```
docker-compose up -d
```

Update network private blockchain con "docker-compose up -d"\
Añadir plugin a metamask al navegador\
Una vez instalado el plugin metamask añadir la red privada manual http://localhost:8545 con id 1337, ha de coincidir con la config de genesis.json\
Importar la clave privada almacena en archivo genesis.json "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"\
Entrar http://localhost:25000/explorer/nodes \
Conectar el wallet con la cuenta creada\
cd wallet\
npm install\
node wallet.js para crear una wallet nueva en la red a la que hacer una transferencia\
Test transaccion and contract\
Test tessera private transaction from tessera node to tessera node\
Check con RemixIDE online con injectedProvider

Ejemplo basado en quorum-dev-quickstart\
referidos:
- https://besu.hyperledger.org/private-networks/tutorials/quickstart\
- https://github.com/Consensys/quorum-dev-quickstart