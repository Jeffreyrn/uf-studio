import Blockly from 'node-blockly/browser';
const CodeGenerator = {};

CodeGenerator.wait_until = (params) => `await BlocklyLib.waitUntil(()=> ${params.condition}, 0.1);\n`;

CodeGenerator.position = (params) => {
  const position = { x: params.x, y: params.y, z: params.z };
  const orientation = {
    roll: params.a,
    yaw: params.b,
    pitch: params.c
  }
  return [JSON.stringify({position, orientation})];
};
CodeGenerator.position7 = (params) => {
  const positions = { i: params.i, j: params.j, k: params.k, l: params.l, m: params.m, n: params.n, o: params.o };
  return [JSON.stringify(positions)];
};
CodeGenerator.ON = params => [JSON.stringify(params.checkboxON)];

// CodeGenerator.servo_angle = params => [JSON.stringify(params.angle)];

CodeGenerator.move_to = (params) => {
  console.log(params.position, 'sssss')
  params.position = params.position === '' ? '{"position":{"x":"172","y":"0","z":"36"},"orientation":{"roll":"-180","yaw":"0","pitch":"0"}}' : params.position;
  // const data = JSON.parse(params)
  // const args = `{"x": ${position.x}, "y": ${position.y}, "z": ${position.z}}`;
  return `await window.xArmVuex.commit('MOVE_END', ${params.position});\n`;
};
CodeGenerator.move_7 = (params) => {
  const defaltStr = '{ "i": 150, "j": 0, "k": 150, "l": 150, "m": 0, "n": 150, "o": 150 }';
  params.position = params.position === '' ? defaltStr : params.position;
  const position = JSON.parse(params.position);
  // const args = `{"i": ${position.i}, "j": ${position.j}, "k": ${position.k}, 
  // "l": ${position.l}, "m": ${position.m}, "n": ${position.n}, "o": ${position.o}}`;
  const args = `[${position.i}, ${position.j}, ${position.k}, 
  ${position.l}, ${position.m}, ${position.n}, ${position.o}]`;
  
  return `await window.xArmVuex.commit('ROBOT_MOVE_JOINT', ${args});\n`;
  // return `await UArm.set_joint(${args});\n`;
};
CodeGenerator.move = (params) => {
  const value = params.value;
  const orientation = params.orientation;
  let args = null;
  switch (orientation) {
    default:
      break;
    case 'forward':
      args = `{"x": ${value}, "relative": true}`;
      break;
    case 'backward':
      args = `{"x": ${value} * -1, "relative": true}`;
      break;
    case 'up':
      args = `{"z": ${value}, "relative": true}`;
      break;
    case 'down':
      args = `{"z": ${value} * -1, "relative": true}`;
      break;
    case 'left':
      args = `{"y": ${value}, "relative": true}`;
      break;
    case 'right':
      args = `{"y": ${value} * -1, "relative": true}`;
      break;
  }
  return `await window.xArmVuex.commit('MOVE_END_STEP', ${args});\n`;
};

// CodeGenerator.stretch = (params) => {
//   const value = params.value;
//   const orientation = params.orientation;
//   let args;
//   switch (orientation) {
//     default:
//       break;
//     case 'forward':
//       args = `{"stretch": ${value}, "relative": true, "wait": true}`;
//       break;
//     case 'backward':
//       args = `{"stretch": 0 - ${value}, "relative": true, "wait": true}`;
//       break;
//   }
//   return `await UArm.set_polar(${args});\n`;
// };

CodeGenerator.set_pump = (params) => {
  const value = params.value;
  const args = `{"ON": ${value}, "wait": true}`;
  return `await UArm.set_pump(${args});\n`;
};

CodeGenerator.set_gripper = (params) => {
  const value = params.value;
  const args = `{"ON": ${value}, "wait": true}`;
  // console.log(`set_gripper debug: ${typeof value}`);
  const wait = value === 'true' ? 'await BlocklyLib.wait(2);\n' : '';
  return `await UArm.set_gripper(${args});\n${wait}`;
};

CodeGenerator.wrist_turn = (params) => {
  const value = params.value;
  // const orientation = params.orientation;
  // return `await UArm.wrist_turn({"orientation": "${orientation}", "angle": ${value}, "wait": true});\n`;
  return `await UArm.wrist_turn({"angle": ${value}, "wait": true});\n await BlocklyLib.wait(0.1);\n`;
};

CodeGenerator.base_turn = (params) => {
  const value = params.value;
  // const orientation = params.orientation;
  return `await UArm.base_turn({"angle": ${value}, "wait": true});\n await BlocklyLib.wait(0.1);\n`;
};

CodeGenerator.wait = (params) => {
  const value = params.value;
  return `await BlocklyLib.wait(${value});\n`;
};

CodeGenerator.set_buzzer = (params) => {
  const frequency = params.frequency;
  const duration = params.duration;
  const args = `{"frequency": ${frequency}, "duration": ${duration}, "wait": true}`;
  return `await UArm.set_buzzer(${args});\n`;
};

CodeGenerator.buzzer_notes = (params) => {
  const note = params.note;
  return [Number(note)];
};

