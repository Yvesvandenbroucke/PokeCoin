const web3 = new Web3("http://localhost:7545");

const deployContract = async (contractData) => {
  try {
    const bytecode = contractData.bytecode;
    const abi = contractData.abi;
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi);
    const instance = await contract
      .deploy({
        data: bytecode,
      })
      .send({
        from: accounts[0],
        gas: "2000000",
      });

    contract.options.address = instance.options.address;
    localStorage.setItem("contractAddress", instance.options.address);

    return contract;
  } catch (error) {
    console.error("Error deploying contract:", error);
    return null;
  }
};
