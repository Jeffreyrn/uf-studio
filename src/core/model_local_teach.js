
const path = require('path')

const LocalTeach = {};
const self = LocalTeach;

self.curProjList = [];
self.curProj = {};

self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
};

self.createFile = (uuid, superid, proId, type, name, content) => {
  const file = {
    // index: indexCounter += 1,
    uuid: uuid,
    superid: superid,
    type: type,
    name: name,
    localContent: content,
    remoteContent: content,
    proId: proId,
  };
  // if (self.curProj.files !== undefined) {
  //   self.curProj.files.push(file);
  // }
  return file;
};

self.getProjInfo = (uuid) => {
  for (let i = 0; i < self.curProjList.length; i += 1) {
    const proj = self.curProjList[i];
    if (proj.uuid === uuid) {
      return proj;
    }
  }
  return null;
};

self.remoteProjs2Local = (dict) => {
  const projs = [];
  const datas = dict.data;
  console.log(`dict.data = ${JSON.stringify(dict.data)}`);
  let filesDict = {};
  // console.log(`datas = ${datas}`);
  for (let i = 0; i < datas.length; i += 1) {
    const data = datas[i];
    if (path.basename(data).indexOf('.') === 0) {
      continue;
    }
    // check which project
    const projName = data.replace(CommandsTeachSocket.ROOT_DIR + "/", "").split("/")[0];
    const projPath = path.join(CommandsTeachSocket.ROOT_DIR, projName);
    let curProj = null;
    for (let i = 0; i < projs.length; i += 1) {
      const proj = projs[i];
      if (proj.name === projName) {
        curProj = proj;
      }
    }
    if (curProj === null) {
      curProj = {};
      curProj.name = projName;
      curProj.uuid = projPath;
      curProj.files = [];
      projs.push(curProj);
    }
    // const filename = path.basename(data);
    // let file = {
    //   uuid: data,
    //   name: filename,
    //   localContent: '',
    //   remoteContent: '',
    //   proId: projPath,
    // };
    // if (file.uuid !==  projPath) {
    //   curProj.files.push(file);
    // }

    let tempPath = data;
    while (tempPath !== projPath && tempPath !== CommandsTeachSocket.ROOT_DIR) {
      const isExistFile = filesDict[tempPath] !== undefined && filesDict[tempPath] !== null;
      filesDict[tempPath] = ''; // tempPath; //
      const uuid = tempPath; // Base64.btoa(tempPath);
      let superpath = path.dirname(tempPath);
      if (superpath === projPath || superpath === CommandsTeachSocket.ROOT_DIR) {
        superpath = '';
      }
      const name = path.basename(tempPath);
      const superid = superpath; //Base64.btoa(superpath); //
      const isProFile = path.basename(tempPath).indexOf('.') > 0;
      let fileType = isProFile ? self.PROJ_TREE_TYPE.FILE : self.PROJ_TREE_TYPE.FOLDER;
      // console.log(`isProFile = ${isProFile}, isExistFile = ${isExistFile}`);
      if (isExistFile === false) {
        let file = self.createFile(uuid, superid, curProj.uuid, fileType, name, '');
        curProj.files.push(file);
      }
      tempPath = path.dirname(tempPath);
    } //;

    // console.log(`filesDict = ${JSON.stringify(filesDict)}`);
    // console.log(`curProj.files = ${JSON.stringify(curProj.files)}`);
  }
  self.curProjList = projs;
  // if (self.curProj === null || self.curProj === undefined || self.curProj.uuid === undefined) {
  //   self.changeProj(self.curProjList[0].uuid);
  // }
  // else {
  //   self.changeProj(self.curProj.uuid);
  // }
  console.log(`self.curProjList = ${JSON.stringify(self.curProjList)}`);
  self.curPro2Tree();
};

