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
    auctioninstance.methods.returnContents().call()
    .then((contents=>{
        if(contents[3] == 2)
        {
            document.getElementById("bid").disabled = true; 
            document.getElementById("amount").disabled = true;
        }
        if(contents[0].toLowerCase()==ethereum.selectedAddress.toLowerCase()){
        var url="./oview.html?id="+c;
        window.location.href=url;}
        else{
            const etherValue = Web3.utils.fromWei(contents[2], 'ether');
            item.innerHTML="Product Name: "+contents[1];
            price.innerHTML="Starting Price: "+etherValue+" Ether";
            desc.innerHTML="Description: "+contents[4];
        }
    }))

    auctioninstance.methods.bidderCount().call().then((count)=>{
        if(count!=0)
        {auctioninstance.methods.highestBidder().call().then((name)=>{
        hbidder.innerHTML = "Higgest bidder: "+name;
        })
        auctioninstance.methods.showHighestPrice().call().then((name)=>{
            const etherValue = Web3.utils.fromWei(name, 'ether');
            hprice.innerHTML = "Highest bidded Amount: "+etherValue+" Ether";
        })}
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

var amount=document.getElementById('amount');

$('#bid').on('click',function() {
  auctioninstance.options.address=c;
  const bidPriceWei = web3.utils.toWei(amount.value, 'ether');
  auctioninstance.methods.placeBid(bidPriceWei)
  .send({from:ethereum.selectedAddress})
  .then(()=>{
      alert('You Have Succefully Bidded to the auction!');
      window.location.href='./buy.html';
  })
})

