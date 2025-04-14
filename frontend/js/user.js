async function renderCandidates() {
    const length = await contract.methods.candidateListLength().call();
  
    for (let i = 0; i < length; i++) {
      const name = await contract.methods.candidateList(i).call();
      const votes = await contract.methods.totalVotesFor(name).call();
      renderCandidate(name, votes);
    }
  }
  