/*
** file: js/options.js
** description: javascript code for "html/options.html" page
*/

function init_options () {
    console.log("function: init_options");
	chrome.storage.local.get('activetab', function (activetabres) {
    var act = activetabres.activetab;	
	console.log("act = " + act);
	document.getElementById('cur').innerHTML = act;

    
	/*chrome.storage.local.get('option1', function (result) {
    var option1 = result.option1
	console.log("option1 = " + option1);
	    if (option1 == "0") {
		document.getElementById('option1_slider').checked = false;
    }
    }); */
	
    var storage = chrome.storage.local;            
	storage.get([act], function (res) {
	
    
	console.log("option2 = " + res[act]);
	    if (res[act] == "0") {
		document.getElementById('option2_slider').checked = false;
    }

    });
    chrome.storage.local.get('image', function (result2) {
    var img = result2.image;
    document.getElementById("image").src = result2.image;
	console.log(img);
    });
 
 });
    //set the current state of the options form elements to match the stored options values
    //favorite_movie

}

function save_options () {
    console.log("function: save_options");

  
/*    var option1 = document.getElementById('option1_slider').checked;
	if (document.getElementById('option1_slider').checked){
		 chrome.storage.local.set({'option1': "1"});
		 console.log("option1 = 1" );
} else {
	   chrome.storage.local.set({'option1': "0"});
	   console.log("option1 = 0" );
} */
var option2 = document.getElementById('option2_slider').checked;
	if (document.getElementById('option2_slider').checked){
		 chrome.storage.local.set({'option2': "1"});
		 chrome.storage.local.get('activetab', function (activetabres) {
			var v1 = activetabres.activetab;
			var storage = chrome.storage.local;            
			storage.set({[v1]: '1'});			
		 });
} else {
	   chrome.storage.local.set({'option2': "0"});
	   
	   chrome.storage.local.get('activetab', function (activetabres) {
		   var v1 = activetabres.activetab;
			var storage = chrome.storage.local;            
			storage.set({[v1]: '0'});	
		 });
}

}

function image () {
	document.getElementById("button2").childNodes[0].nodeValue = "Please Wait";
	document.getElementById("button2").disabled = true; 
	//document.getElementById("button2").style.visibility="hidden";
	var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://source.unsplash.com/collection/136095/1920x1080', true);
            xhr.onload = function () {
		    chrome.storage.local.set({'image': xhr.responseURL});
            console.log(xhr.responseURL);
			
	setTimeout(function(){

    document.getElementById("button2").childNodes[0].nodeValue = "Change Image";
	document.getElementById("button2").disabled = false; 
	document.getElementById("image").src = xhr.responseURL;
}, 500);
            };
            xhr.send(null);

}


//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_options);
//document.querySelector('#option1_slider').addEventListener('click', save_options);
document.querySelector('#option2_slider').addEventListener('click', save_options);
document.querySelector('#button2').addEventListener('click', image);