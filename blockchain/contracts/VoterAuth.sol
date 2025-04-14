// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract VoterAuth {
    address public admin;

    mapping(bytes32 => bool) private registeredVoters;
    mapping(bytes32 => bool) private hasVoted;

    event VoterRegistered(bytes32 indexed aadhaarHash);
    event VoteStatusUpdated(bytes32 indexed aadhaarHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

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

    function markAsVoted(bytes32 aadhaarHash) external onlyAdmin {
        require(registeredVoters[aadhaarHash], "Voter not registered.");
        require(!hasVoted[aadhaarHash], "Voter already voted.");
        hasVoted[aadhaarHash] = true;
        emit VoteStatusUpdated(aadhaarHash);
    }
}
