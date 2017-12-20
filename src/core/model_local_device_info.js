
const LocalDeviceInfo = {};
const self = LocalDeviceInfo;
self.xarm_port_baudrate = 0;
self.core_version = '';
self.xarm_port_name = '';
self.xarm_port_serial_number = '';
self.xarm_version = '';

self.handleReport = (dict) => {
  dict = dict || {};
  if (dict.cmd !== 'devices_info_report') {
    return;
  }
  if (dict.type !== 'report') {
    return;
  }
  self.xarm_port_baudrate = dict.data.xarm_port_baudrate;
  self.core_version = dict.data.core_version;
  self.xarm_port_name = dict.data.xarm_port_name;
  self.xarm_port_serial_number = dict.data.xarm_port_serial_number;
  self.xarm_version = dict.data.xarm_version;
  // console.log(`${self.dump()}`);
  self.dump();
};

self.dump = () => {
  let str = 'device infos:';
  str = `${str}\n xarm_port_baudrate: ${self.xarm_port_baudrate}`;
  str = `${str}\n core_version: ${self.core_version}`;
  str = `${str}\n xarm_port_name: ${self.xarm_port_name}`;
  str = `${str}\n xarm_port_serial_number: ${self.xarm_port_serial_number}`;
  str = `${str}\n xarm_version: ${self.xarm_version}`;
  return str;
};

export default self;
