const contractABI = [{
    "inputs": [
        {
            "internalType": "string[]",
            "name": "candidateNames",
            "type": "string[]"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [],
    "name": "admin",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "candidateList",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "hasVoted",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "name": "votesReceived",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [],
    "name": "votingEnded",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "candidate",
            "type": "string"
        }
    ],
    "name": "voteForCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "candidate",
            "type": "string"
        }
    ],
    "name": "totalVotesFor",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [],
    "name": "endVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "getWinner",
    "outputs": [
        {
            "internalType": "string",
            "name": "winner",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
{
    "inputs": [],
    "name": "candidateListLength",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
}

];

const contractAddress = "0x0F33C0Dcc6CDE01b4e9aE2FFF21Ee3fF0deca632";
