
import LocalProjTreeDatas from './model_local_proj_tree_datas';
import Base64 from '../lib/Base64';
import { log } from 'util';
import { setTimeout } from 'timers';
const uuidv4 = require('uuid/v4');
const path = require('path')

const LocalProjTree = {};
const self = LocalProjTree;

self.editors = {};
//
self.runningCmdProgramID = '';
self.runningCmdResult = '';
//
self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
}

// self.curSelectedFile = '';
self.projsDialogShow = false;
self.fileDialogShow = false;
self.deleteDialogShow = false;
self.curDialogTitle = '';
self.curDialogIsExtend = false;
self.curDialogInputText = '';
self.folderOrFile = '';
self.fileDialogVisible = false;
self.fileSelected = '';

self.dialogVisible = false;
self.treeBgColor = 'white';
self.curSelectedUUID = '';
self.curSelectedFileUUIDs = {};
self.curSelectedFileUUID = '';
self.curProjList = [];
self.isResultFrameDisplay = false;
self.isEditingPoints = false;
self.inputsText = {};

self.show = () => {
  const e = window.event||arguments.callee.caller.arguments[0];
  console.log(`self show = ${e.keyCode}`);
  if (e.keyCode === 13) {
    self.projsDialogShow = false;
    self.fileDialogShow = false;
    self.deleteDialogShow = false;
  }
}

self.isHasProj = (name) => {
  for (let i = 0; i < self.curProjList.length; i += 1) {
    if (self.curProjList[i].name === name) {
      return true;
    }
  }
  return false;
};

self.isRepeatFile = (uuid) => {
  // console.log(`isRepeatFile count = ${self.curProj.files.length}`);
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    // console.log(`file uuid = ${self.curProj.files[i].uuid}`);
    if (self.curProj.files[i].uuid === uuid) {
      return true;
    }
  }
  return false;
};

self.curProj = {};

self.hasOpenFileInCurPro = false;
self.getCurSelectedFileUUIDs = () => {
  const proId = self.curProj.uuid;
  // model.localProjTree.curSelectedFileUUID[model.localProjTree.curProj.uuid]
  if (self.curSelectedFileUUIDs[proId] === null || self.curSelectedFileUUIDs[proId] === undefined) {
    self.curSelectedFileUUIDs[proId] = '';
  }
  self.curSelectedFileUUID = self.curSelectedFileUUIDs[proId];
  self.curSelectedUUID = self.curSelectedFileUUID;
  const curUUID = self.curSelectedFileUUIDs[proId];
  self.hasOpenFileInCurPro = curUUID !== null && curUUID !== undefined && curUUID !== '';
  // console.log(`self.hasOpenFileInCurPro = ${self.hasOpenFileInCurPro}, curUUID = ${curUUID}`);
  // self.getCurFilePath();

  if (!self.hasOpenFileInCurPro) {
    // self.setSelectedUI('');
    // self.setSelectedEditor('');
  }

  if (self.hasOpenFileInCurPro) {
    // self.setSelectedUI(curUUID);
    // self.setSelectedEditor(curUUID);
    // CommandsEditorSocket.getFile(curUUID, (dict) => {
    //   const editors = GlobalUtil.model.localProjTree.editors;
    //   for (const key in editors) {
    //     if (key === curUUID) {
    //       const editor = editors[key];
    //       if (editor !== null && editor !== undefined) {
            
    //         let content = dict.data;
    //         if (content === null || content === undefined) {
    //           content = '';
    //         }
    //         self.curFile.remoteContent = content;
    //         editor.setValue(content);
    //         self.setSelectedContent(curUUID, content);
    //       }
    //     }
    //   }
    // });
  }

  return self.curSelectedFileUUID;
};
self.uuids2Files = (uuids) => {
  let files = [];
  for (let i = 0; i < uuids.length; i++) {
    const uuid = uuids[i];
    let file = self.getFileInfo(uuid);
    if (file !== null && file !== undefined && file !== '') {
      files.push(file);
    }
  }
  return files;
};
// self.isNull(str) {
//   return str !== null && str !== '' && str !== undefined;
// };
self.setCurSelectedFileUUIDs = (uuid) => {
  const proId = self.curProj.uuid;
  self.curSelectedFileUUID = uuid;
  self.curSelectedFileUUIDs[proId] = uuid;
  self.getCurSelectedFileUUIDs();
};
self.curSelectedFolderUUID = '';
self.curSelectedContents = {};
self.allCodeEditorVue = {};
// self.curSelectedContent = '';
// self.getSelectedContent = (uuid) => {
//   if (curSelectedContents[uuid] === null || curSelectedContents[uuid] === undefined) {
//     curSelectedContents[uuid] = '';
//   }
//   self.curSelectedContent = curSelectedContents[uuid];
//   return curSelectedContents[uuid];
// };
// self.setSelectedContent = (uuid, content) => {
  // self.curSelectedContent = content;
  // if (self.curSelectedContents[uuid] !== null && self.curSelectedContents[uuid] !== undefined) {
    // self.curSelectedContents[uuid] = content;
  // }
  // if (self.allCodeEditorVue[uuid] !== null && self.allCodeEditorVue[uuid] != undefined) {
    // self.allCodeEditorVue[uuid].inputText = content;
  // }
  // console.log(`self.allCodeEditorVue[uuid].inputText = ${self.allCodeEditorVue[uuid]}`);
  // self.allCodeEditorVue[uuid] = content
  // const curFile = self.getFile(uuid);
  // curFile.localContent = content;
  // self.curFile = curFile;