CodeGenerator.buzzer_beats = (params) => {
  const beat = params.beat;
  return [Number(beat)];
};

CodeGenerator.set_speed = (params) => {
  const speed = params.speed;
  const data = JSON.stringify({
    index: 'speed',
    value: speed,
  })
  return `window.xArmVuex.commit('SET_ROBOT_STATE',${data});\n`;
};

CodeGenerator.set_acceleration = (params) => {
  const acceleration = params.acceleration;
  const data = JSON.stringify({
    index: 'acceleration',
    value: acceleration,
  })
  return `window.xArmVuex.commit('SET_ROBOT_STATE',${data});\n`;
};

CodeGenerator.reset = () => `await window.xArmVuex.commit('GO_HOME'));\n`;

/** ****************************** Loop **************************************************************/
// CodeGenerator.loop_repeat_times = (params) => {
//   const statement = params.statement;
//   const times = params.times;
//   return `await BlocklyLib.repeatTimes(${times}, async() => {\n${statement}});\n`;
// };

// CodeGenerator.loop_repeat_while = (params) => {
//   const statement = params.statement;
//   const condition = params.condition;
//   const type = params.type;
//   if (type === 'while') {
//     return `await BlocklyLib.repeatWhile(() => ${condition}, async() => {\n${statement}});\n`;
//   }
//   return `await BlocklyLib.repeatUntil(() => ${condition}, async() => {\n${statement}});\n`;
// };

CodeGenerator.loop_run_forever = (params) => {
  const statement = params.statement;
  return `await BlocklyLib.runForever(async() => {\n${statement}});\n`;
};

CodeGenerator.loop_break = () => 'break;';

/** ****************************** Condition **************************************************************/

CodeGenerator.condition_tip_sensor = () => ['UArm.TipSensor.getValue()'];

CodeGenerator.condition_face_detection = () => ['UArm.FaceDetection.getValue()'];

CodeGenerator.condition_key_pressed = (params) => {
  const keycode = params.keycode;
  return [`BlocklyLib.KeyPressEvent.getValue(${keycode})`];
};

CodeGenerator.condition_current_position = (params) => [`UArm.Position.getValue('${params.axis}')`];

CodeGenerator.condition_button_pressed = (params) => {
  const button_id = params.button_id;
  return [`UArm.Button.getValue('${button_id}')`];
};
/** ****************************** Studio Only **************************************************************/

CodeGenerator.console = (params) => {
  const msg = params.msg;
  return `console.log(${msg});\n`;
};

CodeGenerator.event_face_detection = (params) => {
  const statement = params.statement;
  const callback = `async function () {
${statement}
}`;
  const args = `{"callback": ${callback}, "faceDetected": true }`;
  return `UArm.FaceDetection.addEventListener(${args});`;
};

CodeGenerator.event_face_detection_stop = () => 'UArm.FaceDetection.clearEventListener();\n';

CodeGenerator.event_keypressed = (params) => {
  const statement = params.statement;
  const keycode = params.keycode;
  return `BlocklyLib.KeyPressEvent.addEventListener(${keycode}, async function(){\n${statement}});\n`;
};

CodeGenerator.event_keypressed_stop = () => 'BlocklyLib.KeyPressEvent.clearEventListener();\n';

CodeGenerator.event_tip_sensor = (params) => {
  const statement = params.statement;
  const args = `{"callback": async function(){\n${statement}}}`;
  return `UArm.TipSensor.addEventListener(${args});\n`;
};

CodeGenerator.event_tip_sensor_stop = () => 'UArm.TipSensor.clearEventListener();\n';

CodeGenerator.studio_play_recording = (params) => {
  const filename = params.filename;
  return `Studio.FileManager.loadProjectSync('TeachMode', '${filename}');\nawait UArm.play.start_playing({"speed": 1});\n`;
};

CodeGenerator.event_button_pressed = (params) => {
  const value = params.value;
  const statement = params.statement;
  const args = `{"buttonId":"${value}", "buttonValue": 1, "callback": async function(){${statement}}}`;
  return `UArm.Button.addEventListener(${args});\n`;
};

/** ****************************** Grove ********************************************************************/

CodeGenerator.get_grove_color = (params) => [`Grove.getValue(${params.pin}, 'hue')`];

// eslint-disable-next-line prefer-template
CodeGenerator.grove_color_hue_range = (params) => {
  const code = `BlocklyLib.isInHueRange(Grove.getValue(${params.pin}, 'hue'), [${params.min}, ${params.max}])`;
  return [code];
};

// CodeGenerator.grove_color_hue_range = (params) => {
//   // const code = `(${params.color} >= ${params.color_range}[0]) && (${params.color} <= ${params.color_range}[1])`;
//   const code = `BlocklyLib.isInHueRange(${params.color}, ${params.color_range})`;
//   return [code];
// };

CodeGenerator.color_hue = (params) => [JSON.stringify(Number(params.hue))];

CodeGenerator.get_grove_gesture = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.grove_gesture_type = (params) => [`Grove.getValue(${params.pin}) === ${params.gesture}`,
  Blockly.JavaScript.ORDER_NONE];

