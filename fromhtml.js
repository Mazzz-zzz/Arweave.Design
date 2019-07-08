const arweave = Arweave.init({
        host: 'arweave.net',
        port: '80',
		protocol: 'https'
});

var result = null;






document.getElementById('selectFiles').oninput = function() {
    console.log("clicked");
    var files = document.getElementById('selectFiles').files;
    //console.log(files);
    if (files.length <= 0) {
	return false;
    }

    var fr = new FileReader();

    fr.onload = function(e) {
	//console.log(e.target.result);
	result = JSON.parse(e.target.result);
	//console.log(result.kty);
	//var formatted = JSON.stringify(e, null, 2);
	//document.write(formatted);
	//document.getElementById('result').value = formatted;
        
    arweave.wallets.jwkToAddress(result).then((address) => {
        console.log(address);
        document.getElementById("loggedInAddress").textContent = address
    });   
        
	};
    fr.readAsText(files.item(0));
};

document.getElementById('testtrans').onclick = async function() {
	
	var Html = editor.getHtml();
	var Css = editor.getCss();
	console.log(Html);
	var together = "<html>" + Html + "<style>" + Css + "</style>" + "</html>"
	
	
	/* ###wallet transaction##
	let transaction = await arweave.createTransaction({
    	target: 'BURNITTTTPWTsgY2YU4jzCEiHcK_IbTnSjRJp_Uep6Q',
    	quantity: arweave.ar.arToWinston('0.01')
	}, result);
	*/
	
	
	
	let transaction = await arweave.createTransaction({
    	data: together
	}, result);
	
	await arweave.transactions.sign(transaction, result);
	
	const response = await arweave.transactions.post(transaction);
	
	console.log(transaction);
	console.log(response.status);
	console.log(together);
	
	clickpublish(response.status, transaction.id, arweave.ar.winstonToAr(transaction.reward));
}

function clickpublish(ispublished, id, cost) {
	if (ispublished == 200) {
		
		document.getElementById('publishedlink').textContent = "arweave.net/" + id;
		document.getElementById('publishedlink').href = "https://arweave.net/"+id;
		document.getElementById('publishcost').textContent = cost + "AR was used to publish this website";
		
		document.getElementById("publishpopup").style.visibility = "visible";
	}
	if (ispublished == 208) {
		alert("Website already published. Please wait for it to be mined into a block")
	}
	else if (ispublished == 400 | ispublished == 500) {
		alert("Error. Make sure your internet connection is working and arweave.net is not blocked. (Custom nodes will be added in future releases)")
	}
}

document.getElementById("Info").onclick = function() {
	var infobutton = document.getElementById("infopopup");
	
	if (infobutton.style.visibility == "visible") {
		infobutton.style.visibility = "hidden";
	}
	else {
		infobutton.style.visibility = "visible";
	}
}