// };

self.curOpenedFilesList = [];
self.curOpenedTabs = {};
self.addOpenTab = (fileId) => {
  const file = self.getFile(fileId);
  if (file === null) {
    return;
  }
  const proId = self.curProj.uuid;
  if (self.curOpenedTabs[proId] === null || self.curOpenedTabs[proId] === '' || self.curOpenedTabs[proId] === undefined) {
    self.curOpenedTabs[proId] = [];
  }
  // console.log(`proId = ${proId}, self.curOpenedTabs = ${JSON.stringify(self.curOpenedTabs[proId])}`);
  const proTabsList = self.curOpenedTabs[proId];
  for (let i = 0; i < proTabsList.length; i += 1) {
    const file = proTabsList[i];
    if (file.uuid === fileId) {
      return;
    }
  }
  proTabsList.push(file);
  self.getCurSelectedFileUUIDs();
  self.curOpenedFilesList = proTabsList;
};

// 关闭当前文件或者文件夹及以下子目录的所以文件的打开的tab
self.deleteOpenSonTabs = (fileId) => {
  let allFileIDs = [fileId];
  allFileIDs = allFileIDs.concat(self.findSonFileIDs(fileId));
  console.log(`deleteOpenSonTabs allFileIDs = ${JSON.stringify(allFileIDs)}`);
  for (let i = 0; i < allFileIDs.length; i++) {
    let fileID = allFileIDs[i];
    self.removeOpenTab(fileID);
  }
};
self.findSonFileIDs = (fileId) => {
  let sonIDs = [];
  for (var i = 0; i < self.curProj.files.length; i++) {
    const sonFile = self.curProj.files[i];
    if (fileId === '') {
      sonIDs.push(sonFile.uuid);
      continue;
    }
    if (fileId === sonFile.superid) {
      sonIDs.push(sonFile.uuid);
      sonIDs = sonIDs.concat(self.findSonFileIDs(sonFile.uuid));
    }
  }
  return sonIDs;
};
self.removeOpenTab = (fileId) => {
  const file = self.getFile(fileId);
  if (file === null) {
    return;
  }
  const proId = self.curProj.uuid;
  let proTabsList = self.curOpenedTabs[proId];
  if (proTabsList === null || proTabsList === '' || proTabsList === undefined) {
    proTabsList = [];
    return;
  }
  let spliceIndex = 0;
  let tempList = [];
  for (let i = 0; i < proTabsList.length; i += 1) {
    const file = proTabsList[i];
    if (file.uuid === fileId) {
      // proTabsList.splice(i,1);
      spliceIndex = i;
    }
    else {
      tempList.push(file);
    }
  }
  proTabsList = tempList;
  self.curOpenedTabs[proId] = proTabsList;
  self.curOpenedFilesList = proTabsList;
  // const alltext = JSON.stringify(GlobalUtil.model.localProjTree.allCodeEditorVue);
  // console.log(`GlobalUtil.model.localProjTree.allCodeEditorVue = ${alltext}`);
  GlobalUtil.model.localProjTree.allCodeEditorVue = GlobalUtil.model.localProjTree.allCodeEditorVue;
  // 选中前一个
  if (fileId === self.getCurSelectedFileUUIDs()) {
    if (proTabsList.length > 0) {
      const index = spliceIndex - 1 >= 0 ? spliceIndex - 1 : 0;
      self.setSelectedUUID(proTabsList[index].uuid);
    }
    else {
      self.setCurSelectedFileUUIDs(null);
    }
  }
  
  if (self.curOpenedFilesList.length === 0) {
    // self.setSelectedUI(null);
    // self.setSelectedEditor('');
  }
};

