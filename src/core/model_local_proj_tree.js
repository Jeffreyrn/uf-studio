
import LocalProjTreeDatas from './model_local_proj_tree_datas';
const uuidv4 = require('uuid/v4');

const LocalProjTree = {};
const self = LocalProjTree;

self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
}

// self.curSelectedFile = '';
self.treeBgColor = 'white';
self.curSelectedUUID = '';
self.curSelectedFileUUID = '';
self.curSelectedFolderUUID = '';
self.curSelectedContent = '';
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
  const proList = self.curOpenedTabs[proId];
  for (let i = 0; i < proList.length; i += 1) {
    const file = proList[i];
    if (file.uuid === fileId) {
      return;
    }
  }
  proList.push(file);
  self.curOpenedFilesList = proList;
};
self.removeOpenTab = (fileId) => {
  const file = self.getFile(fileId);
  if (file === null) {
    return;
  }
  const proId = self.curProj.uuid;
  let proList = self.curOpenedTabs[proId];
  if (proList === null || proList === '' || proList === undefined) {
    proList = [];
    return;
  }
  let spliceIndex = 0;
  for (let i = 0; i < proList.length; i += 1) {
    const file = proList[i];
    if (file.uuid === fileId) {
      proList.splice(i,1);
      spliceIndex = i;
      break;
    }
  }
  if (fileId === self.curSelectedFileUUID) {
    if (proList.length > 0) {
      const index = spliceIndex - 1 >= 0 ? spliceIndex - 1 : 0;
      self.setSelectedUUID(proList[index].uuid);
    }
  }
  self.curOpenedFilesList = proList;
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
  if (uuid === '' || uuid === null || uuid === undefined) {
    self.curSelectedFileUUID = '';
    self.curSelectedFolderUUID = '';
    // self.curSelectedContent = '';
    // self.curFile = null
    return;
  }
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const file = self.curProj.files[i];
    if (file.uuid === uuid) {
      if (file.type === self.PROJ_TREE_TYPE.FILE) {
        self.curSelectedContent = file.content;
        // self.curSelectedFile = file;
        self.curSelectedFileUUID = uuid
        self.curSelectedFolderUUID = '';
        self.curFile = file;
      }
      if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
        self.curSelectedFolderUUID = uuid;
      }
    }
  }
};

let indexCounter = 0;

self.createFile = (uuid, superid, type, name, content) => {
  return {
    index: indexCounter += 1,
    uuid: uuid,
    superid: superid,
    type: type,
    name: name,
    content: content,
  };
};

function getSuperid() {
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

self.createFolder = (name) => {
  const uuid = uuidv4();
  console.log(`uuid = ${uuid}`);
  const superid = getSuperid();
  return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FOLDER, name, '');
};

self.createSimpleFile = (name) => {
  const uuid = uuidv4();
  console.log(`uuid = ${uuid}`);
  const superid = getSuperid();
  return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FILE, name, 'new');
};

self.delFiles = () => {
  const curSelectedUUID = self.curSelectedUUID;
  if (curSelectedUUID === null || curSelectedUUID === '' || curSelectedUUID === undefined) {
    return;
  }
  let tempFiles = [];
  for (var i = 0; i < self.curProj.files.length; i++) {
    const file = self.curProj.files[i];
    if (file.uuid !== curSelectedUUID && file.superid !== curSelectedUUID) {
      tempFiles.push(file);
    }
  }
  self.curProj.files = tempFiles;
  // self.curPro2Tree();
};

self.curProj = LocalProjTreeDatas.curProjList[2];
self.curProjList = LocalProjTreeDatas.curProjList;
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
  const proList = self.curOpenedTabs[uuid];
  self.curOpenedFilesList = proList;
};

self.curProjExpandedKeys = [];
self.curProjExpandedKeys.push(self.curProj.uuid);
self.curProjAddOrRemoveExpandedKeys = (uuid) => {
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
  // let arr = [];
  // for (let i = 0; i < self.curProjExpandedKeys.length; i += 1) {
  //   if (self.curProjExpandedKeys[i] !== null) {
  //     arr.push(self.curProjExpandedKeys[i]);
  //   }
  // }
  // self.curProjExpandedKeys = arr;
  if (isExist === false) {
    self.curProjExpandedKeys.push(uuid);
  }
};
self.findFolder = (tmpArr, superid) => {
  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const aChild = {};
    const file = self.curProj.files[i];
    if (superid === file.superid) {
      aChild.label = file.name;
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
self.curPro2Tree = () => {
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
  return tempDatas;
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

export default self;
