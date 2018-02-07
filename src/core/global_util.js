
import GlobalConstant from './global_constant.js';
import Model from './model';
import SocketCom from './socket_com';
import NativeCom from './native_com';
import CommandsEditorSocket from './commands_editor_socket';
import CommandsTeachSocket from './commands_teach_socket';

// import CommandsHttp from './commands_http';

const args = {
  // host: '192.168.1.166',
  host: '192.168.1.67',
  port: '18333',
};

const GlobalUtil = {};
const self = GlobalUtil;
window.GlobalUtil = self;
self.store = {};
self.model = Model;
self.socketCom = SocketCom;
// self.commandsHttp = CommandsHttp;
// self.CommandsEditorSocket = CommandsEditorSocket;
CommandsEditorSocket.socketCom = SocketCom;
CommandsEditorSocket.model = Model;
window.CommandsEditorSocket = CommandsEditorSocket;
CommandsTeachSocket.socketCom = SocketCom;
CommandsTeachSocket.model = Model;
window.CommandsTeachSocket = CommandsTeachSocket;
self.nativeCom = NativeCom;

self.autoSizeScale = 0;

self.isFileStr = (str) => {
  if (str === null || str === undefined) {
    return false;
  }
  if (str.length === 0) {
    return false;
  }
  if (str.length > 10) {
    return false;
  }
  const firstChar = str[0];
  if ( !(firstChar >= 'a' && firstChar <= 'z' || firstChar >= 'A' && firstChar <= 'Z') ) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    const aChar = str[i];
    if ( !(aChar >= 'a' && aChar <= 'z' || aChar >= 'A' && aChar <= 'Z' || aChar === '_' || aChar >= '0' && aChar <= '9') ) {
      return false;
    }
  }
  return true;
}

self.getMinWidth = () => {
  const min_width = Math.min(screen.width, screen.height);
  self.min_width = Math.min(min_width, 480);
  return self.min_width;
};
self.uniqueArr = (arr) => {
  let result = [];
  let hash = {};
  for (let i = 0, elem; (elem = arr[i]) != null; i += 1) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}

self.randomNumber = (begin, end) => {
 return Math.floor(Math.random() * (end - begin)) + begin;
}

self.getMinWidth();

// self.onwinresize = () => {
//   // console.log(`global window width: ${document.body.clientWidth}, height: ${document.body.clientHeight}`);
//   let store = self.store;
//   store.clientWidth = document.body.clientWidth;
//   store.clientHeight = document.body.clientHeight;
//   console.log(`2 global window width: ${store.clientWidth}, height: ${store.clientHeight}`);
//   self.store = store;
// };

self.getScreenWidth = () => {
  self.screen_width = window.screen.width;
  // self.screen_width = document.body.clientWidth;
  // console.log(`self.screen_width = ${GlobalUtil.screen_width}`);
  return self.screen_width;
};
self.getScreenWidth();

self.adaptSize = (x) => {
  return x * self.autoSizeScale;
};

GlobalUtil.fixSize = () => {
  // GlobalUtil.min_width = 480;
  const div = document.getElementById('index-page');
  div.style.width = `${GlobalUtil.min_width / 9.0 * 16.0}px`;
  div.style.height = `${GlobalUtil.min_width}px`;
};

self.getTimeString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const mill = date.getMilliseconds();
  const allStr = `${year}${self.pad(month + 1, 2)}${self.pad(day + 1, 2)}${self.pad(hour + 1, 2)}${self.pad(min + 1, 2)}${self.pad(sec + 1, 2)}${mill}`;
  return allStr;
};

self.pad = (num, n) => {
  let len = num.toString().length;
   while(len < n) {
     num = "0" + num;
     len += 1;
   }
   return num;
};

// self.socketCom.close = () => {
//   self.socketCom.socket_info.socket.close();
// };

// self.socketCom.open = () => {
//   self.socketCom.init_socket(args);
//   self.socketCom.init_onopen((evt) => {
//     // console.log('onopen onopen onopen');
//     self.model.localDeviceStatus.socket_connected = true;
//     self.model.localDeviceStatus.xarm_connected = true;
//     self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
//     // GlobalUtil.model.localProjTree.getProjsFromArm((dict) => {
//     //   console.log(`listProjs dict = ${JSON.stringify(dict)}`);
//     // });
//     CommandsEditorSocket.listProjs((dict) => {

//     });
//     CommandsTeachSocket.listProjs((dict) => {

//     });
//   });
//   self.socketCom.init_onclose((evt) => {
//     self.model.localDeviceStatus.socket_connected = false;
//     self.model.localDeviceStatus.xarm_connected = false;
//     self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
//     // console.log('onclose onclose onclose');
//   });
//   self.socketCom.init_onerror((evt) => {
//     self.model.localDeviceStatus.socket_connected = false;
//     self.model.localDeviceStatus.xarm_connected = false;
//     self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
//     const temp_msg = JSON.parse(evt.data);
//     // console.log(`onerror onerror onerror = ${evt.data}`);
//   });
//   self.socketCom.init_onmessage((evt) => {
//     const temp_msg = JSON.parse(evt.data);
//     self.model.localDeviceInfo.onmessage(evt);
//     self.model.localDeviceStatus.onmessage(evt);
//     self.model.localParamsSetting.onmessage(evt);
//     self.socketCom.onmessage(evt);
//     self.model.robot.onmessage(evt);
//     if (temp_msg.type === 'response') {
//       self.socketCom.response = evt.data;
//     }
//   });
// };
// self.socketCom.open();

self.getUrlParam = (lan) => {
  const reg = new RegExp('(^|&)' + lan + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r === null || r.length < 2) {
    return '';
  }
  return unescape(r[2]);
};

export default self;
