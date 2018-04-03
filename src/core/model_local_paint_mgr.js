
import localPaintMgrData from './model_local_paint_mgr_data';

const path = require('path')

const LocalPaintMgr = {};
const self = LocalPaintMgr;

self.visible = {
  text: false,
  setting: false,
  pattern: false,
  projs: false,
  icons: false,
  clear: false,
  del: false,
};

self.curToDelIndex = -1;

self.state = {
  isRunnningPrint: false,
  buffer: [],
  saved: true,
  empty: true,
  backStep: 0,
  // mode: 'outline',
  zero: {
    grayscale: {
      laser: 21,
      pen: 22,
    },
    outline: {
      laser: 33,
      pen: 42,
    },
  },
  speed: 200,
};

self.curDialogProjInputText = '';
self.dialogErrorTips = '';
self.curDialogFontInputText = '';

self.projTypeSelected = 'outline'; // outline gray

self.projList = [];
self.curProj = null;

self.realProjName = (proj) => {
  if (proj === null || proj === undefined) {
    return '';
  }
  const dirname = path.dirname(proj.uuid);
  return path.basename(dirname);
};

// self.curProjName = () => {
//   if (self.curProj === null || self.curProj === undefined) {
//     return '';
//   }
//   return self.curProj.name;
// }

self.createProj = (params) => {
  return {
    uuid: params.uuid,
    created: params.created,
  }
};

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log('datas is not right');
    return;
  }
  self.projList = [];
  const datas = dict.data;
  const projs = [];
  // let index = 0;
  for (let i = 0; i < datas.length; i += 1) {
    const data = datas[i];
    if (data.path.indexOf('.json') > 0) {
      // projs.map((item) => {
      //   return it
      // });
      const dirname = path.dirname(data.path);
      data.uuid = data.path;
      data.name = path.basename(dirname);
      data.created = data.ctime;
      data.projType = data.path.indexOf('outline.json') > 0 ? 'outline' : 'gray';
      // data.index = index;
      projs.push(data);
      // index += 1;
    }
  }
  const sortedProjs = window.GlobalUtil.bubbleSort(projs, (a, b) => {
    return a.ctime_secs < b.ctime_secs;
  });
  let index = 0;
  for (let i = 0; i < sortedProjs.length; i += 1) {
    const oneProj = sortedProjs[i];
    oneProj.index = index;
    index += 1;
  }
  self.projList = sortedProjs;
};

self.findProjIndex = (uuid) => {
  for (let i = 0; i < self.projList.length; i += 1) {
    const proj = self.projList[i];
    if (proj.uuid === uuid) {
      return i;
    }
  }
  return -1;
};

self.dialog = {
  textInput: '', // text value
  fontSelect: 0, // select font
};

self.selectedIcon = null;

self.emotions = [
  {
    name: 'shape',
    list: localPaintMgrData.shapes1,
  },
  {
    name: 'emoji',
    list: localPaintMgrData.icons01,
  },
  {
    name: 'automobile',
    list: localPaintMgrData.icons02,
  },
  {
    name: 'fastfood',
    list: localPaintMgrData.icons03,
  },
  {
    name: 'outdoor',
    list: localPaintMgrData.icons04,
  },
  {
    name: 'starwar',
    list: localPaintMgrData.icons05,
  },
  {
    name: 'universe',
    list: localPaintMgrData.icons06,
  },
];

export default self;
