function initBridge() {
  if (window.WKWebViewJavascriptBridge) {
    return window.WKWebViewJavascriptBridge;
  }

  if (!window.onerror) {
    window.onerror = function (msg, url, line) {
      console.log("WKWebViewJavascriptBridge: ERROR:" + msg + "@" + url + ":" + line);
    }
  }
  window.WKWebViewJavascriptBridge = {
    registerHandler: registerHandler,
    callHandler: callHandler,
    _fetchQueue: _fetchQueue,
    _handleMessageFromiOS: _handleMessageFromiOS
  };

  var sendMessageQueue = [];
  var messageHandlers = {};

  var responseCallbacks = {};
  var uniqueId = 1;

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler;
  }

  function callHandler(handlerName, data, responseCallback) {
    if (arguments.length == 2 && typeof data == 'function') {
      responseCallback = data;
      data = null;
    }
    _doSend({ handlerName: handlerName, data: data }, responseCallback);
  }

  function _doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackID = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackID] = responseCallback;
      message['callbackID'] = callbackID;
    }
    sendMessageQueue.push(message);
    window.webkit.messageHandlers.iOS_Native_FlushMessageQueue.postMessage(null)
  }

  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue);
    sendMessageQueue = [];
    return messageQueueString;
  }

  function _dispatchMessageFromiOS(messageJSON) {
    var message = JSON.parse(messageJSON);
    var messageHandler;
    var responseCallback;

    if (message.responseID) {
      responseCallback = responseCallbacks[message.responseID];
      if (!responseCallback) {
        return;
      }
      responseCallback(message.responseData);
      delete responseCallbacks[message.responseID];
    } else {
      if (message.callbackID) {
        var callbackResponseId = message.callbackID;
        responseCallback = function (responseData) {
          _doSend({ handlerName: message.handlerName, responseID: callbackResponseId, responseData: responseData });
        };
      }

      var handler = messageHandlers[message.handlerName];
      if (!handler) {
        console.log("WKWebViewJavascriptBridge: WARNING: no handler for message from iOS:", message);
      } else {
        handler(message.data, responseCallback);
      }
    }
  }

  function _handleMessageFromiOS(messageJSON) {
    _dispatchMessageFromiOS(messageJSON);
  }
  return window.WKWebViewJavascriptBridge
}

// todo
window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)

const bridge = initBridge()

export default bridge