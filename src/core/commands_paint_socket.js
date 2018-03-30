
const path = require('path')
const merge = require('webpack-merge')

const CommandsPaintSocket = {};
const self = CommandsPaintSocket;
window.CommandsPaintSocket = CommandsPaintSocket;

//
self.ROOT_DIR = '/paint';

self.sendCmd = (cmdId, data, callback) => {
  self.socketCom.sendCmd(cmdId, data, callback);
};

// self.userId = GlobalConstant.userId;

self.listProjs = (callback) => {
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: self.ROOT_DIR, // 要获取的目录
      type: 'detail', // simple: 仅获取当前目录，不包括子目录 detail:包括子目录
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_LIST_DIR, params, (dict) => {
    // console.log(`list paint projs = ${JSON.stringify(dict)}`);
    self.model.localPaintMgr.remoteProjs2Local(dict);
    if (callback) {
      callback(dict);
    }
  });
};

self.createProj = (name, proType, callback) => {
  const basename = proType === 'outline' ? 'outline.json' : 'gray.json';
  name = path.join(name, basename);
  const filePath = path.join(self.ROOT_DIR, name);
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: filePath,
      name: '',
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_CREATE_FILE, params, () => {
    self.listProjs((dict) => {
      if (callback) {
        callback(dict)
      }
    });
  });
};

self.renameProj = (originName, name, callback) => {
  // const originName = self.model.localTeach.curProj.name;
  // const newProjUUID = path.join(self.ROOT_DIR, name);
  // const newname = name;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      root: self.ROOT_DIR, // 文件的父目录，必须
      old_name: originName, // 原文件（夹）名称
      new_name: name, // 新文件（夹）名称
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_CHANGE_NAME, params, () => {
    self.listProjs(() => {
      if (callback) {
        callback();
      }
    });
  });
};

self.delProj = (proId, callback) => {
  const filePath = proId; // path.join(self.ROOT_DIR, name);
  console.log(`filePath = ${filePath}`);
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      // userId: self.userId, // 默认是test，用来区分不同用户
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_DELETE_DIR, params, () => {
    // window.GlobalUtil.model.localTeach.setCurSelectedTreeItem('');
    self.listProjs(callback);
  });
};

self.saveOrUpdateFile = (uuid, text, callback) => {
  const filePath = uuid;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
      data: text, // 文件内容
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_SAVE_FILE, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

self.getFile = (uuid, callback) => {
  const filePath = uuid;
  const params = {
    data: merge(window.GlobalConstant.COMMON_PARAMS, {
      root: filePath, // 文件夹的父目录，必须
      file: '', // 文件夹名称, 可省略
    }),
  };
  self.sendCmd(window.GlobalConstant.FILE_ID_GET_FILE, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
};

// add by Jeffrey --- start
// self.svgToGcode = (data, callback) => {
//   const msg = {
//     cmd: 'svg_to_gcode',
//     data,
//   };
//   UArm.send_and_callback(msg, callback);
// }
self.startPrinting = (data, setting, callback) => {
  setting = setting || {};
  if (setting.canvasMode === undefined) setting.canvasMode = '1';
  if (setting.mode === undefined) setting.mode = '0';
  setting.speed = setting.speed || 100;
  if (setting.zero === undefined) setting.zero = 0;
  // get cmd
  const cmdList = {
    1: window.GlobalConstant.PAINT_GREYSCALE_PRINT, // 黑白
    2: window.GlobalConstant.PAINT_OUTLINE_PRINT, // 轮廓
  };
  const cmd = cmdList[setting.canvasMode];
  // get end type
  // const endType = {
  //   0: 'pen',
  //   1: 'laser',
  // };
  // const end_type = endType[setting.mode];
  let drawing_feedrate;
  if (setting.mode === '0') {
    drawing_feedrate = 500;
  }
  else {
    drawing_feedrate = setting.speed + 50;
  }
  const config = {
    drawing_feedrate,
    zeropoint_height: Number(setting.zero),
    // end_type,
  };
  const params = {
    data,
    config,
  };
  // console.log(msg);
  self.sendCmd(cmd, params, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
  // UArm.printing.state = true;
}
self.stopPrinting = (callback) => {
  // UArm.printing.state = false;
  self.sendCmd(window.GlobalConstant.PAINT_STOP_PRINT, {}, (dict) => {
    if (callback) {
      callback(dict);
    }
  });
}
// add by Jeffrey --- end
export default self;
