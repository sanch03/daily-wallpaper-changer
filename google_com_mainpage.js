chrome.storage.local.set({ activetab: "google_com_mainpage" });


chrome.runtime.sendMessage({msg: 'google_com_mainpage'}, (response) => {
	console.log(response.msg);
	if (response.msg == "1") {
		console.log("nice");
		document.getElementById("hplogo").src = "https://imgur.com/KE298oL.png";
        document.getElementById("hplogo").srcset = "https://imgur.com/KE298oL.png 1x, https://imgur.com/KE298oL.png 2x";
		document.querySelector('#fsettl').addEventListener('click', clk);	
		function clk () {
			console.log("it works");
			var lh = "line-height";
			document.getElementById("fbar").style[lh] = "200px";
		}	
	}
});


