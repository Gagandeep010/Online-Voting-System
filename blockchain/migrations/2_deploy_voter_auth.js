const VoterAuth = artifacts.require("VoterAuth");

module.exports = function (deployer) {
  deployer.deploy(VoterAuth);
};