self.curProTreeDatas = [];
self.curPro2Tree = () => {
  let tempDatas = [];
  for (let i = 0; i < self.curProjList.length; i += 1) {
    const proj = self.curProjList[i]
    const aChild = {};
    aChild.label = proj.name;
    aChild.uuid = proj.uuid;
    aChild.children = [];
    tempDatas.push(aChild);
    for (let j = 0; j < proj.files.length; j += 1) {
      const file = proj.files[j];
      const bChild = {};
      bChild.label = file.name;
      bChild.uuid = file.uuid;
      aChild.children.push(bChild);
    }
  }
  self.curProTreeDatas = tempDatas;
};

self.curPoint = {
  a0: 50,
  a1: 50,
  a2: 50,
  a3: 50,
  a4: 50,
  a5: 50,
  a6: 50,
};

self.curDuration = 0;
self.msMin = 0;
self.msMax = 1800;
let allX = [];
for (let i = 0; i <= self.msMax; i += 1) {
  allX.push(i);
}

// chart option
self.ch0 = {};
self.ch0.color = 'pink';

self.ch1 = {};
self.ch1.color = 'red';

self.ch2 = {};
self.ch2.color = 'lightgreen';

self.ch3 = {};
self.ch3.color = 'lightblue';

self.ch4 = {};
self.ch4.color = 'yellow';

self.ch5 = {};
self.ch5.color = 'blue';

self.ch6 = {};
self.ch6.color = 'lightpink';

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
    data: ['CH0', 'CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6'],
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: 'x',
    // min: 0,
    // max: 5000,
    // nameLocation: 'start',
    splitLine: { show: true },
    data: allX,
  },
  yAxis: {
    type: 'value',
    // type: 'log',
    name: 'y',
    min: 0,
    max: 360,
    // nameLocation: 'start',
    splitLine: { show: true },
    // data: [-5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000],
  },
  grid: {
    // show: true,
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '10%',
    containLabel: true,
  },
  color: [self.ch0.color, self.ch1.color, self.ch2.color, self.ch3.color, self.ch4.color, self.ch5.color, self.ch6.color],
  series: [
    {
      name: 'CH0',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH1',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH2',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH3',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH4',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH5',
      type: 'line',
      data: [180],
    },
    {
      name: 'CH6',
      type: 'line',
      data: [180],
    },
  ],
};

self.pushPoint = (points) => {
  self.chartOption.series[0].data.push(points[0]);
  self.chartOption.series[1].data.push(points[1]);
  self.chartOption.series[2].data.push(points[2]);
  self.chartOption.series[3].data.push(points[3]);
  self.chartOption.series[4].data.push(points[4]);
  self.chartOption.series[5].data.push(points[5]);
  self.chartOption.series[6].data.push(points[6]);
}

self.setPoint = (ch, index, value) => {
  self.chartOption.series[ch].data[index] = value;
};

self.getPoint = (index) => {
  const a0 = self.chartOption.series[0].data[index];
  const a1 = self.chartOption.series[1].data[index];
  const a2 = self.chartOption.series[2].data[index];
  const a3 = self.chartOption.series[3].data[index];
  const a4 = self.chartOption.series[4].data[index];
  const a5 = self.chartOption.series[5].data[index];
  const a6 = self.chartOption.series[6].data[index];
  return [a0, a1, a2, a3, a4, a5, a6];
};

let isA0Add = true;
let isA1Add = true;
let isA2Add = true;
let isA3Add = true;
let isA4Add = true;
let isA5Add = true;
let isA6Add = true;

let isChAdd = [true, false, true, false, true, false];

self.pushTestData = (ch) => {
  // ch0
  let data = self.chartOption.series[ch].data;
  let diff = GlobalUtil.randomNumber(0, 10);
  let lastData = data[data.length - 1];
  if (lastData >= 360) {
    isChAdd[ch] = false;
  }
  else if (lastData <= 0) {
    isChAdd[ch] = true;
  }
  if (isChAdd[ch] === false) {
    diff = -diff;
  }
  data.push(lastData + diff);
};

