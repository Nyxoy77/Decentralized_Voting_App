const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;

  beforeEach(async () => {
    votingInstance = await Voting.new(["Alice", "Bob", "Charlie"]);
  });

  it("should allow voting for a candidate", async () => {
    await votingInstance.voteForCandidate("Alice", { from: accounts[0] });
    const votes = await votingInstance.totalVotesFor("Alice");
    assert.equal(votes.toString(), "1", "Vote count should be 1 for Alice");
  });

  it("should return the winner", async () => {
    await votingInstance.voteForCandidate("Bob", { from: accounts[0] });
    const winner = await votingInstance.getWinner();
    assert.equal(winner, "Bob", "Winner should be Bob");
  });

  it("should only allow the admin to end voting", async () => {
    try {
      await votingInstance.endVoting({ from: accounts[1] });
      assert.fail("Only admin should be able to end voting");
    } catch (error) {
      assert.include(error.message, "revert", "Error message should contain revert");
    }
  });
});
