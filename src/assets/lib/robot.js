// import Websocket from '../lib-external/reconnecting-websocket';
//
// const robot = {
//   running: true,
//   info: {
//     connected: false,
//     port: null,
//     serialNumber: null,
//     robotVersion: null,
//     coreVersion: null,
//     position: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     socket: null,
//     error: null,
//     speed: 50,
//   },
//   message: {
//     buffer: {},
//     id: 0,
//   },
//   connect: () => {
//     const ip = '192.168.1.166'; // 67 196 166
//     const url = `ws:${ip}:18333/ws`;
//     robot.info.socket = new Websocket(url, null, {
//       debug: true,
//       logger: console,
//       reconnectInterval: 1000,
//     });
//     robot.info.socket.onclose = () => {
//       robot.info.connected = false;
//     };
//     robot.info.socket.onopen = () => {
//       robot.info.connected = true;
//     };
//     robot.info.socket.onmessage = (evt) => {
//       const temp_msg = JSON.parse(evt.data);
//       const data = temp_msg.data;
//       console.log('onmessage', temp_msg);
//       if (temp_msg.type === 'broadcast') {
//         if (robot.broadcast_message_process[temp_msg.cmd]) {
//           robot.broadcast_message_process[temp_msg.cmd](temp_msg.data);
//         }
//       }
//       else if (temp_msg.type === 'report') {
//         if (temp_msg.cmd === 'devices_info_report') {
//           console.log('device info broadcast:', data);
//           robot.info.port = data.xarm_port_name;
//           robot.info.serialNumber = data.xarm_port_serial_number;
//           robot.info.robotVersion = data.xarm_version;
//           robot.info.coreVersion = data.core_version;
//         }
//         else if (temp_msg.cmd === 'devices_status_report') {
//           console.log('device status broadcast:', data);
//           if (data.xarm_error_code > 2) {
//             const errorList = {
//               1: 'UX2_ERR_CODE',
//               2: 'UX2_WAR_CODE',
//               3: 'UX2_ERR_TOUT',
//               4: 'UX2_ERR_LENG',
//               5: 'UX2_ERR_OTHER',
//               1000: 'Exception',
//             };
//             if (errorList[data.xarm_error_code] !== undefined) {
//               robot.info.error = errorList[data.xarm_error_code];
//             }
//             else {
//               robot.info.error = 'unknow error';
//             }
//           }
//           else {
//             robot.info.connected = true;
//           }
//         }
//       }
//       else {
//         const id = temp_msg.id;
//         robot.message.buffer[id] = temp_msg;
//       }
//     };
//   },
//   printer: {
//     progress: 0,
//   },
//   sendMessageSync: (data) => {
//     if (robot.message.id > 10000) {
//       robot.message.id = 0;
//     }
//     robot.message.id += 1;
//     data.id = `${robot.message.id}`;
//     // robot.info.socket.send(JSON.stringify(data));
//     GlobalUtil.socketCom.socket_info.socket.send(JSON.stringify(data));
//     return robot.message.id;
//   },
//   setSpeed: (value) => {
//     robot.info.speed = (value < 0) ? 20 : value;
//   },
//   setPosition: (args) => {
//     args = args || {};
//     args.relative = args.relative !== undefined ? args.relative : false; // default is false
//     args.wait = args.wait !== undefined ? args.wait : true; // default is true
//     args.mode = args.mode || 0; // default is 0
//     const msg = {
//       cmd: 'xarm_move_line',
//       data: {
//         relative: args.relative,
//       },
//     };
//     if (args.speed !== undefined) {
//       msg.data.F = Number(args.speed);
//       robot.info.speed = Number(args.speed);
//     }
//     else {
//       msg.data.F = robot.info.speed;
//     }
//     if (args.x !== undefined) {
//       msg.data.X = Number(args.x);
//       robot.info.position.x = Number(args.x);
//     }
//     if (args.y !== undefined) {
//       msg.data.Y = Number(args.y);
//       robot.info.position.y = Number(args.y);
//     }
//     if (args.z !== undefined) {
//       msg.data.Z = Number(args.z);
//       robot.info.position.z = Number(args.z);
//     }
//     if (args.acceleration !== undefined) {
//       msg.data.Q = Number(args.acceleration);
//     }
//     if (args.roll !== undefined) {
//       msg.data.A = args.roll;
//     }
//     if (args.pitch !== undefined) {
//       msg.data.B = args.pitch;
//     }
//     if (args.yaw !== undefined) {
//       msg.data.C = args.yaw;
//     }
//     console.log('set position:', msg);
//     return new Promise((resolve, reject) => {
//       robot.sendMessageSync(msg, () => {
//         if (robot.info.connected) {
//           resolve();
//         }
//         else if (reject()) reject();
//       });
//     });
//   },
//   broadcast_message_process: {
//     greeting: (data) => {
//       robot.info.version = data.core_version;
//     },
//     xarm_printing_progress: (data) => {
//       robot.printer.progress = data.progress;
//     },
//   },
// };
//
// export default robot;
