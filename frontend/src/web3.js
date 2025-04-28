import Web3 from "web3";
import ElectionABI from "./contract/Election.json";

const web3 = new Web3("http://127.0.0.1:8545"); // Ganache CUI default

const getElectionContract = async () => {
  const networkId = await web3.eth.net.getId(); // should be 1337
  const deployedNetwork = ElectionABI.networks[networkId];

  if (!deployedNetwork) {
    throw new Error("⚠️ Contract not deployed on the current network.");
  }

  const contract = new web3.eth.Contract(
    ElectionABI.abi,
    deployedNetwork.address
  );

  return contract;
};

export { web3, getElectionContract };
