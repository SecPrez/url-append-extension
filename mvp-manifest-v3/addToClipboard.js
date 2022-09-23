
// console.count("addToClipboard called ");
chrome.storage.sync.get(['user_input'], function(result) {
  trackingParam = result.user_input;
  
    var tablink = window.location.toString();
    var mc_id = "LearnAppenderTool"
    if (trackingParam != null) {

      mc_id = trackingParam;
    }
    var full_url  = tablink + "?wt.mc_id=" + mc_id
    navigator.clipboard.writeText(full_url).then(() => {
      console.log("copied text")
  }, () => {
      console.log("copy text failed")
  });
});
 
