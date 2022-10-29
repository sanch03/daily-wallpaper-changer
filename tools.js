function checkDate() {
    chrome.storage.local.get('date', function (result) {
        let oldDate = result.date
        let currentDate = new Date()
        if (oldDate !== currentDate.getDate()) {
            chrome.storage.local.set({ 'date': currentDate.getDate() });
            newDailyImage();
            refreshJSONList();
        }
    });
};

async function newDailyImage() {
    let url = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
    let obj = await (await fetch(url)).json();
    let imageblob = await (await fetch('https://bing.com' + obj.images[0].url)).blob();
    let image = {}
    image.url = 'https://bing.com' + obj.images[0].url;
    image.copyright = obj.images[0].copyright;
    image.copyrightlink = obj.images[0].copyrightlink;
    image.base64 = await blobToBase64(imageblob);
    chrome.storage.local.set({ 'image': image });
};

async function getImage() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('image', function (result) {
            let image = result.image;
            let url = image.base64;
            resolve(url);
        });
    });
}

async function refreshJSONList() {
    let jsonlist = await (await fetch('https://raw.githubusercontent.com/sanchits2003/daily-wallpaper-changer/main/jsonlist.json')).json();
    //let jsonlist = await (await fetch('http://192.168.1.113:5500/jsonlist.json')).json();
    chrome.storage.local.set({ 'jsonlist': jsonlist });
}

async function getJSONList() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('jsonlist', function (result) {
            let jsonlist = result.jsonlist;
            resolve(jsonlist);
        });
    });
}

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

async function getActiveList() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('activelist', function (result) {
            let activelist = result.activelist ?? {};
            resolve(activelist);
        });
    });
}



async function setStatus(name, status) {
    let activelist = await getActiveList();
    activelist[name] = status;
    console.log(activelist);
    chrome.storage.local.set({ 'activelist': activelist });
}

async function checkExist(url) {
    let jsonlist = await getJSONList();
    console.log(jsonlist);
    let exist = { exist: false, active: false };
    for (let i = 0; i < jsonlist.length; i++) {
        const pattern = new URLPattern({
            hostname: jsonlist[i].hostname,
            pathname: jsonlist[i].pathname
        })
        if (!pattern.test(url)) {
            continue;
        }
        let activelist = await getActiveList();
        let active = activelist[jsonlist[i].name] ?? true;
        if (!active) {
            return { name: jsonlist[i].name, exist: true, active: false };
        }
        exist = jsonlist[i];
        exist.exist = true;
        exist.active = true;
        return exist;
    }
    return exist;
}

async function applyStyle(styledata, tabId) {
    if (styledata.css) {
        let imageurl = await getImage();
        let css = styledata.css.replaceAll("{{image}}", imageurl);
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: css
        });
    }
    if (styledata.js) {
        // in progress
    }
}