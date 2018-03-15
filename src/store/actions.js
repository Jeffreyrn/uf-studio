
import GlobalUtil from '../core/global_util';
// import SocketCom from '../core/socket_com';
// import Model from '../core/model';
// import CommandsEditorSocket from '../core/commands_editor_socket';
// import CommandsTeachSocket from '../core/commands_teach_socket';
import * as types from './mutation-types';

const socketInfo = {
  // host: '192.168.1.166',
  host: '192.168.1.67',
  port: '18333',
};
export const openWebsocket = ({ commit }) => {
  // let i = 0;
  // const ti = setInterval(() => {
  //   commit('ROBOT_MOVE_JOINT', [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6]);
  //   i += 1;
  //   if (i > 170) {
  //     clearInterval(ti);
  //   }
  // }, 2000);
  GlobalUtil.socketCom.init_socket(socketInfo);
  GlobalUtil.socketCom.init_onopen(() => {
    console.log('onopen onopen onopen');
    GlobalUtil.model.localDeviceStatus.socket_connected = true;
    GlobalUtil.model.localDeviceStatus.xarm_connected = true;
    GlobalUtil.model.robot.info.connected = GlobalUtil.model.localDeviceStatus.xarm_connected;
    window.CommandsEditorSocket.listProjs((dict) => {
      console.log(dict);
    });
    window.CommandsTeachSocket.listProjs((dict) => {
      console.log(dict);
    });
    window.CommandsAppsSocket.listApps((dict) => {
      console.log(dict);
    });
    commit(types.SET_ERROR, false);
  });
  GlobalUtil.socketCom.init_onclose((evt) => {
    GlobalUtil.model.localDeviceStatus.socket_connected = false;
    GlobalUtil.model.localDeviceStatus.xarm_connected = false;
    GlobalUtil.model.robot.info.connected = GlobalUtil.model.localDeviceStatus.xarm_connected;
    console.log('onclose onclose, event:', evt);
  });
  GlobalUtil.socketCom.init_onerror((evt) => {
    GlobalUtil.model.localDeviceStatus.socket_connected = false;
    GlobalUtil.model.localDeviceStatus.xarm_connected = false;
    GlobalUtil.model.robot.info.connected = GlobalUtil.model.localDeviceStatus.xarm_connected;
    // const temp_msg = JSON.parse(evt.data);
    commit(types.SET_ERROR, true);
    console.log(`onerror onerror onerror = ${evt.data}`);
  });
  GlobalUtil.socketCom.init_onmessage((evt) => {
    const temp_msg = JSON.parse(evt.data);
    GlobalUtil.model.localDeviceInfo.onmessage(evt);
    GlobalUtil.model.localDeviceStatus.onmessage(evt);
    GlobalUtil.model.localParamsSetting.onmessage(evt);
    GlobalUtil.socketCom.onmessage(evt);
    // Model.robot.onmessage(evt);
    if (temp_msg.type === 'report') {
      if (temp_msg.cmd === 'devices_status_report') {
        commit(types.SET_ROBOT_STATUS, temp_msg.data);
      }
      else if (temp_msg.cmd === 'devices_info_report') {
        commit(types.GET_ROBOT_INFO, temp_msg.data);
        commit(types.SET_ERROR, false);
      }
    }
    else if (temp_msg.type === 'response') {
      GlobalUtil.socketCom.response = evt.data;
      commit(types.SET_ERROR, temp_msg.code);
    }
    else if (temp_msg.type === 'broadcast') {
      commit(types.ROBOT_BROADCAST, temp_msg.data);
    }
  });
};

export const xx = ({
  commit,
}) => {
  console.log(commit);
};
