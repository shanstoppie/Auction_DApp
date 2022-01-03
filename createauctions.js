$(document).ready(function() {
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
        document.getElementById("id").innerHTML = "User Id: "+accounts[0];
    })
})

var title = document.getElementById("title");
var startPrice = document.getElementById("price");
var description = document.getElementById("description");
$('#create').on('click',function(){
    const addr = ethereum.selectedAddress;
    console.log(addr);
    const bidPriceWei = web3.utils.toWei(startPrice.value, 'ether');
    auctionboxinstance.methods.createAuction(title.value,bidPriceWei,description.value)
    .send({from:addr})
    .then(()=>{
        alert('Auction Created Successfully!');
        window.location.href='./dashboard.html';
    })
})