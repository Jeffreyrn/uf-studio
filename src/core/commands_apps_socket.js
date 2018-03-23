
// const path = require('path')
const merge = require('webpack-merge')

const CommandsAppsSocket = {};
const self = CommandsAppsSocket;
window.CommandsAppsSocket = CommandsAppsSocket;

// self.VERSION = GlobalConstant.VERSION;
// self.userId = GlobalConstant.userId;

//
// self.ROOT_DIR = '/python';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

self.listApps = (callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      // root: self.ROOT_DIR, // 要获取的目录
      // type: "detail", // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_GET_APPS, params, (dict) => {
    window.GlobalUtil.model.localAppsMgr.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.createFile = (name, content, callback1) => {
  // let curProj = self.model.localTeach.curProj;
  // if (curProj === null || curProj === undefined || curProj === {}) {
  //   return;
  // }
  // const filePath = path.join(curProj.uuid, `${name}.json`);
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      // root: filePath, // 文件夹的父目录，必须
      appName: name, // 文件夹名称, 可省略
      xmlData: content, // 文件内容
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_CREATE, params, () => {
    // dict.uuid = filePath;
    // console.log(`TEACH_ID_CREATE_FILE dict = ${JSON.stringify(dict)}`);
    // if (callback1) {
    //   callback1(dict);
    // }
    self.listLocalApps(callback1);
  });
};

self.renameFile = (oldName, newName, callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      oldName,
      newName,
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_RENAME, params, () => {
    self.listLocalApps(callback);
  });
};

self.delFile = (name, callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      appName: name,
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_REMOVE, params, () => {
    self.listLocalApps(callback);
  });
};

self.uploadFile = (name, appInfo, callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      appName: name,
      appInfo: appInfo,
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_UPLOAD, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

self.listLocalApps = (callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      // root: self.ROOT_DIR, // 要获取的目录
      // type: "detail", // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_GET_LOCAL_APPS, params, (dict) => {
    // GlobalUtil.model.localAppsMgr.remoteProjs2Local(dict);
    window.GlobalUtil.model.localAppsMgr.remoteMyProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};
const runTaskApp = (path, category) => new Promise((resolve) => {
  const CMD_LIST = {
    python: window.GlobalConstant.APP_RUN_PYTHON,
    teach: window.GlobalConstant.APP_RUN_TEACH,
  }
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      appName: window.GlobalUtil.model.localAppsMgr.curProName,
      projectPath: path,
    }),
  }
  self.sendCmd(CMD_LIST[category], params, (dict) => {
    // GlobalUtil.model.localAppsMgr.remoteProjs2Local(dict);
    if (dict.code === 1111) { // run compeleted
      resolve(1111)
      console.log('app run compeleted')
    }
    else {
      console.log(`app is running, ${dict.code}, ${path}`)
    }
  })
})
self.runTeach = path => runTaskApp(path, 'teach')
self.runPython = path => runTaskApp(path, 'python')
self.getProject = path => new Promise((resolve, reject) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      appName: path,
    }),
  }
  self.sendCmd(window.GlobalConstant.APP_GET_PROJECT, params, (dict) => {
    if (dict.code === 0) {
      resolve(dict.data)
    }
    else {
      reject(dict)
    }
  })
})
self.appControl = (appControl, category, appName, appVersion, callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      category,
      appName,
      appVersion,
      appControl,
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_INSTALL, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

self.appInstall = (category, appName, appVersion, callback) => {
  self.appControl('install', category, appName, appVersion, callback);
};

self.appUninstall = (category, appName, callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      category, // 'default', 'thirdparty', 'myapp'
      appName,
    }),
  };
  self.sendCmd(window.GlobalConstant.APPSTORE_APP_UNINSTALL, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

self.appReinstall = (category, appName, appVersion, callback) => {
  self.appControl('reinstall', category, appName, appVersion, callback);
};

export default self;
