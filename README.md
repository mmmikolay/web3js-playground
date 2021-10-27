## Usage

* Run `npm install` on first cloning the repository,
* Provide a websocket address as instructed in `main.ts`,
* Run `npm run start` or `ts-node main.ts` to see the example code work,

**optional**: run `tsc` to build your code to js. 

### Adding A New ABI

* Go to https://etherscan.io, and copy the contract address, and ABI code of the contract you want to instantiate,
* Add a new `.json` file to `abi` folder,
* Go to `dictionaries/abiDictionary.ts`, import the json file and add it as a new entry,
* Go to `dictionaries/providerDictionary.ts`, add the contract address you copied as a new entry.

### Using Web3WSEntity
* Create a new instance of `Web3WSEntity` with the websocket url you have provided,
* Call `createContract` method of the entity with correct ABI and CONTRACT_ADDRESS parameters.

