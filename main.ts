import { Web3WSEntity } from "./Web3WSEntity";
import { ABIS, CONTRACT_ADDRESSES, PROVIDERS } from "./dictionaries";

// Please go to ./dictionaries/providerDictionary, and write a url as instructed.
const web3Instance = new Web3WSEntity(PROVIDERS.WS);

web3Instance.createContract(ABIS.USDT, CONTRACT_ADDRESSES.USDT);
web3Instance.callContractMethod("name");
