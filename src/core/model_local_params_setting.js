
import Params from './params';

const LocalParamsSetting = {};
const self = LocalParamsSetting;
self.params = Params;

Array.prototype.contains = (obj) => {
  let i = this.length;
  while (i = i - 1) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

self.groups = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'];
self.curGroup = 1;

self.filterGroups = (page) => {
  const p = `P${page}`;
  const tmpArr = [];
  // const filterGroups = {};
  for (const [key, value] of Object.entries(Params)) {
  // for (const key in Params) {
    const row = value; //Params[key];
    if (p === row.group) {
      tmpArr.push(Params[key]);
    }
  }
  return tmpArr;
};

self.page = '2';

self.portName = 'no link';
self.slaverID = 1;
self.sendData = 'no input';
self.receiveData = 'no receive';

self.baudRate = -1;
self.baudRateRadioData = [
  {
    value: 4800,
  },
  {
    value: 9600,
  },
  {
    value: 19200,
  },
  {
    value: 38400,
  },
  {
    value: 57600,
  },
  {
    value: 115200,
  },
  {
    value: 921600,
  },
];

self.dataBits = 8;
self.dataBitsRadioData = [
  {
    value: 7,
  },
  {
    value: 8,
  },
];

self.stopBit = 1;
self.stopBitRadioData = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 1.5,
  },
  {
    value: 2,
  },
];

self.checkBits = 'None';
self.checkBitsRadioData = [
  {
    value: 'None',
  },
  {
    value: 'Even',
  },
  {
    value: 'Odd',
  },
];

self.icmupvlRevolute = 20000;
self.icmupvlMasterPeriodCount = 32;
self.icmupvlStatus = 1;
self.icmupvlInformation = 'No information';

self.monitorSelectionSampleTime = 9;
self.monitorSelectionXGrid = 500;

self.ch1 = {};
self.ch1.checkboxModel = ['3'];
self.ch1.checkboxData = [
  {
    id: '1',
    value: 'CH1',
  },
  {
    id: '2',
    value: 'Addr',
  },
  {
    id: '3',
    value: '32bit',
  },
];
self.ch1.selectText = 'Speed Command';
self.ch1.color = 'red';
self.ch1.unsigned = false;
self.ch1.move = 200;
self.ch1.grid = 1000;

self.ch2 = {};
self.ch2.checkboxModel = ['2'];
self.ch2.checkboxData = [
  {
    id: '1',
    value: 'CH2',
  },
  {
    id: '2',
    value: 'Addr',
  },
  {
    id: '3',
    value: '32bit',
  },
];
self.ch2.selectText = 'Speed Feedback';
self.ch2.color = 'lightgreen';
self.ch2.unsigned = true;
self.ch2.move = 200;
self.ch2.grid = 1000;

self.ch3 = {};
self.ch3.checkboxModel = ['2'];
self.ch3.checkboxData = [
  {
    id: '1',
    value: 'CH3',
  },
  {
    id: '2',
    value: 'Addr',
  },
  {
    id: '3',
    value: '32bit',
  },
];
self.ch3.selectText = 'Torque Feedback';
self.ch3.color = 'lightblue';
self.ch3.unsigned = true;
self.ch3.move = 200;
self.ch3.grid = 1000;

self.ch4 = {};
self.ch4.checkboxModel = ['2'];
self.ch4.checkboxData = [
  {
    id: '1',
    value: 'CH4',
  },
  {
    id: '2',
    value: 'Addr',
  },
  {
    id: '3',
    value: '32bit',
  },
];
self.ch4.selectText = 'Torque Output';
self.ch4.color = 'yellow';
self.ch4.unsigned = true;
self.ch4.move = 200;
self.ch4.grid = 1000;

// chart option

self.chartOption = {
  title: {
    text: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}',
  },
  legend: {
    left: 'left',
    data: ['CH1', 'CH2', 'CH3', 'CH4'],
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: 'x',
    // min: 0,
    // max: 5000,
    // nameLocation: 'start',
    splitLine: { show: true },
    data: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
  },
  yAxis: {
    type: 'value',
    // type: 'log',
    name: 'y',
    min: -5000,
    max: 5000,
    // nameLocation: 'start',
    splitLine: { show: true },
    data: [-5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000],
  },
  grid: {
    // show: true,
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '10%',
    containLabel: true,
  },
  color: [self.ch1.color, self.ch2.color, self.ch3.color, self.ch4.color],
  series: [
    {
      name: 'CH1',
      type: 'line',
      data: [-2100, -3300, 900, 2700, 100, -1000, 810, 2470, 7410, 2223, 4669],
    },
    {
      name: 'CH2',
      type: 'line',
      data: [200, 600, 1000, 3700, 2810, 900, 2700, 2470, 4410, 2223, 4669],
    },
    {
      name: 'CH3',
      type: 'line',
      data: [-2100, -3300, 900, 2700, 810, 2470, 4410, 2470, 7410, 2223, 4669],
    },
    {
      name: 'CH4',
      type: 'line',
      data: [-3100, -4300, 2900, 2470, 4410, 1700, 3810, 2470, 3410, 2223, 1669],
    },
  ],
};

// end of chart option

self.handleReport = (dict) => {
  dict = dict || {};
  if (dict.cmd !== 'devices_info_report') {
    return;
  }
  self.baudRate = dict.data.xarm_port_baudrate;
  self.portName = dict.data.xarm_port_name;
  console.log(`${self.dump()}`);
};

self.dump = () => {
  const str = 'local params infos:';
  return str;
};

export default self;
