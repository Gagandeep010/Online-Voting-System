// src/utility/BlockchainVoteService.ts

import Web3 from "web3";

/**
 * Blockchain Vote Service
 * Handles interaction with the Election smart contract
 */

export interface VoteRecord {
  voterAdharID: string;
  candidateID: string;
  timestamp: number;
  txHash?: string;
}

class BlockchainVoteService {
  private web3Instance: Web3 | null = null;
  private contractInstance: any = null;
  private contractAddress: string;
  private contractABI: any;

  constructor() {
    this.contractAddress =
      process.env.ELECTION_CONTRACT_ADDRESS ||
      "0x44e99AF3127E4662beE4C2b1bA1d380F5510638f";
    
    // You'll need to import your Election contract ABI
    // For now, we'll use a basic ERC20-like structure
    this.contractABI = [];
  }

  /**
   * Initialize Web3 connection
   */
  async initialize(): Promise<void> {
    try {
      const blockchainNodeURL =
        process.env.BLOCKCHAIN_NODE_URL || "http://127.0.0.1:8545";
      
      this.web3Instance = new Web3(blockchainNodeURL);

      // Verify connection
      const isConnected = await this.web3Instance.eth.net.isListening();
      if (!isConnected) {
        throw new Error("Unable to connect to blockchain node");
      }

      console.log("Blockchain connection established");
    } catch (error) {
      console.error("Error initializing blockchain service:", error);
      throw error;
    }
  }

  /**
   * Set contract ABI (must be called before using contract methods)
   */
  setContractABI(abi: any[]): void {
    this.contractABI = abi;
  }

  /**
   * Get contract instance
   */
  private getContractInstance(): any {
    if (!this.web3Instance) {
      throw new Error("Blockchain service not initialized");
    }

    if (!this.contractInstance) {
      this.contractInstance = new this.web3Instance.eth.Contract(
        this.contractABI,
        this.contractAddress
      );
    }

    return this.contractInstance;
  }

  /**
   * Record vote on blockchain
   * This function assumes your Election contract has a recordVote method
   */
  async recordVote(voteData: VoteRecord): Promise<string> {
    try {
      if (!this.web3Instance) {
        throw new Error("Blockchain service not initialized");
      }

      const contract = this.getContractInstance();

      // Get the account that will sign the transaction
      const accounts = await this.web3Instance.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts available for signing");
      }

      const fromAccount = accounts[0];

      // Create transaction data
      // Adjust method parameters based on your Election.sol contract
      const txData = contract.methods
        .recordVote(voteData.candidateID, voteData.voterAdharID)
        .encodeABI();

      // Estimate gas
      const gas = await this.web3Instance.eth.estimateGas({
        from: fromAccount,
        to: this.contractAddress,
        data: txData,
      });

      // Send transaction
      const tx = {
        from: fromAccount,
        to: this.contractAddress,
        data: txData,
        gas: gas,
      };

      const receipt = await this.web3Instance.eth.sendTransaction(tx);

      // Convert transactionHash to string if it's Bytes type
      const txHashString = typeof receipt.transactionHash === 'string' 
        ? receipt.transactionHash 
        : receipt.transactionHash?.toString() || '';
      
      console.log("Vote recorded on blockchain:", txHashString);
      return txHashString;
    } catch (error) {
      console.error("Error recording vote on blockchain:", error);
      throw new Error("Failed to record vote on blockchain");
    }
  }

  /**
   * Get vote count for a candidate from blockchain
   */
  async getVoteCount(candidateID: string): Promise<number> {
    try {
      if (!this.contractInstance) {
        const contract = this.getContractInstance();
        // Adjust method name based on your Election.sol contract
        const count = await contract.methods.getVoteCount(candidateID).call();
        return parseInt(count, 10);
      }

      return 0;
    } catch (error) {
      console.error("Error getting vote count:", error);
      throw new Error("Failed to retrieve vote count from blockchain");
    }
  }

  /**
   * Verify vote on blockchain
   */
  async verifyVote(txHash: string): Promise<boolean> {
    try {
      if (!this.web3Instance) {
        throw new Error("Blockchain service not initialized");
      }

      const receipt = await this.web3Instance.eth.getTransactionReceipt(txHash);
      // receipt.status is bigint (1 for success, 0 for failure)
      return receipt !== null && receipt.status === BigInt(1);
    } catch (error) {
      console.error("Error verifying vote:", error);
      return false;
    }
  }

  /**
   * Get blockchain account balance
   */
  async getAccountBalance(address: string): Promise<string> {
    try {
      if (!this.web3Instance) {
        throw new Error("Blockchain service not initialized");
      }

      const balance = await this.web3Instance.eth.getBalance(address);
      return this.web3Instance.utils.fromWei(balance, "wei");
    } catch (error) {
      console.error("Error getting account balance:", error);
      throw error;
    }
  }

  /**
   * Get current network information
   */
  async getNetworkInfo(): Promise<any> {
    try {
      if (!this.web3Instance) {
        throw new Error("Blockchain service not initialized");
      }

      const networkId = await this.web3Instance.eth.net.getId();
      const blockNumber = await this.web3Instance.eth.getBlockNumber();
      const gasPrice = await this.web3Instance.eth.getGasPrice();

      return {
        networkId,
        blockNumber,
        gasPrice: this.web3Instance.utils.fromWei(gasPrice, "gwei"),
      };
    } catch (error) {
      console.error("Error getting network info:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const blockchainService = new BlockchainVoteService();

export default BlockchainVoteService;
