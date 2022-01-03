$(document).ready(function(){
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
        document.getElementById("id").innerHTML = "User Id: "+accounts[0];
        auctionboxinstance.methods.returnAllAuctions().call().then((contractAddresses)=>{
        contractAddresses.forEach(element=>{
            auctioninstance.options.address=element;
            auctioninstance.methods.returnContents()
            .call().then((contents)=>{
                if(contents[0].toLowerCase() != accounts[0].toLowerCase()){var status='';
                if(contents[3] == 1){
                    status='running';
                    const etherValue = Web3.utils.fromWei(contents[2], 'ether');
                    $('#runningAuctions').append(`<tr>
                    <td><a href="./pview.html?id=${element}">${element}</td>
                    <td>${contents[0]}</td>
                    <td>${contents[1]}</td>
                    <td>${etherValue+" ether"}</td>
                    <td><p class="status status-${status}">${status.toUpperCase()}</td>
                    </tr>`)
                }}
                })
            })        
        })
    })
    })