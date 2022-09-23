var options;
var timeout;

var elem = document.createElement('input');
document.body.appendChild(elem);

function copy(text) {
  if (options.clean_url) {
    elem.value = cleanURL(text);
    //Debugging = 
    //console.log('Used CleanURL');
  } else {
    elem.value = text;
    //Debugging = 
    //console.log('Did not use CleanURL');
  }

  chrome.storage.sync.get(['user_input'], function(result) {
    //console.log('Value currently is ' + result.user_input);
    trackingParam = result.user_input;
    if (trackingParam != null) {
      // I don't think you are appending this correctly,
      // Right not it just slabs it on the end
      elem.value += trackingParam;
      //console.log('trackingParam was not null');
    } else {
      elem.value += '?wt.mc_id=LearnAppenderTool';
      //console.log('trackingParam was null');
    }
  
    //elem.value += userInput;
    elem.select();
    document.execCommand('Copy', false, null);
  });

  
}

function setIcon(icon) {
  chrome.action.setIcon({
    path: 'icon/LearnAppenderIcon128.png'
  });
}

function setBadgeText(text) {
  chrome.action.setBadgeText({
    text: text
  });
}

function cleanURL(url) {
  //Original: 
  //var a = document.createElement('a');
  //a.href = url;
  var a = new URL(url);
  //Original search line = a.search = removeTrackingTags(a.search.replace(/^\?/,''));
  //Only difference is (.*) removed.
  a.search = removeTrackingTags(a.search.replace(/^\?(.*)/, ''));
  //Debugging a.search
  //console.log('a.search = ' + a.href);
  a.hash = removeTrackingTags(a.hash.replace(/^#/, ''));
  //Debugging a.hash 
  //console.log('a.hash = ' + a.href);
  return a.href
}

function removeTrackingTags(str) {
  return str
    .split('&')
    .filter(function (item) {
      return debug = !/^(utm_|from=|_openstat)/.test(item);
    })
    .join('&');
}

//function removeLocale(str) {
//TODO: Add logic to remove locale.
//}

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.contextMenus.create({
//     'id': 'copy-page-url',
//     'title': 'Copy URL and add tracking',
//     'contexts': [
//       'page',
//       'selection',
//       'link',
//       'editable',
//       'image',
//       'video',
//       'audio'
//     ]
//   });

//   chrome.contextMenus.create({
//     'id': 'copy-frame-url',
//     'title': 'Copy Frame URL',
//     'contexts': [
//       'frame'
//     ]
//   });

//   chrome.action.setBadgeBackgroundColor({
//     color: '#32cd32'
//   });
// });

// chrome.contextMenus.onClicked.addListener(function (info) {
//   if (info.menuItemId === 'copy-page-url') {
//     copy(info.pageUrl);
//   } else if (info.menuItemId === 'copy-frame-url') {
//     copy(info.frameUrl);
//   }
// });

// chrome.action.onClicked.addListener(function (tab) {
//   copy(tab.url);
//   setBadgeText('OK!');
//   clearTimeout(timeout);
//   timeout = setTimeout(setBadgeText.bind(null, ''), 1000);
// });

// chrome.tabs.onActivated.addListener(function () {
//   clearTimeout(timeout);
//   setBadgeText('');
// });

// chrome.runtime.onMessage.addListener(function (message) {
//   if (!message.options) {
//     return;
//   }

//   Object.keys(message.options).forEach(function (key) {
//     options[key] = message.options[key];
//   });

//   var opts = message.options;
//   if (opts.toolbar_icon) {
//     setIcon(opts.toolbar_icon);
//   }
// });

// chrome.storage.sync.get(defaults, function (items) {
//   options = items;
//   setIcon(items.toolbar_icon);
// });