if (window.ethereum) {
     window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      ethereum.enable();
      console.log("ethereum.enable()");
    } catch (error) {
      console.log(error);
      // User denied account access...
    }
  } else if (window.web3) {
    // Legacy dapp browsers...
     window.web3 = new Web3(web3.currentProvider);
     console.log("currentProvider");
  } else {
    // Non-dapp browsers...
     web3 = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  //console.log(web3);
  //web3.eth.getAccounts().then((account)=>{console.log(account[0])});
  //console.log(web3.eth.accounts.givenProvider.selectedAddress);
  