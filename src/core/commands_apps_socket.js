
const path = require('path')
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
    data: merge(GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      // root: self.ROOT_DIR, // 要获取的目录
      // type: "detail", // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    })
  };
  self.sendCmd(GlobalConstant.APPSTORE_GET_APPS, params, (dict) => {
    GlobalUtil.model.localAppsMgr.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.appControl = (appControl, category, appName, appVersion, callback) => {
  const params = {
    data: merge(GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      category: category, // 'default', 'thirdparty', 'myapp'
      appName: appName,
      appVersion: appVersion,
      appControl: appControl,
    })
  };
  self.sendCmd(GlobalConstant.APPSTORE_APP_INSTALL, params, (dict) => {
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
    data: merge(GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      category: category, // 'default', 'thirdparty', 'myapp'
      appName: appName,
    })
  };
  self.sendCmd(GlobalConstant.APPSTORE_APP_UNINSTALL, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

export default self;
