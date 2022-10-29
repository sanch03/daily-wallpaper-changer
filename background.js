importScripts('./tools.js');

chrome.runtime.onInstalled.addListener(function (details) {
	checkDate();
	if (details.reason == "install") {
		console.log("This is a first install!");
	} else if (details.reason == "update") {
		console.log("This is an update!");
	}
});

chrome.runtime.onMessage.addListener(
	async function (request, sender, sendResponse) {
		checkDate();
		if (request.url) {
			let styledata = await checkExist(request.url);
			if (styledata.exist && styledata.active) {
				applyStyle(styledata, sender.tab.id);
			}
		}
	}
);