self.isFile = (uuid) => {
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const file = self.curProj.files[i];
    if (file.uuid === uuid && file.type === self.PROJ_TREE_TYPE.FILE) {
      return true;
    }
  }
  return false;
};

self.setSelectedUUID = (uuid) => {
  self.curSelectedUUID = uuid;
  const proId = self.curProj.uuid;
  if (uuid === '' || uuid === null || uuid === undefined) {
    // self.curSelectedFileUUID = '';
    self.setCurSelectedFileUUIDs(uuid);
    self.curSelectedFolderUUID = '';
    // self.setSelectedUI(uuid);
    return;
  }
  // 
  const file = self.getFileInfo(uuid);
  if (file === null) {
    return;
  }
  if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
    self.curSelectedFolderUUID = uuid;
    return;
  }
  else {
    self.curSelectedFolderUUID = '';
    self.curFile = file;
    self.setCurSelectedFileUUIDs(uuid);
    // CommandsEditorSocket.getFile(file.uuid, (dict) => {
    //   let content = dict.data;
    //   if (content === null || content === undefined) {
    //     content = '';
    //   }
    //   self.curFile.remoteContent = content;
    //   self.setSelectedContent(file.uuid, content);
    // });
    
  }
  // self.setSelectedUI(uuid);
  // self.setSelectedEditor(uuid);
  // ui
  
};

// self.setSelectedUI = (uuid) => {
//   // console.log(`setSelectedUI 2 file uuid = ${uuid}`);
//   // if (uuid === null || uuid === '') {
//   //   setTimeout(() => {
//   //     const nodes = document.getElementsByClassName('el-tree-node__label');
//   //     for (let i = 0; i < nodes.length; i += 1) {
//   //       const node = nodes[i];
//   //       // node.style.color = '#A6A6A6';
//   //     }
//   //   });
//   //   return;
//   // }
//   let file = self.getFileInfo(uuid);
//   if (file.type === 'folder') {
//     file = self.curFile;
//   }
//   // console.log(`setSelectedUI file type uuid = ${uuid}, file = file`);
//   // setTimeout(() => {
//   //   const nodes = document.getElementsByClassName('el-tree-node__label');
//   //   for (let i = 0; i < nodes.length; i += 1) {
//   //     const node = nodes[i];
//   //     if (file === null || file === undefined) {
//   //       // node.style.color = '#A6A6A6';
//   //     }
//   //     else if (file.name === node.innerHTML) {
//   //       // node.style.color = 'blue';
//   //       // node.style.color = '#4F7597';
//   //     }
//   //     else {
//   //       // node.style.color = 'gray';
//   //       // node.style.color = '#A6A6A6';
//   //     }
//   //   }
//   // });

