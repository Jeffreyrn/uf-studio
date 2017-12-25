
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
    if (file.uuid === self.curSelectedFileUUID) {
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
    item.onmouseenter = (e) => {
      // console.log(`onmouseenter onmouseenter`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    item.onclick = (e) => {
      // console.log(`onclick onclick`);
      e.currentTarget.style.backgroundColor = 'pink';
    };
    item.focus = (e) => {
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

self.curProj = {
  name: 'Default proj name',
  files: [
    self.createFile('uuid_0', '', self.PROJ_TREE_TYPE.FILE, '00.py', '100'),
    self.createFile('uuid_a', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹1', ''),
    self.createFile('uuid_11', 'uuid_a', self.PROJ_TREE_TYPE.FILE, 'aa.py', 'aa'),
    self.createFile('uuid_22', 'uuid_a', self.PROJ_TREE_TYPE.FILE, 'bb.py', 'bb'),
    self.createFile('uuid_222', 'uuid_a', self.PROJ_TREE_TYPE.FILE, 'cc.py', 'cc'),
    self.createFile('uuid_33', 'uuid_a', self.PROJ_TREE_TYPE.FILE, 'dd.py', 'dd'),
    self.createFile('uuid_b', 'uuid_a', self.PROJ_TREE_TYPE.FOLDER, '文件夹102', ''),
    self.createFile('uuid_55', 'uuid_b', self.PROJ_TREE_TYPE.FILE, 'ff.py', 'ff'),
    self.createFile('uuid_c', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹2', ''),
    self.createFile('uuid_44', 'uuid_c', self.PROJ_TREE_TYPE.FILE, 'dd1.py', 'dd1'),
    self.createFile('uuid_555', 'uuid_c', self.PROJ_TREE_TYPE.FILE, 'dd2.py', 'dd2'),
    self.createFile('uuid_d', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹3', ''),
    self.createFile('uuid_66', 'uuid_d', self.PROJ_TREE_TYPE.FILE, 'ee.py', 'ee'),
  ],
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
