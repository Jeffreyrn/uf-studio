
const path = require('path')

const CommandsTeachSocket = {};
const self = CommandsTeachSocket;
window.CommandsTeachSocket = CommandsTeachSocket;

// teach file cmd
self.TEACH_ID_LIST_DIR = 'list_dir';
self.TEACH_ID_CREATE_DIR = 'create_dir';
self.TEACH_ID_CREATE_FILE = 'create_file';
self.TEACH_ID_DELETE_DIR = 'delete_dir';
self.TEACH_ID_DELETE_FILE = 'delete_file';
self.TEACH_ID_CHANGE_NAME = 'change_name';
self.TEACH_ID_GET_FILE = 'get_file';

self.DEBUG_SET_BEART = 'debug_set_beart';

//
self.ROOT_DIR = '/teach';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

self.userId = "test";

self.listProjs = (callback) => {
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": self.ROOT_DIR, // 要获取的目录
      "type": "detail", // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    }
  };
  self.sendCmd(self.TEACH_ID_LIST_DIR, params, (dict) => {
    self.model.localTeach.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.createProj = (name) => {
  let filePath = path.join(self.ROOT_DIR, name);
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": filePath, // 文件夹的父目录，必须
      "name": '', // 文件夹名称, 可省略
    }
  };
  self.sendCmd(self.TEACH_ID_CREATE_DIR, params, (dict) => {
    self.listProjs(() => {

    });
  });
};

self.createFile = (name, callback) => {
  let curProj = self.model.localTeach.curProj;
  if (curProj === null || curProj === undefined || curProj === {}) {
    return;
  }
  const filePath = path.join(curProj.uuid, `${name}.json`);
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": filePath, // 文件夹的父目录，必须
      "file": '', // 文件夹名称, 可省略
      "data": '', // 文件内容
    }
  };
  self.sendCmd(self.TEACH_ID_CREATE_FILE, params, (dict) => {
    self.listProjs(callback);
  });
};


self.delFiles = (uuid, callback) => {
  // return;
  const filePath = uuid;
  console.log(`filePath = ${filePath}`);
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": filePath, // 文件夹的父目录，必须
      "file": '', // 文件夹名称, 可省略
    }
  };
  self.sendCmd(self.TEACH_ID_DELETE_FILE, params, (dict) => {
    self.listProjs(callback);
  });
};

export default self;
