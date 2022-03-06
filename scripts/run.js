const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();

    const domainFactory = await hre.ethers.getContractFactory('Domains'); // compiles our contract and generate necessary files under artifact folder.
    const domainContract = await domainFactory.deploy('af'); // creating local ethereum network but just for this contract (will be destroyed once the script completes runnning)
    await domainContract.deployed(); // wait till the contract is actually mined by the miners and deployed to the blockchain. (hardhat creates fake miners).

    console.log("contract deployed to " , domainContract.address);
    console.log("contract deployed by ", owner.address);

    let txn = await domainContract.register("a16z", {value : hre.ethers.utils.parseEther('1234')});
    await txn.wait();

    // const domainOwner = await domainContract.getAddress("akshay");
    // console.log("domain owner is ", domainOwner);

    // txn = await domainContract.connect(randomPerson).setRecord(".af", "My domain now");
    // await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance : ", hre.ethers.utils.formatEther(balance));


    try {
        txn = await domainContract.connect(randomPerson).withdraw();
        await txn.wait();
    } catch(err) {
        console.log("Error is : ", err);
        console.log("Could not rob contract");
    }

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawal : ", hre.ethers.utils.formatEther(ownerBalance));

    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();
    console.log("1111111");

    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("2222222")
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("333333")

    console.log("Contract balance after withdrawal : " , hre.ethers.utils.formatEther(contractBalance));
    console.log("Owner balance after withdrawal : ", hre.ethers.utils.formatEther(ownerBalance));

    console.log("Contract address is : ", domainContract.address);
    console.log("Owner address is : ", owner.address);


}

const runMain = async () => {

    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();