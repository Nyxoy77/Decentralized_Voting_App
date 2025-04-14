let web3;
let contract;
let accounts;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const res = await fetch('../build/contracts/Voting.json');
    const contractJson = await res.json();

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contractJson.networks[networkId];

    if (!deployedNetwork) {
      alert("Contract not found on this network. Check Ganache and Truffle migration.");
      return;
    }

    contract = new web3.eth.Contract(contractJson.abi, deployedNetwork.address);
    accounts = await web3.eth.getAccounts();

    console.log("Connected as:", accounts[0]);
    const adminAddress = await contract.methods.admin().call();
    if (accounts[0].toLowerCase() !== adminAddress.toLowerCase()) {
      document.getElementById("adminPanel").style.display = "none";
    }

    loadCandidates();
  } else {
    alert("Please install MetaMask to use this DApp.");
  }
});

async function loadCandidates() {
  const count = await contract.methods.candidateListLength().call();
  const container = document.getElementById("candidates");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const name = await contract.methods.candidateList(i).call();
    const votes = await contract.methods.totalVotesFor(name).call();

    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${name}</strong> - ${votes} votes</p>
      <button onclick="vote('${name}')">Vote</button>
    `;
    container.appendChild(div);
  }
}

async function vote(name) {
  await contract.methods.voteForCandidate(name).send({ from: accounts[0] });
  alert(`Voted for ${name}!`);
  loadCandidates();
}

async function endVoting() {
  if (!contract) return alert("Contract not loaded!");
  try {
    await contract.methods.endVoting().send({ from: accounts[0] });
    const winner = await contract.methods.getWinner().call();
    alert(`Voting ended. Winner: ${winner}`);
  } catch (err) {
    console.error(err);
    alert("Error ending voting.");
  }
}

async function resetElection() {
  if (!contract) return alert("Contract not loaded!");

  const inputF = document.getElementById("newCandidates");
  const input = inputF.value;
  const newCandidates = input.split(',').map(name => name.trim()).filter(name => name !== "");

  if (newCandidates.length === 0) {
    return alert("Please enter at least one candidate name.");
  }

  try {
    await contract.methods.resetElection(newCandidates).send({ from: accounts[0] });
    alert("Election has been reset!");
    inputF.value = "";
    loadCandidates(); // Refresh the candidate list
  } catch (err) {
    console.error(err);
    alert("Error resetting election.");
  }
}

