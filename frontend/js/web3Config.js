  // js/web3Config.js

  async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const accDiv = document.getElementById("account");
      if (accDiv) {
        accDiv.innerText = "Connected: " + account;
      }

      return { web3, contract, account };
    } else {
      alert("Please install MetaMask!");
      return {};
    }
  }
  window.initWeb3 = initWeb3;