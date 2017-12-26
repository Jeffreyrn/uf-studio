const uuidv4 = require('uuid/v4');
const LocalProjTreeDatas = {};
const self = LocalProjTreeDatas;

self.PROJ_TREE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file',
}

self.curProjList = [];
self.indexCounter = 1;
self.createFile = (uuid, superid, type, name, content) => {
  return {
    index: self.indexCounter += 1,
    uuid: uuid,
    superid: superid,
    type: type,
    name: name,
    content: content,
  };
};

self.createTestProj = (index) => {
  const proj = {};
  proj.name = `proj_${index}`;
  proj.uuid = `pro_uuid_${index}`;
  proj.files = [];
  let folder1 = self.createFile(uuidv4(), '', self.PROJ_TREE_TYPE.FOLDER, `${proj.name}_folder_1`, '');
  let folder11 = self.createFile(uuidv4(), folder1.uuid, self.PROJ_TREE_TYPE.FOLDER, `${proj.name}_folder_11`, '');
  let folder2 = self.createFile(uuidv4(), '', self.PROJ_TREE_TYPE.FOLDER, `${proj.name}_folder_2`, '');
  let folder3 = self.createFile(uuidv4(), '', self.PROJ_TREE_TYPE.FOLDER, `${proj.name}_folder_3`, '');

  let fileIndex = 0;
  fileIndex += 1;
  let file1 = self.createFile(uuidv4(), folder1.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file2 = self.createFile(uuidv4(), folder1.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file3 = self.createFile(uuidv4(), folder1.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file4 = self.createFile(uuidv4(), folder11.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file5 = self.createFile(uuidv4(), folder11.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file6 = self.createFile(uuidv4(), folder2.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file7 = self.createFile(uuidv4(), folder2.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file8 = self.createFile(uuidv4(), folder3.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file9 = self.createFile(uuidv4(), folder3.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file10 = self.createFile(uuidv4(), folder3.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);
  fileIndex += 1;
  let file11 = self.createFile(uuidv4(), folder3.uuid, self.PROJ_TREE_TYPE.FILE, `filename_${fileIndex}.py`, `filename_${fileIndex}.py`);

  proj.files.push(folder1);
  proj.files.push(folder11);
  proj.files.push(folder2);
  proj.files.push(folder3);

  proj.files.push(file1);
  proj.files.push(file2);
  proj.files.push(file3);
  proj.files.push(file4);
  proj.files.push(file5);
  proj.files.push(file6);
  proj.files.push(file7);
  proj.files.push(file8);
  proj.files.push(file9);
  proj.files.push(file10);
  proj.files.push(file11);

  return proj;
};

for (var i = 1; i < 10; i++) {
  self.curProjList.push(self.createTestProj(i));
}

export default self;
