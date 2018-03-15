
const LocalAppsMgr = {};
const self = LocalAppsMgr;

self.createApp = (params) => {
  const author = params.author;
  const name = params.name;
  const category = params.category;
  const version = params.version;
  const appType = params.appType;
  const des = params.des;
  const support = params.support;
  const created = params.created;
  const contribution = params.contribution;
  const control = params.control;
  return {
    author: author,
    name: name,
    appType: appType,
    category: category,
    version: version,
    support: support,
    des: des,
    created: created,
    contribution: contribution,
    control: control,
  }
};

self.curUploadState = 'normal';

self.allApps = {
  thirdparty: {
    data:[],
  },
  default: {
    data:[],
  },
  my: {
    data:[],
  },
}

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log(`datas is not right`);
    return;
  }
  const defaults = dict.data.default;
  const thirdpartys = dict.data.thirdparty;
  self.allApps.default.data = [];
  self.allApps.thirdparty.data = [];
  self.allApps.my.data = [];
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
    };
    const app = self.createApp(params);
    self.allApps.default.data.push(app);
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
    };
    const app = self.createApp(params);
    self.allApps.thirdparty.data.push(app);
  }
  // test
  const app1 = self.createApp({name: 'my-test-1'});
  self.allApps.my.data.push(app1);
  const app2 = self.createApp({name: 'my-test-2'});
  self.allApps.my.data.push(app2);
};

export default self;
