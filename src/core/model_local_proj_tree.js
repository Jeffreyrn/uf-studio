
import LocalProjTreeDatas from './model_local_proj_tree_datas';
import Base64 from '../lib/Base64';
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
self.treeBgColor = 'white';
self.curSelectedUUID = '';
self.curSelectedFileUUIDs = {};
self.curSelectedFileUUID = '';
self.curProjList = [];
self.isResultFrameDisplay = false;
self.isEditingPoints = false;

// self.getProjsFromArm((dict) => {
//   self.curProjList = dict;
// }); //LocalProjTreeDatas.curProjList;
// self.curProj = LocalProjTreeDatas.curProjList[2];
// self.curFilePath = `/${self.curProj.name}`;
self.curProj = {};
self.curFilePath = ''

self.getThisFileFullPath = (uuid) => {
  let file = self.getFileInfo(uuid);
  // console.log(`getThisFileFullPath file = ${JSON.stringify(file)}`);
  if (file === null || file === undefined) {
    // self.curFilePath = `/${self.curProj.name}`;
    return path.join(CommandsEditorSocket.ROOT_DIR, self.curProj.name);
  }
  let proj = null;
  for (let i = 0; i < self.curProjList.length; i += 1) {
    const pro = self.curProjList[i];
    if (pro.uuid === file.proId) {
      proj = pro;
      break;
    }
  }
  // console.log(`getThisFileFullPath proj = ${JSON.stringify(proj)}`);
  const projPath = path.join(CommandsEditorSocket.ROOT_DIR, proj.name);
  let filename = file.name;
  while (file.superid !== null && file.superid !=='' && file.superid !== undefined) {
    const superid = file.superid;
    file = self.getFileInfo(superid);
    if (file !== null && file !== undefined) {
      filename = path.join(`${file.name}`, filename);
    }
    else {
      break;
    }
  }
  const fullPath = path.join(projPath, filename);
  console.log(`fullPath = ${fullPath}`);
  return fullPath;
};

self.getCurFilePath = () => {
  const curUUID = self.curSelectedFileUUID;
  let file = self.getFileInfo(curUUID);
  if (file === null || file === undefined) {
    self.curFilePath = `/${self.curProj.name}`;
    return;
  }
  let filename = file.name;
  while (file.superid !== null && file.superid !=='' && file.superid !== undefined) {
    const superid = file.superid;
    file = self.getFileInfo(superid);
    if (file !== null && file !== undefined) {
      filename = path.join(`${file.name}`, filename);
    }
    else {
      break;
    }
  }
  filename = path.join(`/${self.curProj.name}`, filename);
  // filename = filename.replace("/", "/ ");
  self.curFilePath = filename;
};
// self.getCurFilePath();
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
  self.getCurFilePath();
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
self.curSelectedContent = '';
// self.getSelectedContent = (uuid) => {
//   if (curSelectedContents[uuid] === null || curSelectedContents[uuid] === undefined) {
//     curSelectedContents[uuid] = '';
//   }
//   self.curSelectedContent = curSelectedContents[uuid];
//   return curSelectedContents[uuid];
// };
self.setSelectedContent = (uuid, content) => {

  self.curSelectedContent = content;
  self.curSelectedContents[uuid] = content;
  const curFile = self.getFile(uuid);
  curFile.localContent = content;
};
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
  for (let i = 0; i < proTabsList.length; i += 1) {
    const file = proTabsList[i];
    if (file.uuid === fileId) {
      proTabsList.splice(i,1);
      spliceIndex = i;
      break;
    }
  }
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
  self.curOpenedFilesList = proTabsList;
  if (self.curOpenedFilesList.length === 0) {
    self.setSelectedUI(null);
  }
};
// self.addOpenFile = (uuid) => {
//   const file = self.getFile(uuid);
//   if (file === null) {
//     return;
//   }
//   for (let i = 0; i < self.curOpenedFilesList.length; i += 1) {
//     const file = self.curOpenedFilesList[i];
//     if (file.uuid === uuid) {
//       return;
//     }
//   }
//   self.curOpenedFilesList.push(file);
// };

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
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const file = self.curProj.files[i];
    if (file.uuid === uuid) {
      if (file.type === self.PROJ_TREE_TYPE.FILE) {
        self.setSelectedContent(file.uuid, file.localContent);
        self.setCurSelectedFileUUIDs(uuid);
        self.curSelectedFolderUUID = '';
        self.curFile = file;
        console.log(`selected = ${file.name}`);
        CommandsEditorSocket.getFile(file.uuid, (dict) => {
          let content = dict.data;
          if (content === null || content === undefined) {
            content = '';
          }
          self.curFile.remoteContent = content;
          if (self.curFile.localContent === null || self.curFile.localContent === undefined || self.curFile.localContent === '') {
            // self.curFile.localContent === content;
            self.setSelectedContent(file.uuid, content);
          }
        });
      }
      if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
        self.curSelectedFolderUUID = uuid;
      }
    }
  }
  // ui
  self.setSelectedUI(uuid);
};

