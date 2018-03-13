
const LocalAppsMgr = {};
const self = LocalAppsMgr;

self.createApp = (params) => {
  const author = params.author;
  const name = params.name;
  const version = params.version;
  const type = params.type;
  const desc = params.desc;
  const support = params.support;
  const created = params.created;
  const contribution = params.contribution;
  return {
    author: author,
    name: name,
    version: version,
    support: support,
    desc: desc,
    created: created,
    contribution: contribution,
  }
};

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
    const aDefault = defaults[i];
    const params = {
      author: aDefault.author,
      name: aDefault.name,
      version: aDefault.version,
      desc: aDefault.desc,
      created: aDefault.created,
    };
    const app = self.createApp(params);
    self.allApps.default.data.push(app);
  }
  for (let i = 0; i < thirdpartys.length; i += 1) {
    const aThirdparty = thirdpartys[i];
    const params = {
      author: aThirdparty.author,
      name: aThirdparty.name,
      version: aThirdparty.version,
      desc: aThirdparty.desc,
      created: aThirdparty.created,
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
