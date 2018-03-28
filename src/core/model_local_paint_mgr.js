const path = require('path')

const LocalPaintMgr = {};
const self = LocalPaintMgr;

self.visible = {
  text: false,
  setting: false,
  pattern: false,
  projs: false,
  icons: false,
};

self.curDialogProjInputText = '';
self.dialogErrorTips = '';

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

self.iconFiles = [
  // 01
  '../assets/img/paint/icons/01_EMOJI/angry.svg',
  // './../assets/img/paint/icons/01_EMOJI/crazy.svg',
  // './../assets/img/paint/icons/01_EMOJI/crying.svg',
  // './../assets/img/paint/icons/01_EMOJI/crying01.svg',
  // './../assets/img/paint/icons/01_EMOJI/dead.svg',
  // './../assets/img/paint/icons/01_EMOJI/embarrassed.svg',
  // './../assets/img/paint/icons/01_EMOJI/embarrassed01.svg',
  // './../assets/img/paint/icons/01_EMOJI/evil.svg',
  // './../assets/img/paint/icons/01_EMOJI/freeze.svg',
  // './../assets/img/paint/icons/01_EMOJI/friendly.svg',
  // './../assets/img/paint/icons/01_EMOJI/happiness.svg',
  // './../assets/img/paint/icons/01_EMOJI/happiness01.svg',
  // './../assets/img/paint/icons/01_EMOJI/happy.svg',
  // './../assets/img/paint/icons/01_EMOJI/happy01.svg',
  // './../assets/img/paint/icons/01_EMOJI/happy02.svg',
  // './../assets/img/paint/icons/01_EMOJI/hilarious.svg',
  // './../assets/img/paint/icons/01_EMOJI/indifferent.svg',
  // './../assets/img/paint/icons/01_EMOJI/indifferent01.svg',
  // './../assets/img/paint/icons/01_EMOJI/inlove.svg',
  // './../assets/img/paint/icons/01_EMOJI/inlove01.svg',
  // './../assets/img/paint/icons/01_EMOJI/kiss.svg',
  // './../assets/img/paint/icons/01_EMOJI/laughing.svg',
  // './../assets/img/paint/icons/01_EMOJI/naughty.svg',
  // './../assets/img/paint/icons/01_EMOJI/nerd.svg',
  // './../assets/img/paint/icons/01_EMOJI/nerd01.svg',
  // './../assets/img/paint/icons/01_EMOJI/sad.svg',
  // './../assets/img/paint/icons/01_EMOJI/sad02.svg',
  // './../assets/img/paint/icons/01_EMOJI/scared.svg',
  // './../assets/img/paint/icons/01_EMOJI/smile.svg',
  // './../assets/img/paint/icons/01_EMOJI/spechless.svg',
  // './../assets/img/paint/icons/01_EMOJI/stress.svg',
  // './../assets/img/paint/icons/01_EMOJI/surprised.svg',
  // './../assets/img/paint/icons/01_EMOJI/suspect.svg',
  // './../assets/img/paint/icons/01_EMOJI/upset.svg',
  // './../assets/img/paint/icons/01_EMOJI/wink.svg',
  // './../assets/img/paint/icons/01_EMOJI/wink01.svg',
];

// self.icons = {};
// for (let i = 0; i < self.iconFiles.length; i += 1) {
//   const path = self.iconFiles[i];
//   const arr = path.split('/');
//   const last = arr[arr.length - 1];
//   const last2 = arr[arr.length - 2];
//   const key = `${last2}_${last}`;
//   self.icons[key] = require(path); // 'aab';// 
// }
// console.log(`self.icons = ${JSON.stringify(self.icons)}`);

export default self;
