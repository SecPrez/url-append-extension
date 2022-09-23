// default state goes here
// this runs ONE TIME ONLY (unless the user reinstalls your extension)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./foreground.js"]
      })
          .then(() => {
              console.log("INJECTED THE FOREGROUND SCRIPT.");
          })
          .catch(err => console.log(err));
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'copy-page-url',
    'title': 'Copy URL and add tracking',
    'contexts':[
      'page',
      'selection',
      'link',
      'editable',
      'image',
      'video',
      'audio'
    ]
  });

  chrome.contextMenus.create({
    'id': 'copy-frame-url',
    'title': 'Copy Frame URL',
    'contexts':[
      'frame'
    ]
  });

  chrome.action.setIcon({
    path: 'icon/LearnAppenderIcon128.png'
   });
   
});