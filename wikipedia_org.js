chrome.storage.local.set({ activetab: "wikipedia_org" });

chrome.runtime.sendMessage({msg: 'wikipedia_org'}, (response) => {
	console.log(response.msg);
	if (response.msg == "1") {
		console.log("nice");
	}
});