self.genAndPushTestPoints = () => {
  // const data = self.chartOption.series[0].data;
  if (1 == 2) {
    self.chartOption.series[0].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[1].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[2].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[3].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[4].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[5].data.push(CommandsSocket.getTestPost());
    self.chartOption.series[6].data.push(CommandsSocket.getTestPost());
  }
  else {
    self.pushTestData(0);
    self.pushTestData(1);
    self.pushTestData(2);
    self.pushTestData(3);
    self.pushTestData(4);
    self.pushTestData(5);
    self.pushTestData(6);

    // ch0
    // let data0 = self.chartOption.series[0].data;
    // let diff0 = GlobalUtil.randomNumber(0, 5);
    // let lastData0 = data0[data0.length - 1];
    // if (lastData0 >= 360) {
    //   isA0Add = false;
    // }
    // else if (lastData0 <= 0) {
    //   isA0Add = true;
    // }
    // if (isA0Add === false) {
    //   diff0 = -diff0;
    // }
    // data0.push(lastData0 + diff0);

    // ch1
    // let data1 = self.chartOption.series[1].data;
    // let diff1 = GlobalUtil.randomNumber(0, 5);
    // let lastData1 = data1[data1.length - 1];
    // if (lastData1 >= 360) {
    //   isA1Add = false;
    // }
    // else if (lastData1 <= 0) {
    //   isA1Add = true;
    // }
    // if (isA1Add === false) {
    //   diff1 = -diff1;
    // }
    // data1.push(lastData1 + diff1);

    // let data1 = self.chartOption.series[1].data;
    // data1.push(data1[data1.length - 1] + GlobalUtil.randomNumber(-5, 5));

    // let data2 = self.chartOption.series[2].data;
    // data2.push(data2[data2.length - 1] + GlobalUtil.randomNumber(0, 10));
    //
    // let data3 = self.chartOption.series[3].data;
    // data3.push(data3[data3.length - 1] + GlobalUtil.randomNumber(0, 10));
    //
    // let data4 = self.chartOption.series[4].data;
    // data4.push(data4[data4.length - 1] + GlobalUtil.randomNumber(0, 10));
    //
    // let data5 = self.chartOption.series[5].data;
    // data5.push(data5[data5.length - 1] + GlobalUtil.randomNumber(0, 10));
    //
    // let data6 = self.chartOption.series[6].data;
    // data6.push(data6[data6.length - 1] + GlobalUtil.randomNumber(0, 10));

    // data0[data0.length] = data0[data0.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data0[data0.length] = Math.min(360, Math.max(data0[data0.length], 0));

    // let data1 = self.chartOption.series[1].data;
    // data1[data1.length] = data1[data1.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data1[data1.length] = Math.min(360, Math.max(data1[data1.length], 0));
    //
    // let data2 = self.chartOption.series[2].data;
    // data2[data2.length] = data2[data2.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data2[data2.length] = Math.min(360, Math.max(data2[data2.length], 0));
    //
    // let data3 = self.chartOption.series[3].data;
    // data3[data3.length] = data3[data3.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data1[data3.length] = Math.min(360, Math.max(data3[data3.length], 0));
    //
    // let data4 = self.chartOption.series[4].data;
    // data4[data4.length] = data4[data4.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data4[data4.length] = Math.min(360, Math.max(data4[data4.length], 0));
    //
    // let data5 = self.chartOption.series[5].data;
    // data5[data5.length] = data5[data5.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data5[data5.length] = Math.min(360, Math.max(data5[data5.length], 0));
    //
    // let data6 = self.chartOption.series[6].data;
    // data6[data6.length] = data6[data6.length - 1] + GlobalUtil.randomNumber(-5, 5);
    // data6[data6.length] = Math.min(360, Math.max(data6[data6.length], 0));

    // console.log(`data0 = ${JSON.stringify(data0)}`);
  }
};

// end of chart option

export default self;
