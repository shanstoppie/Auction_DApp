$(document).ready(function(){
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
        document.getElementById("id").innerHTML = "User Id: "+accounts[0];
    auctionboxinstance.methods.returnAllAuctions().call().then((contractAddresses)=>{
        contractAddresses.forEach(element=>{
            auctioninstance.options.address=element;
            auctioninstance.methods.finalized().call()
            .then((contents)=>{
                var status='';
                if(contents[2] != 1){
                    status='finalised';
                    const etherValue = Web3.utils.fromWei(contents[1], 'ether');
                    const etherhValue = Web3.utils.fromWei(contents[4], 'ether');
                    const x = `<a href="./pay.html?id=${element}">`;
                    var pflag=contents[5]!=0?contents[3].toLowerCase()==accounts[0].toLowerCase()?x+"Not Paid":'Not Paid':'Paid';
                    $('#runningAuctions').append(`<tr>
                    <td>${element}</td>
                    <td>${contents[0]}</td>
                    <td>${etherValue+" Ether"}</td>
                    <td>${status.toUpperCase()}</td>
                    <td>${contents[3]}</td>
                    <td>${etherhValue+" Ether"}</td>
                    <td>${pflag}</td>
                    </tr>`)
                }
            })
            })        
        })
    })
    })


    $('#finalise').on('click',function(){
        console.log("clicked");
    })