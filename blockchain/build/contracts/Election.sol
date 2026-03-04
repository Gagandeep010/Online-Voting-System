// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Election {
    address public admin;

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(bytes32 => bool) private registeredVoters;
    mapping(bytes32 => bool) private hasVoted;
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;
    bool public votingClosed;

    event VoterRegistered(bytes32 indexed aadhaarHash);
    event VoteCast(bytes32 indexed aadhaarHash, uint candidateId);
    event VotingClosed();

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier votingOpen() {
        require(!votingClosed, "Voting has ended.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // ---------- Admin Controls ----------

    function addCandidate(string memory name) external onlyAdmin {
        candidates[candidateCount] = Candidate(name, 0);
        candidateCount++;
    }

    function closeVoting() external onlyAdmin {
        votingClosed = true;
        emit VotingClosed();
    }

    // ---------- Voter Management ----------

    function registerVoter(bytes32 aadhaarHash) external onlyAdmin {
        require(!registeredVoters[aadhaarHash], "Voter already registered.");
        registeredVoters[aadhaarHash] = true;
        emit VoterRegistered(aadhaarHash);
    }

    function isRegistered(bytes32 aadhaarHash) external view returns (bool) {
        return registeredVoters[aadhaarHash];
    }

    function hasAlreadyVoted(bytes32 aadhaarHash) external view returns (bool) {
        return hasVoted[aadhaarHash];
    }

    // ---------- Voting Logic ----------

    function castVote(bytes32 aadhaarHash, uint candidateId) external votingOpen {
        require(registeredVoters[aadhaarHash], "Voter not registered.");
        require(!hasVoted[aadhaarHash], "Voter already voted.");
        require(candidateId < candidateCount, "Invalid candidate.");

        candidates[candidateId].voteCount++;
        hasVoted[aadhaarHash] = true;
        emit VoteCast(aadhaarHash, candidateId);
    }

    function getVoteCount(uint candidateId) external view returns (uint) {
        require(candidateId < candidateCount, "Invalid candidate.");
        return candidates[candidateId].voteCount;
    }
}
