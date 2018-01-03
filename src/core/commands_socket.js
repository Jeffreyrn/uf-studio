
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
    self.model.localProjTree.remoteProjs2Local(dict);
  });
};

// self.delFiles = ()

export default self;
