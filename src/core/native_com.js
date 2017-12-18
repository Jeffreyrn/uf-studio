
import Base64 from '../lib/Base64';

const NativeCom = {};
window.NativeCom = NativeCom;

function _sendToNative(obj) {
	var u = navigator.userAgent.toLowerCase();
	var isApple = /iphone|ipad|ipod|ios/i.test(u);
	var isAndroid = /android/i.test(u);
	try {
			const jsonStr = JSON.stringify(obj);
	    if (true == isApple) {
	//            console.log("isApple true");
	        window.webkit.messageHandlers.GlobalViewControllerCallback.postMessage(obj);
					// window.webkit.messageHandlers.GlobalViewControllerCallback.postMessage(Base64.btoa(jsonStr));
	    }
	    if (true == isAndroid) {
	//            console.log("isAndroid true");
					window.messageHandlers.jsCallWebView(Base64.btoa(jsonStr));
	    }
	} catch (e) {
	    console.log("this is web: " + JSON.stringify(obj));
	}
}

NativeCom.sendFromNative = (paramsStr) => {
	// _sendToNative("paramsStr 2 = " + paramsStr);
    try {
    	paramsStr = Base64.atob(paramsStr);
			var params = JSON.parse(paramsStr);
			params = params || {};
			const id = params.id;
			const cmd = params.cmd;
			switch (cmd) {
				case '': {
					break;
				}
				default: {
					break;
				}
			}
    	params.type = 'response';
    	_sendToNative(params);
    } catch (e) {
    	params = {};
    	params.type = 'error';
        _sendToNative(params);
    }
}

export default NativeCom;
