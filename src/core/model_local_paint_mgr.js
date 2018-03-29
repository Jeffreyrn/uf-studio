
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
};

self.curDialogProjInputText = '';
self.dialogErrorTips = '';
self.curDialogFontInputText = '';

self.projTypeSelected = 'outline'; // outline gray

self.projList = [];
self.curProj = null;

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
  let index = 0;
  for (let i = 0; i < datas.length; i += 1) {
    const data = datas[i];
    if (data.path.indexOf('app.json') > 0) {
      // projs.map((item) => {
      //   return it
      // });
      const dirname = path.dirname(data.path);
      data.uuid = data.path;
      data.name = path.basename(dirname);
      data.created = data.ctime;
      data.index = index;
      projs.push(data);
      index += 1;
    }
  }
  self.projList = projs;
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