self.setSelectedUI = (uuid) => {
  const file = GlobalUtil.model.localProjTree.getFileInfo(uuid);
  // console.log(`setSelectedUI file type uuid = ${uuid}, file = ${file}`);
  // if (file) {
  //   console.log(`setSelectedUI file type = ${file.type}`);
  // }
  const nodes = document.getElementsByClassName('el-tree-node__label');
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (file === null) {
      node.style.color = 'gray';
    }
    else if (file.type !== 'file') {
      return;
    }
    else if (file.name === node.innerHTML) {
      node.style.color = 'blue';
    }
    else {
      node.style.color = 'gray';
    }
  }
  const curFile = self.curFile;
  if (curFile === null) {
    return;
  }
  setTimeout(() => {
    // const curFile = GlobalUtil.model.localProjTree.curFile;
    let selectedEditor = null;
    const editors = document.getElementsByName("code-editor");
    // console.log(`editor value =  cur ${curFile.uuid}`);
    for (let i = 0; i < editors.length; i += 1) {
      const editor = editors[i];
      editor.style.display = 'none';
    }
    for (let i = 0; i < editors.length; i += 1) {
      const editor = editors[i];
      // console.log(`editor value = ${editor.getAttribute("value")}`);
      const aUUID = editor.getAttribute("value");
      editor.style.display = 'none';
      if (aUUID === curFile.uuid) {
        // editor.style.display = 'block';
        selectedEditor = editor;
      }
      // else {
      //   editor.style.display = 'none';
      // }
    }
    if (selectedEditor !== null) {
      selectedEditor.style.display = 'block';
    }
  });
};

self.onwinresize = () => {
  const leftFrame = document.getElementById("left-frame");
  // leftFrame.style.width = `${leftFrameWidth}px`;
  const rightFrame = document.getElementById("right-frame");
  const totalFrame = document.getElementById("total-frame");
  const totalFrameWidth = document.body.clientWidth - 20;
  const totalFrameHeight = document.body.clientHeight - 120;
  const leftFrameWidth = 200;
  const rightFrameWidth = totalFrameWidth - leftFrameWidth - 2;
  totalFrame.style.width = `${totalFrameWidth}px`;
  rightFrame.style.width = `${rightFrameWidth}px`;
  totalFrame.style.height = `${totalFrameHeight}px`;
  const editors = GlobalUtil.model.localProjTree.editors;
  for (const key in editors) {
    const editor = editors[key];
    if (editor !== null && editor !== undefined) {
      // editor.setSize('auto', `${totalFrameHeight - 200}px`);
      const editorHeight = GlobalUtil.model.localProjTree.isResultFrameDisplay ? totalFrameHeight - 200 : totalFrameHeight - 80;
      editor.setSize('auto', `${editorHeight}px`);
    }
  }
  document.getElementById("pip-install-input-id").style.width = `${rightFrameWidth - 150}px`;
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
    remoteContent: content,
    proId: proId,
  };
  // if (self.curProj.files !== undefined) {
  //   self.curProj.files.push(file);
  // }
  return file;
};

