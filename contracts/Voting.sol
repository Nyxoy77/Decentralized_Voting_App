// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public votingEnded;
    string[] public candidateList;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;
    address[] public votedAccounts;
    string public winner;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        candidateList = candidateNames;
        votingEnded = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addCandidate(string memory candidateName) public onlyAdmin {
        candidateList.push(candidateName);
    }

    function voteForCandidate(string memory candidate) public {
        require(!votingEnded, "Voting has ended");
        require(!hasVoted[msg.sender], "You have already voted");
        require(validCandidate(candidate), "Candidate not found");

        votesReceived[candidate] += 1;
        hasVoted[msg.sender] = true;
        votedAccounts.push(msg.sender);
    }

    function totalVotesFor(string memory candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Candidate not found");
        return votesReceived[candidate];
    }

    function endVoting() public onlyAdmin {
        votingEnded = true;

        uint256 maxVotes = 0;
        for (uint i = 0; i < candidateList.length; i++) {
            if (votesReceived[candidateList[i]] > maxVotes) {
                maxVotes = votesReceived[candidateList[i]];
                winner = candidateList[i];
            }
        }
    }

    function getWinner() public view returns (string memory) {
        require(votingEnded, "Voting not ended yet");
        return winner;
    }

    function validCandidate(string memory candidate) internal view returns (bool) {
        for (uint i = 0; i < candidateList.length; i++) {
            if (keccak256(bytes(candidateList[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }

    function resetElection(string[] memory newCandidates) public onlyAdmin {
        require(votingEnded, "Voting not ended yet");

        // Reset candidates and votes
        for (uint i = 0; i < candidateList.length; i++) {
            votesReceived[candidateList[i]] = 0;
        }
        delete candidateList;
        for (uint i = 0; i < newCandidates.length; i++) {
            candidateList.push(newCandidates[i]);
        }

        // Reset voter status
        for (uint i = 0; i < votedAccounts.length; i++) {
            hasVoted[votedAccounts[i]] = false;
        }
        delete votedAccounts;

        // Reset state
        votingEnded = false;
        winner = "";
    }

    function candidateListLength() public view returns (uint256) {
        return candidateList.length;
    }
}
