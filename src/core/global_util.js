
import Model from './model';
import SocketCom from './socket_com';
import NativeCom from './native_com';
import CommandsSocket from './commands_socket';
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
// self.commandsSocket = CommandsSocket;
CommandsSocket.socketCom = SocketCom;
window.CommandsSocket = CommandsSocket;
self.nativeCom = NativeCom;

self.autoSizeScale = 0;

self.getMinWidth = () => {
  const min_width = Math.min(screen.width, screen.height);
  self.min_width = Math.min(min_width, 480);
  return self.min_width;
};
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
  console.log(`self.screen_width = ${GlobalUtil.screen_width}`);
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

self.socketCom.close = () => {
  self.socketCom.socket_info.socket.close();
};

self.socketCom.open = () => {
  self.socketCom.init_socket(args);
  self.socketCom.init_onopen((evt) => {
    console.log('onopen onopen onopen');
    self.model.localDeviceStatus.socket_connected = true;
    self.model.localDeviceStatus.xarm_connected = true;
    self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
    GlobalUtil.model.localProjTree.getProjsFromArm((dict) => {
      console.log(`listProjs dict = ${JSON.stringify(dict)}`);
    });
  });
  self.socketCom.init_onclose((evt) => {
    self.model.localDeviceStatus.socket_connected = false;
    self.model.localDeviceStatus.xarm_connected = false;
    self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
    console.log('onclose onclose onclose');
  });
  self.socketCom.init_onerror((evt) => {
    self.model.localDeviceStatus.socket_connected = false;
    self.model.localDeviceStatus.xarm_connected = false;
    self.model.robot.info.connected = self.model.localDeviceStatus.xarm_connected;
    const temp_msg = JSON.parse(evt.data);
    console.log(`onerror onerror onerror = ${evt.data}`);
  });
  self.socketCom.init_onmessage((evt) => {
    const temp_msg = JSON.parse(evt.data);
    // console.log('onmessage onmessage onmessage = ' + evt.data);
    // self.model.localDeviceInfo.handleReport(temp_msg);
    // self.model.localDeviceStatus.handleReport(temp_msg);
    // self.model.localParamsSetting.handleReport(temp_msg);
    // self.socketCom.handleResponse(temp_msg);
    self.model.localDeviceInfo.onmessage(evt);
    self.model.localDeviceStatus.onmessage(evt);
    self.model.localParamsSetting.onmessage(evt);
    self.socketCom.onmessage(evt);
    self.model.robot.onmessage(evt);
    if (temp_msg.type === 'response') {
      self.socketCom.response = evt.data;
    }
  });
};

self.socketCom.open();

self.getUrlParam = (lan) => {
  const reg = new RegExp('(^|&)' + lan + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r === null || r.length < 2) {
    return '';
  }
  return unescape(r[2]);
};

export default self;
