    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract Voting {
        address public admin;
        bool public votingEnded;

        string[] public candidateList;
        mapping(string => uint256) public votesReceived;
        mapping(address => bool) public hasVoted;

        constructor(string[] memory candidateNames) {
            admin = msg.sender;
            candidateList = candidateNames;
            votingEnded = false;
        }

        function voteForCandidate(string memory candidate) public {
            require(!votingEnded, "Voting has ended");
            require(!hasVoted[msg.sender], "You have already voted");
            require(validCandidate(candidate), "Candidate not found");

            votesReceived[candidate] += 1;
            hasVoted[msg.sender] = true;
        }

        function totalVotesFor(string memory candidate) public view returns (uint256) {
            require(validCandidate(candidate), "Candidate not found");
            return votesReceived[candidate];
        }

        function endVoting() public {
            require(msg.sender == admin, "Only admin can end voting");
            votingEnded = true;
        }

        function getWinner() public view returns (string memory winner) {
            require(votingEnded, "Voting not ended yet");

            uint256 maxVotes = 0;
            for (uint i = 0; i < candidateList.length; i++) {
                if (votesReceived[candidateList[i]] > maxVotes) {
                    maxVotes = votesReceived[candidateList[i]];
                    winner = candidateList[i];
                }
            }
        }

        function candidateListLength() public view returns (uint256) {
            return candidateList.length;
        }

        function validCandidate(string memory candidate) internal view returns (bool) {
            for (uint i = 0; i < candidateList.length; i++) {
                if (keccak256(bytes(candidateList[i])) == keccak256(bytes(candidate))) {
                    return true;
                }
            }
            return false;
        }
    }
