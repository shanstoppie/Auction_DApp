var item=document.getElementById('item');
var price=document.getElementById('price');
var desc=document.getElementById('description');
var hprice=document.getElementById('hprice');
var hbidder=document.getElementById('hbidder');

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
    auctioninstance.methods.bidderCount().call().then((biddercount)=>{
        if(biddercount == 0)
        {
            document.getElementById("finalise").disabled = true;
        }
    });
    auctioninstance.methods.returnContents().call()
    .then((contents=>{
        const etherValue = Web3.utils.fromWei(contents[2], 'ether');
        item.innerHTML="Product Name: "+contents[1];
        price.innerHTML="Starting Price: "+etherValue+" Ether";
        desc.innerHTML="Description: "+contents[4];
    }))
    auctioninstance.methods.highestBidder().call().then((name)=>{
    hbidder.innerHTML = "Highest Bidder: "+name;
    })
    auctioninstance.methods.showHighestPrice().call().then((name)=>{
    const etherValue = Web3.utils.fromWei(name, 'ether')+" Ether";
    hprice.innerHTML = "Highest Bidded Amount: "+etherValue;
    })    
    auctioninstance.methods.getAll().call()
      .then((addresses=>{
          addresses.forEach(element => {
              auctioninstance.methods.bids(element).call()
              .then((bid)=>{
                const etherValue = Web3.utils.fromWei(bid, 'ether')+" Ether";
                  $('#biddertable').append(`
                  <tr><td>${element}</td><td>${etherValue}</td></tr>
                  `)
              })
          })
      }))
})

$('#finalise').on('click',function(){
    auctioninstance.options.address=c;
    auctioninstance.methods.finalizeAuction()
    .send({from:ethereum.selectedAddress})
    .then(()=>{
        window.location.href='./history.html';
    })
})