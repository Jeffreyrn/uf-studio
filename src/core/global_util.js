
import GlobalConstant from './global_constant.js';
import Model from './model';
import SocketCom from './socket_com';
import NativeCom from './native_com';
import CommandsEditorSocket from './commands_editor_socket';
import CommandsTeachSocket from './commands_teach_socket';
import CommandsAppsSocket from './commands_apps_socket';
// import CommandsBlocklySocket from './commands_blockly_socket';

// const args = {
//   // host: '192.168.1.166',
//   host: '192.168.1.67',
//   port: '18333',
// };

const GlobalUtil = {};
const self = GlobalUtil;
window.GlobalUtil = self;
self.store = {};
self.model = Model;
self.socketCom = SocketCom;

window.GlobalConstant = GlobalConstant;

CommandsEditorSocket.socketCom = SocketCom;
CommandsEditorSocket.model = Model;
window.CommandsEditorSocket = CommandsEditorSocket;

CommandsTeachSocket.socketCom = SocketCom;
CommandsTeachSocket.model = Model;
window.CommandsTeachSocket = CommandsTeachSocket;

CommandsAppsSocket.socketCom = SocketCom;
CommandsAppsSocket.model = Model;
window.CommandsAppsSocket = CommandsAppsSocket;

// CommandsBlocklySocket.socketCom = SocketCom;
// CommandsBlocklySocket.model = Model;
// window.CommandsBlocklySocket = CommandsBlocklySocket;

self.nativeCom = NativeCom;

self.autoSizeScale = 0;

self.isFileStr = (str) => {
  const errStr = `'Name contains "only letter, numbers, '_' and no more than 15 characters in total.${[]}`;
  if (str === null || str === undefined) {
    return false;
  }
  if (str.length === 0) {
    return false;
  }
  if (str.length > 15) {
    GlobalUtil.model.localProjTree.dialogErrorTips = errStr;
    GlobalUtil.model.localTeach.dialogErrorTips = errStr;
    return false;
  }
  const firstChar = str[0];
  if ( !(firstChar >= 'a' && firstChar <= 'z' || firstChar >= 'A' && firstChar <= 'Z') ) {
    // return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    const aChar = str[i];
    if ( !(aChar >= 'a' && aChar <= 'z' || aChar >= 'A' && aChar <= 'Z' || aChar === '_' || aChar >= '0' && aChar <= '9') ) {
      GlobalUtil.model.localProjTree.dialogErrorTips = errStr;
      GlobalUtil.model.localTeach.dialogErrorTips = errStr;
      return false;
    }
  }
  GlobalUtil.model.localProjTree.dialogErrorTips = '';
  GlobalUtil.model.localTeach.dialogErrorTips = '';
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

self.getScreenWidth = () => {
  self.screen_width = window.screen.width;
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
  const allStr = `${year}${self.pad(month + 1, 2)}${self.pad(day, 2)}${self.pad(hour, 2)}${self.pad(min, 2)}${self.pad(sec, 2)}${mill}`;
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

self.getUrlParam = (lan) => {
  const reg = new RegExp('(^|&)' + lan + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r === null || r.length < 2) {
    return '';
  }
  return unescape(r[2]);
};

export default self;