//   // const file = self.getFileInfo(uuid);
//   if (file === null) {
//     return;
//   }
//   if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
//     return;
//   }
//   setTimeout(() => {
//     // const curFile = GlobalUtil.model.localProjTree.curFile;
//     let selectedEditor = null;
//     const editors = document.getElementsByName("code-editor");
//     // console.log(`editor value =  cur ${curFile.uuid}`);
//     // for (let i = 0; i < editors.length; i += 1) {
//     //   const editor = editors[i];
//     //   editor.style.display = 'none';
//     // }
//     for (let i = 0; i < editors.length; i += 1) {
//       const editor = editors[i];
//       // console.log(`editor value = ${editor.getAttribute("value")}`);
//       const aUUID = editor.getAttribute("value");
//       // editor.style.display = 'none';
//       if (aUUID === file.uuid) {
//         editor.style.opacity = '1.0';
//         // editor.style.display = 'block';
//         // selectedEditor = editor;
//       }
//       else {
//         // editor.style.display = 'none';
//         editor.style.opacity = '0.0';
//       }
//     }
//     // if (selectedEditor !== null) {
//     //   selectedEditor.style.display = 'block';
//     // }
//   });
// };

// self.setSelectedEditor = (uuid) => {
  // let selectedEditor = null;
  // const editors = document.getElementsByName("code-editor");
  // // console.log(`editor value =  cur ${curFile.uuid}`);
  // // for (let i = 0; i < editors.length; i += 1) {
  // //   const editor = editors[i];
  // //   editor.style.display = 'none';
  // // }
  // for (let i = 0; i < editors.length; i += 1) {
  //   const editor = editors[i];
  //   // console.log(`editor value = ${editor.getAttribute("value")}`);
  //   const aUUID = editor.getAttribute("value");
  //   // editor.style.display = 'none';
  //   if (aUUID === uuid) {
  //     editor.style.opacity = '1.0';
  //     // editor.style.display = 'block';
  //     // selectedEditor = editor;
  //   }
  //   else {
  //     // editor.style.display = 'none';
  //     editor.style.opacity = '0.0';
  //   }
  // }
// };

self.onwinresize = () => {
  const leftFrame = document.getElementById("left-frame");
  // leftFrame.style.width = `${leftFrameWidth}px`;
  const rightFrame = document.getElementById("right-frame");
  const totalFrame = document.getElementById("total-frame");
  const totalFrameWidth = document.body.clientWidth;//- 120;
  const totalFrameHeight = document.body.clientHeight - 120;
  const leftFrameWidth = 200;
  const rightFrameWidth = totalFrameWidth - leftFrameWidth;
  // console.log(`totalFrameWidth = ${totalFrameWidth}, rightFrameWidth = ${rightFrameWidth}`);
  if (totalFrame !== null) {
    totalFrame.style.width = `${totalFrameWidth}px`;
    totalFrame.style.height = `${totalFrameHeight}px`;
  }
  rightFrame.style.width = `${rightFrameWidth}px`;
  const editors = GlobalUtil.model.localProjTree.editors;
  for (const key in editors) {
    const editor = editors[key];
    if (editor !== null && editor !== undefined) {
      // editor.setSize('auto', `${totalFrameHeight - 200}px`);
      const editorHeight = GlobalUtil.model.localProjTree.isResultFrameDisplay ? totalFrameHeight - 190 : totalFrameHeight - 70;
      editor.setSize('auto', `${editorHeight}px`);
    }
  }
  document.getElementById("pip-install-input-id").style.width = `${rightFrameWidth - 61}px`;
  // console.log(`totalFrameHeight = ${totalFrameHeight - 200}`);
};

let indexCounter = 0;

self.createFile = (uuid, superid, proId, type, name, content) => {
  const file = {
    index: indexCounter += 1,
    uuid: uuid,
    superid: superid,
    type: type,
    name: name,
    localContent: content,
    // remoteContent: content,
    proId: proId,
  };
  // if (self.curProj.files !== undefined) {
  //   self.curProj.files.push(file);
  // }
  return file;
};

