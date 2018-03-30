
const uuidv4 = require('uuid/v4');

const LocalAppsMgr = {};
const self = LocalAppsMgr;

self.isProjListDialogShow = false;
self.curDialogTitle = '';
self.projListDialogType = '';
self.curProTreeDatas = [];
self.curProName = ''
self.appTreeDatas = [
  {
    uuid: '',
    type: 'proj',
    label: 'Default App',
    children: [],
  },
  {
    uuid: '',
    type: 'proj',
    label: 'Third-Party App',
    children: [],
  },
  {
    uuid: '',
    type: 'proj',
    label: 'My App',
    children: [],
  },
];
self.setProjListDialogType = (type) => {
  self.projListDialogType = type;
  self.isProjListDialogShow = true;
  switch (type) {
    case 'app': {
      self.curDialogTitle = 'Select an Application';
      self.curProTreeDatas = self.appTreeDatas;
      console.log(`self.curProTreeDatas app = ${JSON.stringify(self.appTreeDatas)}`);
      break;
    }
    case 'ide': {
      self.curProTreeDatas = window.GlobalUtil.model.localProjTree.allProsTreeDatas;
      self.curDialogTitle = 'Select an IDE File';
      // console.log(`ide curProTreeDatas = ${JSON.stringify(self.curProTreeDatas)}`);
      break;
    }
    case 'teach': {
      self.curProTreeDatas = window.GlobalUtil.model.localTeach.curProTreeDatas;
      self.curDialogTitle = 'Select a Recording File';
      break;
    }
    default:
      break;
  }
};

// self.isTeachProjListDialogShow = false;
// self.isAppsProjListDialogShow = false;

self.createApp = (params) => {
  if (params.size === undefined) {
    params.size = 0;
  }
  let omitname = params.name;
  const ll = 10;
  if (omitname.length > ll) {
    omitname = omitname.substr(0, ll);
    omitname = `${omitname}...`
  }
  return {
    author: params.author,
    name: params.name,
    omitname: omitname,
    appType: params.appType,
    category: params.category,
    version: params.version,
    support: params.support,
    des: params.des,
    created: params.created,
    userId: params.userId,
    contribution: params.contribution,
    control: params.control,
    size: params.size,
  }
};

self.curUploadState = 'normal';

self.allApps = {
  thirdparty: {
    data: [],
  },
  default: {
    data: [],
  },
  my: {
    data: [],
  },
}

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log('datas is not right');
    return;
  }
  const defaults = dict.data.default;
  const thirdpartys = dict.data.thirdparty;

  self.allApps.default.data = [];
  self.allApps.thirdparty.data = [];

  self.appTreeDatas[0].children = [];
  self.appTreeDatas[1].children = [];

  for (let i = 0; i < defaults.length; i += 1) {
    const one = defaults[i];
    const params = {
      author: one.author,
      appType: one.appType,
      category: 'default',
      name: one.name,
      version: one.version,
      des: one.description,
      control: one.control,
      created: one.created,
      userId: one.userId,
      size: one.size,
      contribution: one.contribution,
    };
    const app = self.createApp(params);
    self.allApps.default.data.push(app);

    if (one.control === 'run') {
      self.appTreeDatas[0].children.push({
        label: one.name, // + one.control,
        type: 'file',
        uuid: uuidv4(),
        control: one.control,
        category: 'default',
      });
    }
  }
  for (let i = 0; i < thirdpartys.length; i += 1) {
    const one = thirdpartys[i];
    const params = {
      author: one.author,
      appType: one.appType,
      category: 'thirdparty',
      name: one.name,
      version: one.version,
      des: one.description,
      control: one.control,
      created: one.created,
      userId: one.userId,
      size: one.size,
      contribution: one.contribution,
    };
    const app = self.createApp(params);
    self.allApps.thirdparty.data.push(app);

    if (one.control === 'run') {
      self.appTreeDatas[1].children.push({
        label: one.name, // + one.control,
        type: 'file',
        uuid: uuidv4(),
        control: one.control,
        category: 'thirdparty',
      });
    }
  }
  // test
  // const app1 = self.createApp({name: 'my-test-1'});
  // self.allApps.my.data.push(app1);
  // const app2 = self.createApp({name: 'my-test-2'});
  // self.allApps.my.data.push(app2);
};

self.remoteMyProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log('datas is not right');
    return;
  }
  const data = dict.data;

  self.allApps.my.data = [];

  self.appTreeDatas[2].children = [];

  for (let i = 0; i < data.length; i += 1) {
    const one = data[i];
    const params = {
      author: one.author,
      appType: one.appType,
      category: 'myapp',
      name: one.name,
      version: one.version,
      des: one.description,
      control: one.control,
      created: one.created,
      userId: one.userId,
      size: one.size,
      contribution: one.contribution,
    };
    const app = self.createApp(params);
    self.allApps.my.data.push(app);

    self.appTreeDatas[2].children.push({
      label: one.name,
      type: 'file',
      uuid: uuidv4(),
      control: one.control,
      category: 'myapp',
    });
  }
};

export default self;
