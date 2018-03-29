
const path = require('path')
const merge = require('webpack-merge')

const CommandsPaintSocket = {};
const self = CommandsPaintSocket;
window.CommandsPaintSocket = CommandsPaintSocket;

//
self.ROOT_DIR = '/paint';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

// self.userId = GlobalConstant.userId;

self.listProjs = (callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: self.ROOT_DIR, // 要获取的目录
      type: 'detail', // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_LIST_DIR, params, (dict) => {
    // console.log(`list paint projs = ${JSON.stringify(dict)}`);
    self.model.localPaintMgr.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.createProj = (name) => {
  name = path.join(name, 'app.json');
  const filePath = path.join(self.ROOT_DIR, name);
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      name: '', // 文件夹名称, 可省略
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_CREATE_FILE, params, () => {
    self.listProjs(() => {
    });
  });
};

self.renameProj = (originName, name, callback) => {
  // const originName = self.model.localTeach.curProj.name;
  // const newProjUUID = path.join(self.ROOT_DIR, name);
  // const newname = name;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      root: self.ROOT_DIR, // 文件的父目录，必须
      old_name: originName, // 原文件（夹）名称
      new_name: name, // 新文件（夹）名称
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_CHANGE_NAME, params, () => {
    self.listProjs(() => {
      if (callback) {
        callback();
      }
    });
  });
};

self.delProj = (proId, callback) => {
  const filePath = proId; // path.join(self.ROOT_DIR, name);
  console.log(`filePath = ${filePath}`);
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_DELETE_DIR, params, () => {
    // window.GlobalUtil.model.localTeach.setCurSelectedTreeItem('');
    self.listProjs(callback);
  });
};

self.saveOrUpdateFile = (uuid, text, callback) => {
  const filePath = uuid;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
      data: text, // 文件内容
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_SAVE_FILE, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

self.getFile = (uuid, callback) => {
  const filePath = uuid;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_GET_FILE, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

export default self;
