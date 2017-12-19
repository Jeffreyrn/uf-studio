
import ReconnectingWebSocket from '../lib/reconnecting-websocket';

const SocketCom = {};

SocketCom.socket_info = {
  socket: null,
  host: null,
  port: null,
  socket_connected: false,
};

SocketCom.init_socket = (args) => {
  const self = SocketCom;
  // if (self.socket_info.socket !== null) return;
  args = args || {};
  args.logger = args.logger || console;
  args.host = args.host || 'localhost';
  args.port = args.port || '18321';
  self.socket_info.host = args.host;
  self.socket_info.port = args.port;
  const ws_url = `ws:${self.socket_info.host}:${self.socket_info.port}/ws`;
  self.socket_info.socket = new ReconnectingWebSocket(ws_url, null, {
    debug: true,
    logger: args.logger,
    reconnectInterval: 1000,
  });
};

SocketCom.init_onclose = (onclose) => {
  SocketCom.socket_info.socket.onclose = onclose;
};

SocketCom.init_onopen = (onopen) => {
  SocketCom.socket_info.socket.onopen = onopen;
};

SocketCom.init_onmessage = (onmessage) => {
  SocketCom.socket_info.socket.onmessage = onmessage;
};

SocketCom.init_onerror = (onerror) => {
  SocketCom.socket_info.socket.onerror = onerror;
};

SocketCom.msgid = 0;
SocketCom.response = '';
SocketCom.penddingCmds = {};
SocketCom.send_msg = (msg, callback) => {
  const self = SocketCom;
  if (self.msgid > 100000) { // restart from 100000
    self.msgid = 0;
  }
  self.msgid += 1;
  msg.id = `${self.msgid}`;
  if (callback) {
    self.penddingCmds[msg.id] = callback;
  }
  const js_msg = JSON.stringify(msg);
  self.socket_info.socket.send(js_msg);
  return msg.id;
};

SocketCom.handleResponse = (dict) => {
  const self = SocketCom;
  dict = dict || {};
  if (dict.type !== 'response') {
    return;
  }
  if (dict.id === null) {
    return;
  }
  const callback = self.penddingCmds[dict.id];
  if (callback) {
    callback(dict);
  }
};

export default SocketCom;
