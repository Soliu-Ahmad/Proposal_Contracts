import hre from "hardhat";

async function main() {
    const DEPLOYED_PROPOSALVOTE = "0x5B69D534EE86372215e5CaeD46851924F85F985b";

    const myAccount = "0x0D33Ee49A31FfB9B579dF213370f634e4a8BbEEd";

    const signer = await hre.ethers.getSigner(myAccount);

    const proposalVote = await hre.ethers.getContractAt(
        "ProposalVote",
        DEPLOYED_PROPOSALVOTE
    );

    // Starting scripting
    console.log("######## Deploying proposal vote #######");

    const deployProposalVote = await proposalVote
        .connect(signer)
        .createProposal("code jam proposal", "for october code jam", 1);

    await deployProposalVote.wait(); 

    console.log({ "for october code jam": deployProposalVote });

    console.log("###### Get the proposal passed #######");


    const voteOnMyProposal = await proposalVote.connect(signer).voteOnProposal(0);

    await voteOnMyProposal.wait(); 

    console.log("Voted on the proposal successfully and the fund payed immediately", voteOnMyProposal);

  
    const allProposals = await proposalVote.getAllproposals();
    console.log("All Proposals:", allProposals);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
