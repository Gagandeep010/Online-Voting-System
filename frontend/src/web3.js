import Web3 from "web3";
import ElectionABI from "./contracts/Election.json";

const getWeb3AndContract = async () => {
  // Connect to local Ganache blockchain
  const web3 = new Web3("http://127.0.0.1:8545");

  // Get accounts from Ganache
  const accounts = await web3.eth.getAccounts();

  // Contract address (copied from truffle migrate)
  const contractAddress = "0x44e99AF3127E4662beE4C2b1bA1d380F5510638f";

  // Create contract instance
  const election = new web3.eth.Contract(ElectionABI.abi, contractAddress);

  return { web3, accounts, election };
};

export default getWeb3AndContract;
