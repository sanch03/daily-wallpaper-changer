/*
** file: js/options.js
** description: javascript code for "html/options.html" page
*/

async function init_options() {


	chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {

		let activeTab = tabs[0];
		let url = activeTab.url;

		document.getElementById('cur').innerHTML = "Current website not supported";
		let styleinfo = await checkExist(url);
		console.log(styleinfo);
		if (styleinfo.exist) {
			document.getElementById('cur').innerHTML = styleinfo.name;
		} else {
			document.getElementById("option2_slider").disabled = true;
		}
		if (styleinfo.active) {
			document.getElementById("option2_slider").checked = true;
		}
	});
	chrome.storage.local.get('image', function (result) {
		document.getElementById("image").src = result.image.base64;
		console.log(result.image);
		if (result.image.copyright) {
			document.getElementById("source").innerText = "Bing"
		} else {
			document.getElementById("source").innerText = "Unsplash"
		}
		//document.getElementById("copyright").innerHTML = `<a href="`+result.image.copyrightlink ?? result.image.url+`">`+result.image.copyright ?? "Unsplash"+`</a>`
		let copyrightlink = result.image.copyrightlink ?? result.image.url;
		let copyright = result.image.copyright ?? "Unsplash"
		document.getElementById("copyright").innerHTML = "<a href='" + copyrightlink + "' target='_blank'>" + copyright + "</a>"
	});


	//set the current state of the options form elements to match the stored options values
	//favorite_movie

}

function save_options() {
	if (document.getElementById('option2_slider').checked) {
		setStatus(document.getElementById('cur').innerHTML, true)
	} else {
		setStatus(document.getElementById('cur').innerHTML, false)
	}

}

async function image() {
	document.getElementById("button2").childNodes[0].nodeValue = "Please Wait";
	document.getElementById("button2").disabled = true;
	//document.getElementById("button2").style.visibility="hidden";

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://source.unsplash.com/collection/136095/1920x1080', true);
	xhr.onload = async function () {
		let imageblob = await (await fetch(xhr.responseURL)).blob();
		let image = {}
		image.url = xhr.responseURL;
		image.base64 = await blobToBase64(imageblob);
		chrome.storage.local.set({ 'image': image });
		console.log(xhr.responseURL);

		setTimeout(function () {
			document.getElementById("button2").childNodes[0].nodeValue = "Change Image";
			document.getElementById("button2").disabled = false;
			document.getElementById("image").src = xhr.responseURL;
			location.reload();

		}, 500);
	};
	xhr.send(null);

}


//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_options);
//document.querySelector('#option1_slider').addEventListener('click', save_options);
document.querySelector('#option2_slider').addEventListener('click', save_options);
document.querySelector('#button2').addEventListener('click', image);
// document.querySelector('#button3').addEventListener('click', refreshJSONList);