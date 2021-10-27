import Web3 from "web3";
import { WebsocketProvider } from "web3-core";

export class Web3WSEntity {
  web3: Web3;
  account: any;
  providerUrl: string; /* enter your websocket url here (e.g. ws://31.415.92.653:5897 ) */
  wsProvider: WebsocketProvider;
  activeContract: any;

  constructor(providerUrl: string) {
    this.providerUrl = providerUrl;
    this.wsProvider = new Web3.providers.WebsocketProvider(this.providerUrl);
    this.web3 = new Web3(this.wsProvider);

    this.web3.eth.net
      .isListening()
      .then(() => console.log("Connected to the node"))
      .catch((error: Error) => console.log("Error connectiong to the node"));
  }

  async checkBlock() {
    const { eth, utils } = this.web3;
    const { getBlock, getTransaction } = eth;

    const block = await getBlock("latest");
    const { number, transactions } = block;

    console.log("Searching block" + number);
    if (transactions != null) {
      for (const txHash of transactions) {
        const { value, from } = await getTransaction(txHash);
        console.log("Transaction found on block: ", number);
        console.log({
          address: from,
          value: utils.fromWei(value, "ether"),
        });
      }
    }
  }

  async getBalance(address: string) {
    const { eth, utils } = this.web3;
    const { getBalance } = eth;

    return await getBalance(address, (error, balance) => {
      console.log({ balance: utils.fromWei(balance, "ether") });
    });
  }

  createContract(ABI: any, address: string) {
    const { eth } = this.web3;
    const { Contract } = eth;
    this.activeContract = new Contract(ABI, address);

    return this.activeContract;
  }

  async callContractMethod(methodName: string) {
    if (!this.activeContract) {
      console.log("Please set an active contract first!");
      return;
    }
    console.log("calling contract method ", methodName, "...");
    let result: any;
    try {
      result = await this.activeContract.methods[methodName]().call();
    } catch (error) {
      console.log("Some error occured");
      throw error;
    }
    console.log(result);
    return result;
  }
}