self.getSelectedFileFolder = () => {
  let curSelectedUUID = self.curSelectedUUID;
  let filePath = self.getThisFileFullPath(curSelectedUUID);
  console.log(`getSelectedFileFolder path = ${filePath}`);
  const isProjFile = filePath.indexOf('.') > 0;
  if (isProjFile === true) {
    filePath = path.basename(filePath);
  }
  return filePath;
};

function getFileSuperid() {
  let curSelectedUUID = self.curSelectedUUID;
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
  let superid = getFileSuperid();
  const fileInfo = self.getFileInfo(superid);
  if (superid === proId || superid === undefined) {
    superid = '';
  }
  console.log(`createFolder superid = ${superid}`);
  return self.createFile(uuid, superid, proId, self.PROJ_TREE_TYPE.FOLDER, name, '');
};

self.createSimpleFile = (proId, name) => {
  const uuid = uuidv4();
  let superid = getFileSuperid();
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
  self.getCurFilePath();
  self.curOpenedFilesList = openList;
  self.curPro2Tree();
};

self.curProjExpandedKeys = [];
// self.curProjExpandedKeys.push(self.curProj.uuid);
self.curProjAddOrRemoveExpandedKeys = (uuid) => {
  // console.log(`curProjAddOrRemoveExpandedKeys`);
  const isFile = self.isFile(uuid);
  let isExist = false;
  if (isFile === false) {
    for (let i = 0; i < self.curProjExpandedKeys.length; i += 1) {
      if (uuid === self.curProjExpandedKeys[i]) {
        // self.curProjExpandedKeys[i] = null;
        self.curProjExpandedKeys.splice(i,1);
        isExist = true;
      }
    }
  }
  if (isExist === false && isFile === false) {
    self.curProjExpandedKeys.push(uuid);
  }
  // console.log(`curProjAddOrRemoveExpandedKeys count = ${JSON.stringify(self.curProjExpandedKeys)}`);
};
self.findFolder = (tmpArr, superid) => {
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const aChild = {};
    const file = self.curProj.files[i];
    if (superid === file.superid) {
      aChild.label = file.name; //`<div>${file.name}</div>`;// self.getThisFileFullPath(file.uuid); //
      aChild.uuid = file.uuid;
      aChild.children = [];
      tmpArr.push(aChild);
      if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
        // self.curProjExpandedKeys.push(file.uuid);
        self.findFolder(aChild.children, file.uuid);
      }
    }
  }
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
  const aChild = {};
  aChild.label = self.curProj.name;
  aChild.uuid = self.curProj.uuid;
  aChild.children = [];
  tempDatas.push(aChild);
  let fileDatas = tempDatas[0].children;
  self.findFolder(fileDatas, '');
  // console.log(`self.curProjTreeData = ${JSON.stringify(tempDatas)}`);
  // return tempDatas;
  self.curProTreeDatas = tempDatas;
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
  let filesDict = {};
  // console.log(`datas = ${datas}`);
  for (let i = 0; i < datas.length; i += 1) {
    const data = datas[i];
    if (path.basename(data).indexOf('.') === 0) {
      continue;
    }
    // check which project
    const projName = data.replace(CommandsEditorSocket.ROOT_DIR + "/", "").split("/")[0];
    const projPath = path.join(CommandsEditorSocket.ROOT_DIR, projName);
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
      curProj.uuid = path.join(CommandsEditorSocket.ROOT_DIR, projName);
      curProj.files = [];
      curProj.superid = '';
      projs.push(curProj);
    }
    // console.log(`projName 2 = ${projName}, data = ${data}`);
    // check and create folder
    // const isProFile = path.basename(data).indexOf('.') > 0;
    let tempPath = data;
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
      const isProFile = path.basename(tempPath).indexOf('.') > 0;
      let fileType = isProFile ? self.PROJ_TREE_TYPE.FILE : self.PROJ_TREE_TYPE.FOLDER;
      // console.log(`isProFile = ${isProFile}, isExistFile = ${isExistFile}`);
      if (isExistFile === false) {
        let file = self.createFile(uuid, superid, curProj.uuid, fileType, name, '');
        const content = self.curSelectedContent[uuid];

        // file.proId = curProj.uuid;

        // getSelectedContent

        curProj.files.push(file);
      }
      tempPath = path.dirname(tempPath);
    } //;
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
