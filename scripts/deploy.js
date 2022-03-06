const { hexStripZeros } = require("ethers/lib/utils");

const main = async() => {
    const domainFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainFactory.deploy('af');
    await domainContract.deployed();

    console.log("contract deployed to : ", domainContract.address);

    let txn = await domainContract.register("ninja", {value : hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    console.log("Minted Domain ninja.af");

    txn = await domainContract.setRecord("ninja", "I am nija as fuck");
    await txn.wait();
    console.log("set record for ninja.af");

    const address = await domainContract.getAddress('ninja');
    console.log("Owner of ninja.af is ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance is : ", hre.ethers.utils.formatEther(balance));


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