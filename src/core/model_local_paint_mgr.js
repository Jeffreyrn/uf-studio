
const LocalPaintMgr = {};
const self = LocalPaintMgr;

self.visible = {
  text: false,
  setting: false,
  pattern: false,
};

self.curDialogProjInputText = '';
self.dialogErrorTips = '';

self.projTypeSelected = 'outline'; // outline gray

self.projList = []

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log('datas is not right');
    // return;
  }
};

export default self;
