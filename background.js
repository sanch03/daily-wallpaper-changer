firstdate();
function firstdate() {
	chrome.runtime.onInstalled.addListener(function (details) {
		if (details.reason == "install") {
			console.log("This is a first install!");
			chrome.storage.local.set({ 'google_com_mainpage': "1" });
			chrome.storage.local.set({ 'google_com_search': "1" });
			chrome.storage.local.set({ 'wikipedia_org': "1" });
		} else if (details.reason == "update") {
			var thisVersion = chrome.runtime.getManifest().version;
			if (details.previousVersion < thisVersion) {
				console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
				chrome.storage.local.set({ 'wikipedia_org': "1" });
			}
		}
	});
	chrome.storage.local.get('date', function (result) {
		var date = result.date
		var d = new Date()
		console.log("date = " + date);
		if (date !== d.getDate()) {
			console.log("rip");
			chrome.storage.local.set({ 'date': d.getDate() });
			console.log('date:' + d.getDate());
			$.getJSON('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function (data) {
				chrome.storage.local.set({ 'image': 'https://bing.com' + data.images[0].url });
				console.log('https://bing.com' + data.images[0].url);
			});
			/* var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://bing.biturl.top/', true);
			xhr.onload = function () {
			chrome.storage.local.set({'image': xhr.responseURL});
			console.log(xhr.responseURL);
			};
			xhr.send(null); */
		}
		console.log("nice");
	});
}
chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {

	//www.google.com Home Page "google_com_mainpage"
	if (message.msg === "google_com_mainpage") {

		firstdate();
		var act = message.msg
		console.log("loading= " + act);
		chrome.storage.local.get('google_com_mainpage', function (actres) {
			console.log(actres.google_com_mainpage);
			if (actres.google_com_mainpage === "1") {
				senderResponse({ msg: "1" });
				chrome.scripting.insertCSS(
					{
						target: { tabId: sender.tab.id },
						files: ["google_com_mainpage.css"]
					});
				chrome.storage.local.get('image', function (result) {
					chrome.scripting.insertCSS(
						{
							target: { tabId: sender.tab.id },
							css: "body{background-image: url(" + result.image + ") !important;}"
						});
				});
			}
		});

		return true;


	} else if (message.msg === "google_com_search") {
		firstdate();
		//www.google.com Search Pages "google_com_search"
		if (message.msg === "google_com_search") {
			var at = message.msg;
			var v1 = message.msg;
			var storage = chrome.storage.local;
			storage.get([v1], function (res) {
				console.log(res[v1]);
				if (res[v1] === "1") {
					senderResponse({ msg: "1" });
					chrome.scripting.insertCSS(
						{
							target: { tabId: sender.tab.id },
							files: ["google_com_search.css"]
						});
					chrome.storage.local.get('image', function (result) {
						chrome.scripting.insertCSS(
							{
								target: { tabId: sender.tab.id },
								css: ".sfbgx {background-image: url(" + result.image + ")!important;} .minidiv .sfbg {background-image: url(" + result.image + ") !important;}"
							});
					});
				}
			});
			return true;
		}
	} else if (message.msg === "wikipedia_org") {
		firstdate();
		//wikipedia.org "wikipedia_org"
		if (message.msg === "wikipedia_org") {
			var at = message.msg;
			var v1 = message.msg;
			var storage = chrome.storage.local;
			storage.get([v1], function (res) {
				console.log(res[v1]);
				if (res[v1] === "1") {
					senderResponse({ msg: "1" });
					chrome.scripting.insertCSS(
						{
							target: { tabId: sender.tab.id },
							files: ["wikipedia_org.css"]
						});

					chrome.storage.local.get('image', function (result) {
						chrome.scripting.insertCSS(
							{
								target: { tabId: sender.tab.id },
								css: "#mw-head {background-image: url(" + result.image + ")!important;}"
							});
					});
				}
			});
			return true;
		}
	}



});
