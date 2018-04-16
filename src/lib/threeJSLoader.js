import * as THREE from 'three';
import * as THREESTLLoader from 'three-stl-loader'

const JOINT_MODEL_SRC = [];
for (let i = 0; i < 8; i += 1) {
  JOINT_MODEL_SRC[i] = require(`../assets/three-stl/${(i + 1)}.stl`);
}
const materialList = [];
const RAINBOW_COLOR_LIST = [0x4B0082, 0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x9400D3];
RAINBOW_COLOR_LIST.forEach((hex) => {
  hex = 0xffffff;
  materialList.push(new THREE.MeshPhongMaterial({ color: hex }));
});
const STLLoader = new THREESTLLoader(THREE)
const loader = new STLLoader()
const baseg = {}
baseg.geometry = null
baseg.init = () => {
  return new Promise((resolve) => {
    loadGeometry(1)
    loader.load(JOINT_MODEL_SRC[0], (geometry) => {
      console.log('stl 0 loaded')
      baseg.geometry = geometry
      resolve()
    })
  })
  
}

baseg.geometryList = []
function loadGeometry(index) {
  if (index < 8) {
    loader.load(JOINT_MODEL_SRC[0], (geometry) => {
      console.log(`stl ${index} model loaded.`)
      const mesh = new THREE.Mesh(geometry, materialList[index - 1]);
      baseg.geometryList.push(mesh)
      loadGeometry(index + 1)
    })
  }
}
export default baseg