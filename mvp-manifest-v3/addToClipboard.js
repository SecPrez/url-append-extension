
// console.count("addToClipboard called ");
chrome.storage.sync.get(['url'], function (result) {

  navigator.clipboard.writeText(result.url).then(() => {
    console.log("copied text")
  }, () => {
    console.log("copy text failed")
  });
});

