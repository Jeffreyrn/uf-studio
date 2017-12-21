
import Base64 from '../lib/Base64';

// const Base64 = require('base64-min');

const NativeCom = {};
window.NativeCom = NativeCom;

function _sendToNative(obj) {
  const u = navigator.userAgent.toLowerCase();
  const isApple = /iphone|ipad|ipod|ios/i.test(u);
  const isAndroid = /android/i.test(u);
  try {
    // const jsonStr = JSON.stringify(obj);
    if (isApple === true) {
      //            console.log("isApple true");
      window.webkit.messageHandlers.GlobalViewControllerCallback.postMessage(obj);
      // window.webkit.messageHandlers.GlobalViewControllerCallback.postMessage(Base64.btoa(jsonStr));
    }
    if (isAndroid === true) {
      //            console.log("isAndroid true");
      window.messageHandlers.jsCallWebView(Base64.btoa(jsonStr));
    }
  }
  catch (e) {
    console.log(`this is web: ${JSON.stringify(obj)}`);
  }
}

NativeCom.sendFromNative = (paramsStr) => {
  try {
    paramsStr = Base64.atob(paramsStr);
    let params = JSON.parse(paramsStr);
    params = params || {};
    // const id = params.id;
    const cmd = params.cmd;
    switch (cmd) {
      case '':
        {
          break;
        }
      default:
        {
          break;
        }
    }
    params.type = 'response';
    _sendToNative(params);
  }
  catch (e) {
    const params = {};
    params.type = 'error';
    _sendToNative(params);
  }
};

export default NativeCom;
