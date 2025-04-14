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
      showCustomAlert("Contract not found on this network. Check Ganache and Truffle migration.");
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
    showCustomAlert("Please install MetaMask to use this DApp.");
  }
});

function showCustomAlert(message) {
  document.getElementById('alertMessage').textContent = message;
  document.getElementById('customAlert').style.display = 'block';
}

document.getElementById('closeAlert').onclick = function() {
  document.getElementById('customAlert').style.display = 'none';
}


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
  showCustomAlert(`Voted for ${name}!`);
  loadCandidates();
}

async function endVoting() {
  if (!contract) return showCustomAlert("Contract not loaded!");
  try {
    await contract.methods.endVoting().send({ from: accounts[0] });
    const winner = await contract.methods.getWinner().call();
    showCustomAlert(`Voting ended. Winner: ${winner}`);
  } catch (err) {
    console.error(err);
    showCustomAlert("Error ending voting.");
  }
}

async function resetElection() {
  if (!contract) return showCustomAlert("Contract not loaded!");

  const inputF = document.getElementById("newCandidates");
  const input = inputF.value;
  const newCandidates = input.split(',').map(name => name.trim()).filter(name => name !== "");

  if (newCandidates.length === 0) {
    return showCustomAlert("Please enter at least one candidate name.");
  }

  try {
    await contract.methods.resetElection(newCandidates).send({ from: accounts[0] });
    showCustomAlert("Election has been reset!");
    inputF.value = "";
    loadCandidates(); // Refresh the candidate list
  } catch (err) {
    console.error(err);
    showCustomAlert("Error resetting election.");
  }
}

