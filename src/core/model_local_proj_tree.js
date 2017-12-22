
const LocalProjTree = {};
const self = LocalProjTree;

self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
}

self.curProj = {
  name: 'Default proj name',
  files: [
    {
      uuid: 'uuid_0',
      type: self.PROJ_TREE_TYPE.FILE,
      name: '00.py',
      content: null,
      superid: '',
    },
    {
      uuid: 'uuid_1',
      type: self.PROJ_TREE_TYPE.FOLDER,
      name: '文件夹1',
      content: null,
      superid: '',
    },
    {
      uuid: 'uuid_11',
      type: self.PROJ_TREE_TYPE.FILE,
      name: 'aa.py',
      content: null,
      superid: 'uuid_1',
    },
    {
      uuid: 'uuid_22',
      type: self.PROJ_TREE_TYPE.FILE,
      name: 'bb.py',
      content: null,
      superid: 'uuid_1',
    },
    {
      uuid: 'uuid_33',
      type: self.PROJ_TREE_TYPE.FILE,
      name: 'cc.py',
      content: null,
      superid: 'uuid_1',
    },
    {
      uuid: 'uuid_101',
      type: self.PROJ_TREE_TYPE.FOLDER,
      name: '文件夹101',
      content: null,
      superid: 'uuid_1',
    },
    {
      uuid: 'uuid_55',
      type: self.PROJ_TREE_TYPE.FILE,
      name: 'dd.py',
      content: null,
      superid: 'uuid_101',
    },
    {
      uuid: 'uuid_2',
      type: self.PROJ_TREE_TYPE.FOLDER,
      name: '文件夹2',
      content: null,
      superid: '',
    },
    {
      uuid: 'uuid_3',
      type: self.PROJ_TREE_TYPE.FOLDER,
      name: '文件夹3',
      content: null,
      superid: '',
    },
  ],
};

self.getAllFilesByFolder = (superid) => {
  console.log('curProj');
  if (superid === null) {
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