self.getSelectedFileFolder = () => {
  let curUUID = self.curSelectedUUID;
  // let filePath = curSelectedUUID; //self.getThisFileFullPath(curSelectedUUID);
  const fileInfo = self.getFileInfo(curUUID);
  // console.log(`getSelectedFileFolder path = ${filePath}`);
  if (fileInfo === null) {
    return `${path.join(CommandsEditorSocket.ROOT_DIR, self.curProj.name)}`;
  }
  let filePath = fileInfo.uuid;
  const isProjFile = fileInfo.type === 'file';  // filePath.indexOf('.') > 0;
  if (isProjFile === true) {
    filePath = path.dirname(filePath);
  }
  return filePath;
};

self.getFileSuperid = () => {
  let curSelectedUUID = self.curSelectedUUID;
  if (curSelectedUUID === null || curSelectedUUID === undefined || curSelectedUUID === '') {
    return path.join(CommandsEditorSocket.ROOT_DIR, self.curProj.name);
  }
  let superid = curSelectedUUID;
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const file = self.curProj.files[i];
    if (file.uuid === curSelectedUUID) {
      if (file.type === self.PROJ_TREE_TYPE.FILE) {
        superid = file.superid;
      }
    }
  }
  return superid;
}

self.createProj = (name) => {
  const proj = {};
  proj.name = name;
  proj.uuid = uuidv4();
  proj.files = [];
  proj.superid = '';
  self.curProjList.push(proj);
  self.setCurSelectedFileUUIDs('');
  self.changeProj(proj.uuid);
  self.getCurSelectedFileUUIDs(proj.uuid);
  console.log(`self.curSelectedFileUUID = ${self.curSelectedFileUUID}`);
  return proj;
};

self.createFolder = (proId, name) => {
  const uuid = uuidv4();
  console.log(`uuid = ${uuid}`);
  let superid = self.getFileSuperid();
  const fileInfo = self.getFileInfo(superid);
  if (superid === proId || superid === undefined) {
    superid = '';
  }
  console.log(`createFolder superid = ${superid}`);
  return self.createFile(uuid, superid, proId, self.PROJ_TREE_TYPE.FOLDER, name, '');
};

self.createSimpleFile = (proId, name) => {
  const uuid = uuidv4();
  let superid = self.getFileSuperid();
  if (superid === proId || superid === undefined) {
    superid = '';
  }
  console.log(`createSimpleFile uuid = ${uuid}, superid = ${superid}`);
  return self.createFile(uuid, superid, proId, self.PROJ_TREE_TYPE.FILE, name, 'new');
};

self.delFiles = () => {
  const curUUID = self.curSelectedUUID;
  if (curUUID === null || curUUID === '' || curUUID === undefined) {
    return;
  }
  let tempFiles = [];
  for (var i = 0; i < self.curProj.files.length; i++) {
    const file = self.curProj.files[i];
    if (file.uuid !== curUUID && file.superid !== curUUID) {
      tempFiles.push(file);
    }
  }
  self.curProj.files = tempFiles;
  // self.curPro2Tree();
};

self.renameFile = (newname) => {
  const curUUID = self.curSelectedUUID;
  let file = self.getFileInfo(curUUID);
  file.name = newname;
};

self.renameProj = (newname) => {
  self.curProj.name = newname;
}

self.delProj = (uuid) => {
  if (uuid === self.curProj.uuid) {
    return;
  }
  for (let i = 0; i < self.curProjList.length; i += 1) {
    const pro = self.curProjList[i];
    if (pro.uuid === uuid) {
      console.log(`delProj uuid = ${uuid}`);
      self.curProjList.splice(i, 1);
      break;
    }
  }
};

