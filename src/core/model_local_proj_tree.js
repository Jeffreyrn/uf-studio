
const LocalProjTree = {};
const self = LocalProjTree;

self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
}

self.curSelectedFileUUID = '';
self.curSelectedFolderUUID = '';

self.setSelectedFileUUID = (uuid) => {
  // self.curSelectedFileUUID = uuid;

  for (let i = 0; i < self.curProj.files.length; i += 1) {
    const file = self.curProj.files[i];
    if (file.uuid === uuid) {
      if (file.type === self.PROJ_TREE_TYPE.FOLDER) {
        self.curSelectedFolderUUID = file.uuid;
      }
      if (file.type === self.PROJ_TREE_TYPE.FILE) {
        self.curSelectedFileUUID = file.uuid;
        self.curSelectedFolderUUID = file.superid;
      }
    }
  }
};

self.createFile = (uuid, superid, type, name) => {
  return {
    uuid: uuid,
    superid: superid,
    type: type,
    name: name,
    content: '',
  };
};

self.createFolder = (uuid, superid, name) => {
  return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FOLDER, name);
};

self.createSimpleFile = (uuid, superid, name) => {
  return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FILE, name);
};
//
// self.createFile = (uuid, superid, name) => {
//   return self.createFile(uuid, superid, self.PROJ_TREE_TYPE.FILE, name);
// };

self.curProj = {
  name: 'Default proj name',
  files: [
    self.createFile('uuid_0', '', self.PROJ_TREE_TYPE.FILE, '00.py'),
    self.createFile('uuid_1', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹1'),
    self.createFile('uuid_11', 'uuid_1', self.PROJ_TREE_TYPE.FILE, 'aa.py'),
    self.createFile('uuid_22', 'uuid_1', self.PROJ_TREE_TYPE.FILE, 'bb.py'),
    self.createFile('uuid_222', 'uuid_1', self.PROJ_TREE_TYPE.FILE, 'cc.py'),
    self.createFile('uuid_33', 'uuid_1', self.PROJ_TREE_TYPE.FILE, 'dd.py'),
    self.createFile('uuid_101', 'uuid_1', self.PROJ_TREE_TYPE.FOLDER, '文件夹101'),
    self.createFile('uuid_55', 'uuid_101', self.PROJ_TREE_TYPE.FILE, 'ff.py'),
    self.createFile('uuid_2', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹2'),
    self.createFile('uuid_3', '', self.PROJ_TREE_TYPE.FOLDER, '文件夹3'),
  ],
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
    console.log(`list name = ${file.name}, file.superid = ${file.superid}, superid = ${superid}`);
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
