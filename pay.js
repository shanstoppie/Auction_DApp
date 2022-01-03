var item=document.getElementById('item');
var price=document.getElementById('price');
var desc=document.getElementById('description');
var bidprice=document.getElementById('bidprice');

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("id");

$(document).ready(function(){
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
        document.getElementById("id").innerHTML = "User Id: "+accounts[0];
    })
    auctioninstance.options.address=c;
    auctioninstance.methods.returnContents().call()
    .then((contents=>{
        const etherValue = Web3.utils.fromWei(contents[2], 'ether');
        item.innerHTML="Product Name: "+contents[1];
        price.innerHTML="Starting Price: "+etherValue+" Ether";
        desc.innerHTML="Description: "+contents[4];
    }))
    auctioninstance.methods.showHighestPrice().call().then((a)=>{
        const etherValue = Web3.utils.fromWei(a, 'ether')+" Ether";
        bidprice.innerHTML="Bidded Price: "+etherValue;
    })
})

$('#pay').on('click',function() {
    auctioninstance.options.address=c;
    auctioninstance.methods.showHighestPrice().call().then((amnt)=>{
        const etherValue = Web3.utils.fromWei(amnt, 'ether');
        auctioninstance.methods.pay(etherValue)
        .send({from:ethereum.selectedAddress,value:etherValue})
        .then(()=>{
            alert('You Have Paid Succefully');
            window.location.href='./history.html';
    })
    })
  })