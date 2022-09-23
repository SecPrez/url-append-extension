//function saveAndApply(params) {
//  chrome.storage.sync.set(params, function () {
//    chrome.runtime.sendMessage({
//      options: params
//    });
//  });
//}

function saveAndApply(event) {
  // console.error("onclick")
  var trackingParam = document.getElementById('trackingParam').value;
  console.log("tracking param: "+trackingParam)
  chrome.storage.sync.set({
    user_input: trackingParam,
  }, function() {
  
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
// document.getElementById("myButton").addEventListener("click", myFunction);


function restore() {
  // THe key is called "user_input"
  chrome.storage.sync.get(["user_input"], function(result) {
    console.log("result: "+result)
    console.log("result: "+result.user_input)
    if (result != null && result.user_input != null){
      
      document.getElementById('trackingParam').value = result.user_input
    //  items.document.getElementById('toolbar_icon:' + items.toolbar_icon).checked = 'checked';
    // if (items.clean_url) {
    //   document.getElementById('clean_url').checked = true;
    // }
  }});
}
function finishLoading()
{
  // Have to wait for the page to load before we can attach listeners 
  // to elements
  document.getElementById('save').addEventListener('click', saveAndApply);
  restore()
}
document.addEventListener('DOMContentLoaded', finishLoading);

//document.getElementById('toolbar_icon:black')
//  .addEventListener(
//    'click',
//    saveAndApply.bind(null, { toolbar_icon: 'black' }),
//    false
//  );

//document.getElementById('toolbar_icon:gray')
//  .addEventListener(
//    'click',
//    saveAndApply.bind(null, { toolbar_icon: 'gray' }),
//    false
//  );

// you cannot do this as a top level item in the JS as the clean_url won't exist yet
// you have to wait until the page has loaded
// document.getElementById('clean_url')
//   .addEventListener(
//     'change',
//     function() {
//       saveAndApply({
//         clean_url: document.getElementById('clean_url').checked
//       });
//     },
//     false
//   );