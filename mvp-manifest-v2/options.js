//function saveAndApply(params) {
//  chrome.storage.sync.set(params, function () {
//    chrome.runtime.sendMessage({
//      options: params
//    });
//  });
//}

function saveAndApply() {
  var trackingParam = document.getElementById('trackingParam').value;
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

// document.getElementById('save').addEventListener('click', save_options);

function restore() {
  chrome.storage.sync.get(defaults, function(items) {
    document.getElementById('toolbar_icon:' + items.toolbar_icon).checked = 'checked';
    if (items.clean_url) {
      document.getElementById('clean_url').checked = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', restore);

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

document.getElementById('clean_url')
  .addEventListener(
    'change',
    function() {
      saveAndApply({
        clean_url: document.getElementById('clean_url').checked
      });
    },
    false
  );