
const CommandsSocket = {};
const self = CommandsSocket;

self.CMD_ID_GET_POINT_POSE = 'xarm_get_joint_pose';
self.CMD_ID_GET_TCP_POSE = 'xarm_get_tcp_pose';
self.CMD_ID_GET_VERSION = 'xarm_get_version';
self.CMD_ID_GET_STATE = 'xarm_get_state';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

// xarm_get_joint_pose() {
//   const self = this;
//   const startTime = new Date().getTime();
//   GlobalUtil.socketCom.send_msg({
//     cmd: 'xarm_get_joint_pose',
//     data: '',
//   }, (dict) => {
//     console.log(`send response = ${JSON.stringify(dict)}`);
//     const endTime2 = new Date().getTime();
//     const diff = endTime2 - startTime;
//     self.diff = `time diff = ${diff} ms`;
//   });
// },

export default self;
