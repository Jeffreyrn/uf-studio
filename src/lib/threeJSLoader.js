import * as THREE from 'three';
import * as THREESTLLoader from 'three-stl-loader'

const JOINT_MODEL_SRC = [];
for (let i = 0; i < 8; i += 1) {
  JOINT_MODEL_SRC[i] = require(`../assets/three-stl/${(i + 1)}.stl`);
}
const materialList = [];
const RAINBOW_COLOR_LIST = [0x4B0082, 0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x9400D3, 0xffffff];
RAINBOW_COLOR_LIST.forEach((hex) => {
  hex = 0xffffff;
  materialList.push(new THREE.MeshPhongMaterial({ color: hex }));
});

const STLLoader = new THREESTLLoader(THREE)
const loader = new STLLoader()
const meshResource = {
  geometryList: []
}
// baseg.geometry = null
// loader.load(JOINT_MODEL_SRC[0], (geometry) => {
//   console.log('stl 0 loaded')
//   baseg.geometry = geometry
//   resolve()
// })
meshResource.init = () => {
  return new Promise((resolve) => {
    loadGeometry(0, resolve)
  })
}

function loadGeometry(index, resolve) {
  if (index < 8) {
    loader.load(JOINT_MODEL_SRC[index], (geometry) => {
      const mesh = new THREE.Mesh(geometry, materialList[index]);
      console.log(`stl ${index} model loaded.`, mesh)
      meshResource.geometryList.push(mesh)
      loadGeometry(index + 1, resolve)
    })
  }
  else {
    resolve()
  }
}
export default meshResource