$(document).ready(function(){
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
        document.getElementById("id").innerHTML = "User Id: "+accounts[0];
        auctionboxinstance.methods.returnAllAuctions().call()
        .then((response)=>{
            response.forEach(element=>{
                console.log(element);
                auctioninstance.options.address=element;
                auctioninstance.methods.returnContents().call()
                .then((contents)=>{
                    console.log(contents);
                    var status='';
                    if(contents[3] == 1){
                        status='running';
                        if((contents[0]).toLowerCase() == accounts[0])
                        {
                            const etherValue = Web3.utils.fromWei(contents[2], 'ether');
                            $('#myauctions').append(`
                        <tr>
                        <td><a href="./pview.html?id=${element}">${element}</td>
                        <td>${contents[1]}</td>
                        <td>${etherValue+" Ether"}</td>
                        <td>${status}</td>
                        </tr>
                        `)
                        }
                    }
                    else{
                        status='finalised';
                        if((contents[0]).toLowerCase() == accounts[0])
                    {
                        const etherValue = Web3.utils.fromWei(contents[2], 'ether');
                        $('#myauctions').append(`
                        <tr>
                        <td>${element}</td>
                        <td>${contents[1]}</td>
                        <td>${etherValue+" Ether"}</td>
                        <td>${status}</td>
                        </tr>
                        `)
                        }
                    }
                    
                })
            })
        })    
        auctionboxinstance.methods.returnAllAuctions().call()
        .then((response)=>{
            response.forEach(element=>{
                console.log(element);
                auctioninstance.options.address=element;
                auctioninstance.methods.isParticipated(accounts[0]).call()
                .then((flag)=>{
                    if(flag[0])
                    {
                        console.log(flag)
                        var status='';
                        if(flag[4] == 1){status='running';}
                        else{status='finalised';}
                        const etherValue = Web3.utils.fromWei(flag[3], 'ether');
                        $('#participatedauctions').append(`
                        <tr>
                        <td><a href="./pview.html?id=${element}">${element}</td>
                        <td>${flag[1]}</td>
                        <td>${flag[2]}</td>
                        <td>${etherValue+" Ether"}</td>
                        <td>${status}</td>
                        </tr>
                        `)
                    }
                })
            })
        })
    })

})