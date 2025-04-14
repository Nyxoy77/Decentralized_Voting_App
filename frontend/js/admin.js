async function addCandidate() {
    const name = document.getElementById("new-candidate").value;
    if (!name) return alert("Candidate name required");
    await contract.methods.addCandidate(name).send({ from: account });
    alert(`${name} added`);
    location.reload();
  }
  
  async function endVoting() {
    await contract.methods.endVoting().send({ from: account });
    alert("Voting Ended");
    window.location.href = "winner.html";
  }
  