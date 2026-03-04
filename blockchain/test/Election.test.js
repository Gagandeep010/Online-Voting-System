const Election = artifacts.require("Election");

contract("Election", (accounts) => {
  const admin = accounts[0];
  const voter = accounts[1];
  const fakeAadhaar = web3.utils.keccak256("123456789012");

  let election;

  beforeEach(async () => {
    election = await Election.new({ from: admin });
  });

  it("should register a voter", async () => {
    await election.registerVoter(fakeAadhaar, { from: admin });
    const isRegistered = await election.isRegistered(fakeAadhaar);
    assert.equal(isRegistered, true, "Voter should be registered");
  });

  it("should allow admin to add candidates", async () => {
    await election.addCandidate("Alice", { from: admin });
    const candidate = await election.candidates(0);
    assert.equal(candidate.name, "Alice", "Candidate name mismatch");
  });

  it("should allow voting and count votes", async () => {
    await election.registerVoter(fakeAadhaar, { from: admin });
    await election.addCandidate("Bob", { from: admin });

    await election.castVote(fakeAadhaar, 0, { from: admin });

    const hasVoted = await election.hasAlreadyVoted(fakeAadhaar);
    assert.equal(hasVoted, true, "Voter should be marked as voted");

    const votes = await election.getVoteCount(0);
    assert.equal(votes.toNumber(), 1, "Vote count should be 1");
  });

  it("should not allow double voting", async () => {
    await election.registerVoter(fakeAadhaar, { from: admin });
    await election.addCandidate("Charlie", { from: admin });

    await election.castVote(fakeAadhaar, 0, { from: admin });

    try {
      await election.castVote(fakeAadhaar, 0, { from: admin });
      assert.fail("Double voting should throw an error");
    } catch (err) {
      assert.include(err.message, "already voted", "Expected double vote rejection");
    }
  });
});