CodeGenerator.get_grove_ultrasonic = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.get_grove_temperature = (params) => [`Grove.getValue(${params.pin}, 'temperature')`];

CodeGenerator.get_grove_humidity = (params) => [`Grove.getValue(${params.pin}, 'humidity')`];

CodeGenerator.get_grove_pir_motion = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.control_grove_fan = (params) => {
  const speed = params.speed;
  const pin = params.pin;
  return `await Grove.control('${pin}', 'V${speed}');\n`;
};

CodeGenerator.stop_grove_fan = (params) => {
  const pin = params.pin;
  return `await Grove.control('${pin}', 'V0');\n`;
};

CodeGenerator.control_grove_electromagnet = (params) =>
  `await Grove.control('${params.pin}', (${params.on}) ? 'V1' : 'V0');`;

CodeGenerator.control_grove_chainable_led_rgb = (params) => {
  const number = params.number;
  const pin = params.pin;
  const rgb = params.value;
  return `await Grove.control(${pin}, [${number - 1}, ${rgb}]);\n`;
};

CodeGenerator.control_grove_chainable_led_hsl = (params) => {
  const number = params.number;
  const pin = params.pin;
  const hsl = params.value;
  // console.log(`${hsl[0]} ${hsl[1]} ${hsl[1]}`);
  // const rgb = JSON.stringify(colorConvert.hsl.rgb(hsl[0], hsl[1], hsl[2]));
  // console.log(`${rgb[0]} ${rgb[1]} ${rgb[1]}`);
  return `await Grove.control(${pin}, [${number - 1}, ${hsl}], {type: 'HSL'});\n`;
};

CodeGenerator.rgb_array = (params) => [`[${params.r}, ${params.g}, ${params.b}]`, Blockly.JavaScript.ORDER_ATOMIC];

CodeGenerator.hsl_array = (params) => [`[${params.h}, ${params.s}, ${params.l}]`, Blockly.JavaScript.ORDER_ATOMIC];

CodeGenerator.get_grove_button = (params) => [`Grove.getValue(${params.pin}, '${params.hold}')`];

CodeGenerator.get_grove_slide = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.grove_slided_to = (params) => {
  const target = params.target;
  const condition = target === 'GND' ? '<= 0' : '>= 1023';
  return [`Grove.getValue(${params.pin}) ${condition}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

CodeGenerator.control_grove_slide_led = (params) => `await Grove.control('${params.pin}', '${params.turn}');`;

CodeGenerator.get_grove_rotary = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.grove_rotary_to = (params) => {
  const target = params.target;
  const condition = target === 'MIN' ? '<= 0' : '>= 1023';
  return [`Grove.getValue(${params.pin}) ${condition}`, Blockly.JavaScript.ORDER_RELATIONAL];
};

CodeGenerator.get_grove_light = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.get_grove_air = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.get_grove_sound = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.get_grove_emg = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.get_grove_accelerometer = (params) => [`Grove.getValue(${params.pin}, '${params.axis}')`];

CodeGenerator.get_grove_compass = (params) => [`Grove.getValue(${params.pin}, 'T')`];

CodeGenerator.get_grove_line_finder = (params) => [`Grove.getValue(${params.pin})`];

CodeGenerator.control_grove_vibration = (params) =>
`await Grove.control('${params.pin}', (${params.on}) ? 'V1' : 'V0');`;

CodeGenerator.control_grove_oled = (params) => `await Grove.control('${params.pin}', 'V0 S' + ${params.pixels});`;

CodeGenerator.pixels = (params) => [`'${params.data}'`, Blockly.JavaScript.ORDER_ATOMIC];

CodeGenerator.control_grove_lcd_display = (params) =>
`await Grove.control(${params.pin}, 'V${Number(params.line)} S' + ${params.text});`;

CodeGenerator.ascii_text = (params) => [`'${params.text}'`, Blockly.JavaScript.ORDER_ATOMIC];

CodeGenerator.control_grove_lcd_display_clear = (params) =>
`await Grove.control(${params.pin}, 'T2');`;

CodeGenerator.control_grove_oled_clear = (params) => `await Grove.control('${params.pin}', '');`;

/** ****************************** Leap ********************************************************************/
CodeGenerator.event_leap_gesture = (params) => {
  // const gesture = params.gesture;
  const statement = params.statement;
  return `
    var controller = new BlocklyLib.Leap.Controller({enableGestures:true});
    controller.connect();
    
    controller.on('gesture', onGesture);
    async function onGesture(gesture,frame)
    {
        ${statement}
    }
  `;
};

CodeGenerator.event_button_pressed_stop = () => 'UArm.Button.clearEventListener();\n';
CodeGenerator.studio_run_python = (name) => `await window.CommandsAppsSocket.runPython(${name.ide});\n`;
CodeGenerator.studio_play_recording = (name) => `await window.CommandsAppsSocket.runTeach(${name.record});\n`;
CodeGenerator.studio_run_app = (name) => `console.log('TODO');\n`;
/* Code generator*/
const genFuncCode = (params, block) => CodeGenerator[block.type](params);

export default genFuncCode;
