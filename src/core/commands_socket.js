
const path = require('path')

const CommandsSocket = {};
const self = CommandsSocket;
window.CommandsSocket = CommandsSocket;
// xArm cmd
self.CMD_ID_GET_POINT_POSE = 'xarm_get_joint_pose';
self.CMD_ID_GET_TCP_POSE = 'xarm_get_tcp_pose';
self.CMD_ID_GET_VERSION = 'xarm_get_version';
self.CMD_ID_GET_STATE = 'xarm_get_state';

// python file cmd
self.FILE_ID_LIST_DIR = 'list_dir';
self.FILE_ID_CREATE_DIR = 'create_dir';
self.FILE_ID_CREATE_FILE = 'create_file';
self.FILE_ID_DELETE_DIR = 'delete_dir';
self.FILE_ID_DELETE_FILE = 'delete_file';
self.FILE_ID_CHANGE_NAME = 'change_name';

//
self.ROOT_DIR = '/python';

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
  self.sendCmd(self.FILE_ID_LIST_DIR, params, (dict) => {
    // console.log(`remoteProjs2Local = ${JSON.stringify(dict)}`);
    self.model.localProjTree.remoteProjs2Local(dict);
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
  self.sendCmd(self.FILE_ID_CREATE_DIR, params, (dict) => {
    self.listProjs();
  });
};

// self.delFiles = ()
self.createFile = (name) => {
  let filePath = self.model.localProjTree.getSelectedFileFolder();
  filePath = path.join(filePath, name);
  // console.log(`createFile file = ${filePath}`);
  const isProjFile = name.indexOf('.') > 0;
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": filePath, // 文件夹的父目录，必须
      "name": '', // 文件夹名称, 可省略
    }
  };
  const proId = self.model.localProjTree.curProj.uuid;
  if (isProjFile === true) {
    self.sendCmd(self.FILE_ID_CREATE_FILE, params, (dict) => {
      self.listProjs();
    });
  }
  else {
    self.sendCmd(self.FILE_ID_CREATE_DIR, params, (dict) => {
      self.listProjs();
    });
  }
};

self.delFiles = (uuid) => {
  self.model.localProjTree.deleteOpenSonTabs(uuid);
  // return;
  const filePath = self.model.localProjTree.getThisFileFullPath(uuid);
  console.log(`filePath = ${filePath}`);
  let params = {
    data: {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": filePath, // 文件夹的父目录，必须
      "file": '', // 文件夹名称, 可省略
    }
  };
  const isProjFile = filePath.indexOf('.') > 0;
  if (isProjFile === true) {
    self.sendCmd(self.FILE_ID_DELETE_FILE, params, (dict) => {
      self.listProjs();
    });
  }
  else {
    self.sendCmd(self.FILE_ID_DELETE_DIR, params, (dict) => {
      self.listProjs();
    });
  }
};

self.renameFile = (uuid, name) => {
  const filePath = self.model.localProjTree.getThisFileFullPath(uuid);
  const fatherDir = path.dirname(filePath);
  const basename = path.basename(filePath);
  const newname = name;
  let params = {
    "data": {
      "userId": self.userId, // 默认是test，用来区分不同用户
      "root": fatherDir, // 文件的父目录，必须
      "old_name": basename, // 原文件（夹）名称
      "new_name": name, // 新文件（夹）名称
    }
  };
  self.sendCmd(self.FILE_ID_CHANGE_NAME, params, (dict) => {
    self.listProjs();
  });
};

// (uuid, superid, self.PROJ_TREE_TYPE.FOLDER, name, '');

self.isFileSuc = (dict) => {
  return (dict.code === 0) && (dict.type = "response");
};

export default self;
