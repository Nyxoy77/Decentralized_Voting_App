const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const candidates = ["Alice", "Bob", "Charlie"];  // Define your candidates
  deployer.deploy(Voting, candidates);  // Deploy with the candidates array passed as a constructor argument
};
