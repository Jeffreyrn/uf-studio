
const path = require('path')
const merge = require('webpack-merge')

const CommandsTeachSocket = {};
const self = CommandsTeachSocket;
window.CommandsTeachSocket = CommandsTeachSocket;

// teach file cmd
// self.TEACH_ID_LIST_DIR = 'list_dir';
// self.TEACH_ID_CREATE_DIR = 'create_dir';
// self.TEACH_ID_CREATE_FILE = 'create_file';
// self.TEACH_ID_DELETE_DIR = 'delete_dir';
// self.TEACH_ID_DELETE_FILE = 'delete_file';
// self.TEACH_ID_CHANGE_NAME = 'change_name';
// self.TEACH_ID_GET_FILE = 'get_file';

// self.DEBUG_SET_BEART = 'debug_set_beart';
self.VERSION = GlobalConstant.VERSION;

//
self.ROOT_DIR = '/teach';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

self.userId = "test";

self.listProjs = (callback) => {
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: self.ROOT_DIR, // 要获取的目录
      type: "detail", // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_LIST_DIR, params, (dict) => {
    self.model.localTeach.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.createProj = (name) => {
  let filePath = path.join(self.ROOT_DIR, name);
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      name: '', // 文件夹名称, 可省略
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_CREATE_DIR, params, (dict) => {
    self.listProjs(() => {

    });
  });
};

self.delProj = (proId, callback) => {
  let filePath = proId; //path.join(self.ROOT_DIR, name);
  console.log(`filePath = ${filePath}`);
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_DELETE_DIR, params, (dict) => {
    self.listProjs(callback);
  });
};

self.createFile = (name, callback1, callback2) => {
  let curProj = self.model.localTeach.curProj;
  if (curProj === null || curProj === undefined || curProj === {}) {
    return;
  }
  const filePath = path.join(curProj.uuid, `${name}.json`);
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
      data: '', // 文件内容
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_CREATE_FILE, params, (dict) => {
    dict.uuid = filePath;
    // console.log(`TEACH_ID_CREATE_FILE dict = ${JSON.stringify(dict)}`);
    if (callback1) {
      callback1(dict);
    }
    self.listProjs(callback2);
  });
};

self.delFiles = (uuid, callback) => {
  // return;
  const filePath = uuid;
  console.log(`filePath = ${filePath}`);
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_DELETE_FILE, params, (dict) => {
    self.listProjs(callback);
  });
};

self.saveOrUpdateFile = (uuid, isContinus, callback) => {
  // text = 'test test';
  let filePath = uuid; // self.model.localProjTree.getThisFileFullPath(uuid);
  // return;
  const textDict = {
    type: isContinus === true ? 'continus' : 'discontinuous',
    points: self.model.localTeach.fileDatas[uuid],
  };
  const text = JSON.stringify(textDict);
  //JSON.stringify(self.model.localTeach.fileDatas[uuid]);
  // console.log(`saveOrUpdateFile filePath = ${filePath}, text = ${text}`);
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: uuid, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
      data: text, // 文件内容
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_SAVE_FILE, params, (dict) => {
    // self.listProjs(callback);
    if (callback) {
      callback(dict);
    }
  });
};

self.getFile = (uuid, callback) => {
  let filePath = uuid;
  // console.log(`getFile filePath = ${filePath}`);
  // return;
  const params = {
    data: merge(self.VERSION, {
      userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    })
  };
  self.sendCmd(GlobalConstant.FILE_ID_GET_FILE, params, (dict) => {
    // console.log(`get file = ${JSON.stringify(dict)}`);
    if (callback) {
      callback(dict);
    }
  });
};

self.debugSetBeart = (isOpen, sleepTime, callback) => {
  const params = {
    data: merge(self.VERSION, {
      isOpen: isOpen,
      sleepTime: sleepTime,
    })
  };
  self.sendCmd(GlobalConstant.DEBUG_SET_BEART, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

export default self;