self.changeProj = (uuid) => {
  let isExist = false;
  for (let i = 0; i < self.curProjList.length; i += 1) {
    const pro = self.curProjList[i];
    if (pro.uuid === uuid) {
      self.curProj = pro;
      for (let i = 0; i < self.curProjExpandedKeys.length; i += 1) {
        if (uuid === self.curProjExpandedKeys[i]) {
          isExist = true;
          break;
        }
      }
      break;
    }
  }
  if (isExist === false) {
    self.curProjExpandedKeys.push(uuid);
  }
  const openList = self.curOpenedTabs[uuid];
  self.getCurSelectedFileUUIDs();
  // self.getCurFilePath();
  self.curOpenedFilesList = openList;
  self.curPro2Tree();
};

self.curProjExpandedKeys = [];
// self.curProjExpandedKeys.push(self.curProj.uuid);
self.curProjAddOrRemoveExpandedKeys = (uuid) => {
  // console.log(`curProjAddOrRemoveExpandedKeys`);
  const isFile = self.isFile(uuid);
  let isExist = false;
  let tempKeys = [];
  if (isFile === false) {
    for (let i = 0; i < self.curProjExpandedKeys.length; i += 1) {
      if (self.curProjExpandedKeys[i].indexOf(uuid) < 0) {
        tempKeys.push(self.curProjExpandedKeys[i]);
      }
    }
  }
  self.curProjExpandedKeys = tempKeys;
};

self.sortProjFiles = (files) => {
  let tempFiles = [];
  let tempFolders = [];
  for (let j = 0; j < files.length; j += 1) {
    const file = files[j];
    if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
      tempFolders.push(file);
    }
    if (file.type === self.PROJ_TREE_TYPE.FILE) {
      tempFiles.push(file);
    }
  }
  return tempFiles.concat(tempFolders);
};

self.curProTreeDatas = [];
self.curPro2Tree = () => {
  if (self.curProj === null || self.curProj === undefined) {
    return [];
  }
  if (self.curProj.files === null || self.curProj.files === undefined) {
    return [];
  }
  const files = self.curProj.files;
  let tempDatas = [];
  // first folder proj
  const aChild = {};
  aChild.label = self.curProj.name;
  aChild.uuid = self.curProj.uuid;
  aChild.icon = '';
  aChild.children = [];
  tempDatas.push(aChild);
  let fileDatas = tempDatas[0].children;
  self.findFolder(fileDatas, '');
  self.curProTreeDatas = tempDatas;
};

self.findFolder = (tmpArr, superid) => {
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const aChild = {};
    const file = self.curProj.files[i];
    if (superid === file.superid) {
      aChild.label = file.name; //`<div>${file.name}</div>`;// self.getThisFileFullPath(file.uuid); //
      aChild.uuid = file.uuid;
      aChild.type = file.type;
      aChild.children = [];
      tmpArr.push(aChild);
      if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
        self.findFolder(aChild.children, file.uuid);
      }
    }
  }
};

self.curFile = null;
self.getFile = (uuid) => {
  const files = self.curProj.files;
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const fileId = file.uuid;
    if (file.type === self.PROJ_TREE_TYPE.FILE) {
      if (fileId === uuid) {
        return file;
      }
    }
  }
  return null;
};

self.getFileInfo = (uuid) => {
  const files = self.curProj.files;
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const fileId = file.uuid;
    if (fileId === uuid) {
      return file;
    }
  }
  return null;
};

//////////////////////////////////////////////////////////
  // get from remote
//////////////////////////////////////////////////////////

// curProjList
// self.getProjsFromArm = (callback) => {
//   const projs = [];
//   CommandsEditorSocket.listProjs((dict) => {
//
//   });
// };

