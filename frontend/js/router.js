window.addEventListener("load", async () => {
    await initWeb3();
  
    const ended = await contract.methods.votingEnded().call();
    if (ended && !window.location.pathname.includes("winner.html")) {
      window.location.href = "winner.html";
      return;
    }
  
    await renderCandidates();
  
    const admin = await contract.methods.admin().call();
    if (admin.toLowerCase() === account.toLowerCase() && !ended) {
      document.getElementById("admin-panel").style.display = "block";
    }
  });
  