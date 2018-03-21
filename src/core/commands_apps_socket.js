
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
