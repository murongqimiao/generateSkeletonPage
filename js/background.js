chrome.contextMenus.create({
	title: 'generate skeleton page',
	onclick: function() {
	  sendMessageToContentScript({ cmd: 'update_font_size', size: 42 }, function(
		response
	  ) {
		alert(response);
	  });
	}
  });
  
  // 向content-script主动发送消息
  function sendMessageToContentScript(message, callback) {
	getCurrentTabId(tabId => {
	  chrome.tabs.sendMessage(tabId, message, function(response) {
		if (callback) callback(response);
	  });
	});
  }
  
  // 获取当前选项卡ID
  function getCurrentTabId(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	  if (callback) callback(tabs.length ? tabs[0].id : null);
	});
  }
  