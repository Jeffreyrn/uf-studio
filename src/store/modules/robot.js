import * as types from '../mutation-types';
// import SocketCom from '../../core/socket_com';
const state = {
  running: true,
  info: {
    connected: false,
    port: null,
    serialNumber: null,
    robotVersion: null,
    coreVersion: null,
    baudrate: null,
    position: {
      x: null,
      y: null,
      z: null,
    },
    orientation: {
      roll: null,
      yaw: null,
      pitch: null,
    },
    axis: [],
    test: null,
    socket: null,
    speed: 50,
    acceleration: 50,
    online: false,
  },
  status: {
    warning: null,
    connected: null,
    printed: null,
    paused: null,
    error: null,
  },
  message: {
    buffer: {},
    id: 0,
  },
  printer: {
    progress: 0,
  },
};
const actions = {
  setSpeed: ({ state }, value) => {
    state.info.speed = (value < 0) ? 50 : value;
  },
  setAcceleration: ({ state }, value) => {
    state.info.acceleration = (value < 0) ? 50 : value;
  },
};
const mutations = {
  test(state, data) {
    state.info.test = data;
  },
  [types.GET_ROBOT_STATUS](state, data) {
    const end = data.xarm_tcp_pose;
    const joint = data.xarm_joint_pose;
    const error = data.xarm_error_code;
    if (end && (end.length > 0)) {
      console.log('table posi print:');
      console.table(end);
      state.info.position.x = Number(end[0]);
      state.info.position.y = Number(end[1]);
      state.info.position.z = Number(end[2]);
      state.info.orientation.roll = Number(end[3]);
      state.info.orientation.yaw = Number(end[4]);
      state.info.orientation.pitch = Number(end[5]);
    }
    if (joint && (joint.length > 0)) {
      // console.table(joint);
      state.info.axis = joint.map(num => Number(num).toFixed(2)).slice(); // .slice()
      state.info.test = joint[1];
    }
    state.status.warning = data.xarm_warn_code;
    if (error && (error > 0)) {
      const ERROR_LIST = {
        1: 'UX2_ERR_CODE',
        2: 'UX2_WAR_CODE',
        3: 'UX2_ERR_TOUT',
        4: 'UX2_ERR_LENG',
        5: 'UX2_ERR_OTHER',
        1000: 'Exception',
      };
      if (ERROR_LIST[error] !== undefined) {
        state.status.error = ERROR_LIST[error];
      }
      else {
        state.status.error = 'unknow error';
      }
    }
    else {
      state.status.connected = data.xarm_connected;
      state.status.printed = data.xarm_printed;
      state.status.paused = data.xarm_paused;
    }
  },
  [types.GET_ROBOT_INFO](state, data) {
    console.log('device info broadcast:', data);
    state.info.port = data.xarm_port_name;
    state.info.serialNumber = data.xarm_port_serial_number;
    state.info.robotVersion = data.xarm_version;
    state.info.coreVersion = data.core_version;
    state.info.baudrate = data.xarm_port_baudrate;
  },
  [types.ROBOT_BROADCAST](state, data) {
    state.printer.progress = data.progress;
  },
  [types.ROBOT_MOVE_LINE](state, data) {
    // console.log('set position:', data);
    if (state.info.online) {
      window.GlobalUtil.socketCom.sendCmd(
        'xarm_move_joint',
        {
          data: {
            X: data.value,
            Y: data.value,
            Z: data.value,
            A: data.value,
            B: data.value,
            C: data.value,
            F: state.info.speed,
            Q: state.info.acceleration,
          },
        },
        (response) => { console.log('socket res', response); },
      );
    }
    else { // offline mode
      if (data.position !== undefined) {
        Object.assign(state.info.position, data.position.map(num => num.toFixed(2)));
      }
      if (data.orientation !== undefined) {
        Object.assign(state.info.orientation, data.orientation);
      }
    }
  },
  // [types.ROBOT_MOVE_JOINT](state, data) {
  //   state.info.axis = data.slice();
  //   console.log('set joint:', data);
  //   if (state.info.online) {
  //     window.GlobalUtil.socketCom.socket_info.socket.send();
  //   }
  // },
  [types.SET_ROBOT_STATE](state, data) {
    state.info[data.index] = data.value;
  },

  // self.CMD_ID_MOVE_LINE = 'xarm_move_line';
  // self.CMD_ID_MOVE_JOINT = 'xarm_move_joint';
  [types.MOVE_ONE_JOINT](state, data) {
    // console.log('set one joint:', data);
    if (state.info.online) {
      const JOINT_LIST = ['I', 'J', 'K', 'L', 'M', 'N', 'O'];
      window.GlobalUtil.socketCom.sendCmd(
        'xarm_move_joint',
        {
          data: {
            [JOINT_LIST[data.index]]: data.value,
            F: state.info.speed,
            Q: state.info.acceleration,
          },
        },
        (response) => { console.log('socket res', response); },
      );
    }
    else { // offline mode
      state.info.axis[data.index] = Number(data.value);
    }
  },
};

export default { state, actions, mutations };
