
const path = require('path')
const merge = require('webpack-merge')

const CommandsAppsSocket = {};
const self = CommandsAppsSocket;
window.CommandsAppsSocket = CommandsAppsSocket;

self.VERSION = GlobalConstant.VERSION;

self.userId = GlobalConstant.userId;

//
// self.ROOT_DIR = '/python';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

self.listApps = (callback) => {
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
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

export default self;
