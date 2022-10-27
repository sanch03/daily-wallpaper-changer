chrome.storage.local.set({ activetab: "google_com_search" });

chrome.runtime.sendMessage({msg: 'google_com_search'}, (response) => {
    console.log(response.msg);
	if (response.msg == "1") {
        $('img[src*="/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"]').attr("src","https://imgur.com/KE298oL.png");

    }
});

