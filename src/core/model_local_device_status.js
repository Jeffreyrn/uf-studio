
const LocalDeviceStatus = {};
const self = LocalDeviceStatus;
self.xarm_warn_code = 0;
self.socket_connected = false;
self.xarm_connected = false;
self.xarm_printed = false;
self.xarm_error_code = false;
self.xarm_paused = false;

self.onmessage = (evt) => {
  let dict = JSON.parse(evt.data);
  dict = dict || {};
  if (dict.cmd !== 'devices_status_report') {
    return;
  }
  if (dict.type !== 'report') {
    return;
  }
  self.xarm_warn_code = dict.data.xarm_warn_code;
  self.xarm_connected = dict.data.xarm_connected;
  self.xarm_printed = dict.data.xarm_printed;
  self.xarm_error_code = dict.data.xarm_error_code;
  self.xarm_paused = dict.data.xarm_paused;
  // console.log(`${self.dump()}`);
  self.dump();
};

// self.handleReport = (dict) => {
//   dict = dict || {};
//   dict.data = dict.data || {};
//   if (dict.cmd !== 'devices_status_report') {
//     return;
//   }
//   if (dict.type !== 'report') {
//     return;
//   }
//   self.xarm_warn_code = dict.data.xarm_warn_code;
//   self.xarm_connected = dict.data.xarm_connected;
//   self.xarm_printed = dict.data.xarm_printed;
//   self.xarm_error_code = dict.data.xarm_error_code;
//   self.xarm_paused = dict.data.xarm_paused;
//   // console.log(`${self.dump()}`);
//   self.dump();
// };

self.dump = () => {
  let str = 'device status:';
  str = `${str}\n xarm_warn_code: ${self.xarm_warn_code}`;
  str = `${str}\n xarm_connected: ${self.xarm_connected}`;
  str = `${str}\n xarm_printed: ${self.xarm_printed}`;
  str = `${str}\n xarm_error_code: ${self.xarm_error_code}`;
  str = `${str}\n xarm_error_code: ${self.xarm_error_code}`;
  return str;
};

export default self;
