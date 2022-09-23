var options;
var timeout;

var elem = document.createElement('input');
document.body.appendChild(elem);

function copy(text) {
  if (options.clean_url) {
    elem.value = cleanURL(text);
    //Debugging = 
    console.log('Used CleanURL');
  } else {
    elem.value = text;
    //Debugging = 
    console.log('Did not use CleanURL');
  }
  //Change for value you want appended.
  //Update to take input(s).
  //Original hardcoded line: elem.value += '?wt.mc_id=CatalogApi';

 // var trackingParam = document.getElementById("trackingParam");

  if(trackingParam != null) {
    elem.value += trackingParam;
    console.log('trackingParam was not null');
  } else {
    elem.value += '?wt.mc_id=LearnAppenderTool';
    console.log('trackingParam was null');
  }

  //elem.value += userInput;
  elem.value += '?wt.mc_id=CatalogApi';
  elem.select();
  document.execCommand('Copy', false, null);
}

//function endingInput() {
// Need a function to take input of what the ending parameter(s) should be.
//}

function cleanURL(url) {
  var a = document.createElement('a');
  a.href = url;
  //Original search line = a.search = removeTrackingTags(a.search.replace(/^\?/,''));
  //Only difference is (.*) removed.
  a.search = removeTrackingTags(a.search.replace(/^\?(.*)/,''));
  //Debugging a.search
  //console.log('a.search = ' + a.href);
  a.hash = removeTrackingTags(a.hash.replace(/^#/,''));
  //Debugging a.hash 
  //console.log('a.hash = ' + a.href);
  return a.href
}

function removeTrackingTags(str) {
  return str
    .split('&')
    .filter(function(item) {
      return debug = !/^(utm_|from=|_openstat)/.test(item);
    })
    .join('&');
}

//function removeLocale(str) {
//Add logic to remove locale.
//}


chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId === 'copy-page-url') {
    copy(info.pageUrl);
  } else if (info.menuItemId === 'copy-frame-url') {
    copy(info.frameUrl);
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  copy(tab.url);
  setBadgeText('OK!');
  clearTimeout(timeout);
  timeout = setTimeout(setBadgeText.bind(null, ''), 1000);
});

chrome.tabs.onActivated.addListener(function() {
  clearTimeout(timeout);
  setBadgeText('');
});