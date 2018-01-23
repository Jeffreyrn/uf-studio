import SocketCom from '../core/socket_com';
import Model from '../core/model';
import CommandsEditorSocket from '../core/commands_editor_socket';
import CommandsTeachSocket from '../core/commands_teach_socket';
import * as types from './mutation-types';

const socketInfo = {
  // host: '192.168.1.166',
  host: '192.168.1.67',
  port: '18333',
};
export const openWebsocket = ({ commit }) => {
  SocketCom.init_socket(socketInfo);
  SocketCom.init_onopen(() => {
    console.log('onopen onopen onopen');
    Model.localDeviceStatus.socket_connected = true;
    Model.localDeviceStatus.xarm_connected = true;
    Model.robot.info.connected = Model.localDeviceStatus.xarm_connected;
    CommandsEditorSocket.listProjs((dict) => {
      console.log(dict);
    });
    CommandsTeachSocket.listProjs((dict) => {
      console.log(dict);
    });
  });
  SocketCom.init_onclose((evt) => {
    Model.localDeviceStatus.socket_connected = false;
    Model.localDeviceStatus.xarm_connected = false;
    Model.robot.info.connected = Model.localDeviceStatus.xarm_connected;
    console.log('onclose onclose, event:', evt);
  });
  SocketCom.init_onerror((evt) => {
    Model.localDeviceStatus.socket_connected = false;
    Model.localDeviceStatus.xarm_connected = false;
    Model.robot.info.connected = Model.localDeviceStatus.xarm_connected;
    // const temp_msg = JSON.parse(evt.data);
    console.log(`onerror onerror onerror = ${evt.data}`);
  });
  SocketCom.init_onmessage((evt) => {
    const temp_msg = JSON.parse(evt.data);
    Model.localDeviceInfo.onmessage(evt);
    Model.localDeviceStatus.onmessage(evt);
    Model.localParamsSetting.onmessage(evt);
    SocketCom.onmessage(evt);
    // Model.robot.onmessage(evt);
    if (temp_msg.type === 'report') {
      if (temp_msg.cmd === 'devices_status_report') {
        commit(types.GET_ROBOT_STATUS, temp_msg.data);
      }
      else if (temp_msg.cmd === 'devices_info_report') {
        commit(types.GET_ROBOT_INFO, temp_msg.data);
      }
    }
    else if (temp_msg.type === 'response') {
      SocketCom.response = evt.data;
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
