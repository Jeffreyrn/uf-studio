
import LocalProjTreeDatas from './model_local_proj_tree_datas';

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
self.addOpenFile = (uuid) => {
  const file = self.getFile(uuid);
  if (file === null) {
    return;
  }
  for (let i = 0; i < self.curOpenedFilesList.length; i += 1) {
    const file = self.curOpenedFilesList[i];
    if (file.uuid === uuid) {
      return;
    }
  }
  self.curOpenedFilesList.push(file);
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

self.removeOpenFile = (uuid) => {
  let newArr = [];
  for (let i = 0; i < self.curOpenedFilesList.length; i += 1) {
    const file = self.curOpenedFilesList[i];
    if (file.uuid !== uuid) {
      newArr.push(file);
    }
  }
  self.curOpenedFilesList = newArr;
};

self.resetSelectedTab = () => {
  const tabs = document.getElementsByName('top-tab');
  for (let i = 0; i < tabs.length; i += 1) {
    const tab = tabs[i];
    tab.style.backgroundColor = 'transparent';
  }
};
self.setSelectedTab = (uuid) => {
  const tab = document.getElementById(`top-tab-${uuid}`);
  if (tab !== null) {
    tab.style.backgroundColor = 'pink';
  }

  // const tabs = document.getElementsByName('top-tab');
  // for (let i = 0; i < tabs.length; i += 1) {
  //   const tab = tabs[i];
  //   // tab.style.backgroundColor = 'transparent';
  //   console.log(`attr= ${tab.attr}`);
  // }
};

self.setSelectedFileUUID = (uuid) => {
  self.curSelectedUUID = uuid;
  if (uuid === '') {
    self.curSelectedFileUUID = '';
    self.curSelectedFolderUUID = '';
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
  const uuid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  console.log(`uuid = ${uuid}`);
  const superid = getSuperid();
  return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FOLDER, name, '');
};

self.createSimpleFile = (name) => {
  const uuid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
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

self.resetFileBackground = (isRestFont) => {
  const files = self.curProj.files;
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const fileId = file.uuid;
    if (file.type === self.PROJ_TREE_TYPE.FILE) {
      const fileName = document.getElementById(`file-id-${fileId}`);
      if (isRestFont && fileName !== null) {
        fileName.style.color = 'blue';
      }
    }
    const menuName = document.getElementById(`menu-id-${fileId}`);
    if (menuName !== null) {
      menuName.style.backgroundColor = self.treeBgColor;
    }
  }
};

self.setSelectedFileStyle = (uuid, isSetFont) => {
  if (uuid !== null) {
    const fileName = document.getElementById(`file-id-${uuid}`);
    if (isSetFont && fileName !== null) {
      fileName.style.color = 'red';
    }
    const menuName = document.getElementById(`menu-id-${uuid}`);
    if (menuName !== null) {
      menuName.style.backgroundColor = 'pink';
    }
  }
};

self.resetMenuStyle = () => {
  const submenus = document.getElementsByClassName('el-submenu__title');
  const fileDivsCount = submenus.length;
  console.log(`submenus 1 count = ${fileDivsCount}`);
  for (let i = 0; i < submenus.length; i++) {
    let submenu = submenus[i];
    // submenu.parentNode.style.height = '30px';
    submenu.onmouseenter = (e) => {
      // console.log(`onmouseenter onmouseenter`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    submenu.onclick = (e) => {
      console.log(`onclick onclick`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    submenu.onfocus = (e) => {
      // console.log(`onclick onclick`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
  }

  const items = document.getElementsByClassName('el-menu-item');
  const itemsCount = items.length;
  console.log(`items 1 count = ${itemsCount}`);
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    // item.style.height = '20px';
    item.onmouseenter = (e) => {
      // console.log(`onmouseenter onmouseenter`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    item.onclick = (e) => {
      // console.log(`onclick onclick`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    item.onfocus = (e) => {
      // console.log(`onclick onclick`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    item.onblur = (e) => {
      // console.log(`onblur onblur`);
      e.currentTarget.style.backgroundColor = 'transparent';
    };
    item.onmouseleave = (e) => {
      // console.log(`onmouseleave onmouseleave`);
      e.currentTarget.style.backgroundColor = 'transparent';
    };
  }
};

self.curProj = LocalProjTreeDatas.curProjList[2];
self.curProjList = LocalProjTreeDatas.curProjList;

// Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
// //prototype为对象原型，注意这里为对象增加自定义方法的方法。
// 　if(n<0)　//如果n<0，则不进行任何操作。
// return this;
// 　else
//   return this.slice(0,n).concat(this.slice(n+1,this.length);
// );

// self.curProjTreeData = [];
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
  console.log(`self.curProjTreeData = ${JSON.stringify(tempDatas)}`);
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

self.getAllFilesByFolder = (superid) => {
  console.log('curProj');
  if (superid === null || superid === undefined) {
    superid = '';
  }
  // console.log(curProj);
  const files = self.curProj.files;
  // if null, root folder
  // if (superid === null || superid === undefined) {
  //   return files;
  // }
  let ret = [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    // console.log(`list name = ${file.name}, file.superid = ${file.superid}, superid = ${superid}`);
    if (file.superid === superid) {
      ret.push(file);
    }
    else if (superid === null && file.superid === null) {
      ret.push(file);
    }
  }
  const counter = ret.length;
  console.log(`list name = count ${counter}`);
  return ret;
};

export default self;