self.isCmdRunning = false;
self.remoteCmdResult2Local = (dict) => {
  let stdout = dict.data.stdout;
  const programID = dict.data.program_id;
  if (stdout === undefined && programID === undefined) {
    stdout = dict.data;
  }

  if (stdout !== undefined) {
    GlobalUtil.model.localProjTree.runningCmdResult += stdout + "\n";
    // GlobalUtil.model.localProjTree.runningCmdResult = stdout;
  }
  if (programID !== undefined) {
    GlobalUtil.model.localProjTree.runningCmdProgramID = programID;
  }
  const show = document.getElementById("result-text");
  show.scrollTop = show.scrollHeight;
  console.log(`runPipCommand dict = ${stdout}, programID = ${programID}`);
  if (dict.code === 1111) {
    CommandsEditorSocket.stopPythonScript(() => {

    })
  }
};

self.remoteProjs2Local = (dict) => {
  if (dict.code !== 0) {
    console.log(`datas is not array`);
    return;
  }
  const projs = [];
  const datas = dict.data;
  const filesDict = {};
  // console.log(`datas = ${datas}`);
  const projDates = {};
  for (let i = 0; i < datas.length; i += 1) {
    const aFileRecord = datas[i];
    const ctime = aFileRecord.ctime;
    const type = aFileRecord.type;
    // console.log(`aFileRecord = ${aFileRecord}`);
    const filepath = aFileRecord.path;
    if (path.basename(filepath).indexOf('.') === 0) {
      continue;
    }
    // check which project
    const projName = filepath.replace(CommandsEditorSocket.ROOT_DIR + "/", "").split("/")[0];
    const projPath = path.join(CommandsEditorSocket.ROOT_DIR, projName);
    if (filepath === projPath) {
      projDates[filepath] = ctime;
    }
    let curProj = null;
    for (let i = 0; i < projs.length; i += 1) {
      const proj = projs[i];
      if (proj.name === projName) {
        curProj = proj;
      }
    }
    if (curProj === null) {
      curProj = {};
      curProj.name = projName;
      curProj.uuid = projPath;
      curProj.files = [];
      curProj.superid = '';
      curProj.ctime = projDates[curProj.uuid];
      projs.push(curProj);
    }
    // console.log(`projName 2 = ${projName}, filepath = ${filepath}`);
    // check and create folder
    // const isProFile = path.basename(filepath).indexOf('.') > 0;
    let tempPath = filepath;
    while (tempPath !== projPath && tempPath !== CommandsEditorSocket.ROOT_DIR) {
      // console.log(`filename = ${tempPath}`);
      const isExistFile = filesDict[tempPath] !== undefined && filesDict[tempPath] !== null;
      filesDict[tempPath] = ''; // tempPath; //
      const uuid = tempPath; // Base64.btoa(tempPath);
      let superpath = path.dirname(tempPath);
      if (superpath === projPath || superpath === CommandsEditorSocket.ROOT_DIR) {
        superpath = '';
      }
      const name = path.basename(tempPath);
      const superid = superpath; //Base64.btoa(superpath); //
      const isProFile = type === self.PROJ_TREE_TYPE.FILE; //path.basename(tempPath).indexOf('.') > 0;
      let fileType = isProFile ? self.PROJ_TREE_TYPE.FILE : self.PROJ_TREE_TYPE.FOLDER;
      // console.log(`isProFile = ${isProFile}, isExistFile = ${isExistFile}`);
      if (isExistFile === false) {
        let file = self.createFile(uuid, superid, curProj.uuid, fileType, name, '');
        // const content = self.curSelectedContent[uuid];

        // file.proId = curProj.uuid;

        // getSelectedContent

        curProj.files.push(file);
      }
      curProj.files = self.sortProjFiles(curProj.files);
      tempPath = path.dirname(tempPath);
    } 
    //;
    // console.log(`filesDict = ${JSON.stringify(filesDict)}`);
    // console.log(`curProj.files = ${JSON.stringify(curProj.files)}`);
  }
  self.curProjList = projs;
  if (self.curProj === null || self.curProj === undefined || self.curProj.uuid === undefined) {
    self.changeProj(self.curProjList[0].uuid);
  }
  else {
    self.changeProj(self.curProj.uuid);
  }
  self.curPro2Tree();
  // callback(projs);
};

export default self;
