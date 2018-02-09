<!-- 传递参数control（数组，index: 0-6）, 离线模式下控制机械臂, <keep-alive> 
     传递参数size = {width: xx, heigth: xx}, 数值为百分比（0.01-0.99）窗口宽高占当前总窗口的百分比-->
<template>
  <div class="hello" id="model-wrapper">
    <!-- <div class="block">
      <el-select v-model="select" placeholder="Select" @change="changeJoint">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div> -->
    <!-- <div class="hello-row">
      <div class="block">
        <span class="text">Group-X</span>
        <el-slider v-model="state.test.x" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Group-Y</span>
        <el-slider v-model="state.test.y" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Group-Z</span>
        <el-slider v-model="state.test.z" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-X</span>
        <el-slider v-model="state.test.jx" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-Y</span>
        <el-slider v-model="state.test.jy" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-Z</span>
        <el-slider v-model="state.test.jz" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
      <div class="block">
        <span class="text">Scale</span>
        <el-slider v-model="state.test.scale" :step="config.step" :max="config.debugMax" :min="config.debugMin" show-input></el-slider>
      </div>
    </div> -->
    <div class="hello-row">
      <div id="emulator-overlay">
        <span v-for="j in 7" :key="j" class="text">#{{j-1}}:{{joints[j-1]}}</span>
        <!-- <el-slider v-model="joints[j-1]" :step="config.step" :max="config.jointMax" :min="config.jointMin"></el-slider> -->
      </div>
      <div id="emulator-container"></div>
    </div>
    <!-- 
    <div class="block">{{ msg }}-debugTest-{{joints}}</div>
    step<input v-model="config.step"/>> -->
    
  </div>
</template>

<script>
import * as THREE from 'three';
import * as THREESTLLoader from 'three-stl-loader';
import OrbitControls from 'three-orbitcontrols';
// import * as types from '../../store/mutation-types';

const JOINT_POSITION = [
  null,
  [42, 4.6, 0],
  [-0.3, 4.7, -24.2],
  [42.05, 4.2, 0],
  [0.45, -1.2, -52.8],
  [42, -7.3, -60.7],
  [7.36, -35.85, -60.7],
  [42, -42.2, 0],
];
const GROUP_POSITION = [
  [0.1, 0.04, -0.04],
  [42.4, -0.1, 24.2],
  [-42.35, 0.5, -24],
  [41.51, 5.38, 52.72],
  [-41.4, 6.16, 7.9],
  [35.47, 27.6, -0.05],
  [-34.6, 6.4, -60.8],
];

export default {
  name: 'xarm-model',
  props: ['control', 'size'],
  watch: {
    control(newValue) {
      console.log('watch posi print:');
      console.table(newValue);
    },
    // robotJointsAngle() {
    //   this.$set(this.robotJointsAngle, 0, this.robotJointsAngle[0]);
    // },
  },
  computed: {
    joints: {
      get() {
        const arr = this.$store.getters.joints;
        console.log('get ax', arr);
        if (arr && (arr.length > 0)) {
          const values = arr.map(str => Number(str));
          // console.log('arr posi print:', values.length);
          // console.table(values);
          this.test = values[1];
          return values.slice();
        }
        return [0, 0, 0, 0, 0, 0, 0];
      },
      set(value) {
        console.log('SET');
        console.table(value);
        // this.$store.commit(types.ROBOT_MOVE_JOINT, value.map(str => Number(str)));
      },
    },
    online() {
      return this.$store.state.robot.info.online;
    },
  },
  data() {
    return {
      test: null,
      testtest: [],
      config: {
        debugMax: 200,
        debugMin: -300,
        jointMax: 180,
        jointMin: -180,
        step: 0.1,
        offsetY: -7,
      },
      options: [0, 1, 2, 3, 4, 5, 6, 7],
      select: 7,
      state: {
        speed: 50,
        acceleration: 50,
        online: false,
        joint: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
        },
        rott: 5,
        test: {
          x: 0,
          y: 0,
          z: 0,
          jx: 0,
          jy: 0,
          jz: 0,
          scale: 1,
        },
      },
      msg: 'Emulator',
      three: {
        scene: null,
        groups: null,
      },
    };
  },
  mounted() {
    this.createRobotModel();
  },
  beforeDestroy() {
    if (this.three.scene) {
      this.three.scene.remove();
      this.three.scene.remove(this.three.groups[0]);
    }
    // this.three.scene.remove(this.three.groups[0]);
  },
  methods: {
    createRobotModel() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const RAINBOW_COLOR_LIST = [0x4B0082, 0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x9400D3];
      const MODEL_DIR = '../../src/assets/three-stl/';
      const FILE_FORMAT = '.stl';
      const JOINT_MODEL_SRC = [
        `${MODEL_DIR}1${FILE_FORMAT}`,
        `${MODEL_DIR}2${FILE_FORMAT}`,
        `${MODEL_DIR}3${FILE_FORMAT}`,
        `${MODEL_DIR}4${FILE_FORMAT}`,
        `${MODEL_DIR}5${FILE_FORMAT}`,
        `${MODEL_DIR}6${FILE_FORMAT}`,
        `${MODEL_DIR}7${FILE_FORMAT}`,
        `${MODEL_DIR}8${FILE_FORMAT}`,
      ];
      const materialList = [];
      RAINBOW_COLOR_LIST.forEach((hex) => {
        hex = 0xffffff;
        materialList.push(new THREE.MeshPhongMaterial({ color: hex }));
      });
      console.log(materialList);
      const scene = new THREE.Scene();
      const SCENE_ZOOM = 64;
      // console.log(this.three.scene, scene);
      scene.background = new THREE.Color(0xffffff); // c0c0c0
      // const camera = new THREE.PerspectiveCamera(105, this.getCameraAspect(), 0.1, 1000);
      const sizeArray = this.getRenderSize();
      const halfSize = sizeArray.map(value => value / SCENE_ZOOM);
      const camera = new THREE.OrthographicCamera(-halfSize[0], halfSize[0], halfSize[1], -halfSize[1], -50, 50);
      // camera.position.z = -50;
      // camera.up = new THREE.Vector3(-1, -1, -1);
      camera.position.set(3, 1, 3); // camera position
      camera.lookAt(scene.position); // camera look at
      const light = new THREE.PointLight(0xcccccc, 1, 100); // light
      light.position.set(10, 14, 10);
      const lightBottomBack = new THREE.PointLight(0xcccccc, 1, 100); // light
      const lightBottomFront = new THREE.PointLight(0xffffff, 1, 100); // light
      lightBottomBack.position.set(-12, 0, 0);
      lightBottomFront.position.set(22, 0, -10);
      scene.add(lightBottomBack);
      scene.add(lightBottomFront);
      scene.add(light);
      // camera.position.set(25, 25, 25);
      const renderer = new THREE.WebGLRenderer();
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.update();
      renderer.setSize(...this.getRenderSize());
      document.getElementById('emulator-container').appendChild(renderer.domElement);
      // new THREE.CylinderGeometry(0.5, 0.5, 2, 4, 4);
      const STLLoader = new THREESTLLoader(THREE);
      const loader = new STLLoader();
      let base;
      loader.load(JOINT_MODEL_SRC[0], (geometry) => {
        base = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
        const position = [7.66, 0.04 + this.config.offsetY, -0.86];
        base.position.set(...position);
        this.setDiff(base);
        scene.add(base);
      });
      const groups = [];
      const joints = [];
      // const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
      // joints[0] = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));
      // const geometry7 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 4, 4);
      // joints[7] = new THREE.Mesh(geometry7, new THREE.MeshPhongMaterial({ color: 0xffffff }));
      // scene.add(joints[0]);
      this.three.groups = groups;
      for (let i = 0; i < 7; i += 1) {
        groups[i] = new THREE.Group();
      }
      // groups[6].add(joints[7]);
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        const angles = this.control ? this.control : this.joints; // TODO
        groups[0].rotation.z = this.valueToRotation(angles[0] + 135);
        groups[1].rotation.x = -this.valueToRotation(angles[1]);
        groups[2].rotation.z = this.valueToRotation(angles[2]);
        groups[3].rotation.x = -this.valueToRotation(angles[3] + 90);
        groups[4].rotation.y = this.valueToRotation(angles[4]);
        groups[5].rotation.x = -this.valueToRotation(angles[5] - 90);
        groups[6].rotation.z = this.valueToRotation(angles[6]);
        // groups[this.select].rotation.set(this.state.test.jx, this.state.test.jy, this.state.test.jz);
        // base.position.set(this.state.test.x, this.state.test.y, this.state.test.z);
        // base.rotation.set(this.state.test.jx, this.state.test.jy, this.state.test.jz);
        // base.scale.set(this.state.test.scale, this.state.test.scale, this.state.test.scale);
        // if (groups[this.select]) {
        //   groups[this.select].position.set(this.state.test.x, this.state.test.y, this.state.test.z);
        // }
        // if (joints[this.select + 1]) {
        //   joints[this.select + 1].position.set(this.state.test.jx, this.state.test.jy, this.state.test.jz);
        // }
      };
      const loadModel = (index) => { // model index: 1-6
        if (index < 8) {
          loader.load(JOINT_MODEL_SRC[index], (geometry) => {
            console.log(index, 'model loaded:');
            joints[index] = new THREE.Mesh(geometry, materialList[index - 1]);
            joints[index].position.set(...JOINT_POSITION[index]);
            if (index < 7) {
              groups[index - 1].add(joints[index], groups[index]);
            }
            else {
              groups[index - 1].add(joints[index]);
            }
            groups[index - 1].position.set(...GROUP_POSITION[index - 1]);
            loadModel(index + 1); // load next model
          });
        }
        else {
          console.log('loading all');
          this.setDiff(groups[0]);
          groups[0].position.y += this.config.offsetY;
          scene.add(groups[0]);
          animate();
          loading.close(); // hide loading overlay
        }
      };
      loadModel(1);
      const gridplaneSize = 50;
      const gridstep = 30;
      // const gridcolor = 0xCCCCCC; // e27347
      const gridHelper_xy = new THREE.GridHelper(gridplaneSize, gridstep);
      gridHelper_xy.position.set(0, this.config.offsetY, 0);
      // gridHelper_xy.setColors(new THREE.Color(gridcolor), new THREE.Color(gridcolor));
      scene.add(gridHelper_xy);
      const axisHelper = new THREE.AxesHelper(5);
      axisHelper.position.y = this.config.offsetY;
      scene.add(axisHelper);
      // this.changeJoint(this.select);
      const onWindowResize = () => {
        const sizeArray = this.getRenderSize();
        renderer.setSize(...sizeArray);
        const halfSize = sizeArray.map(value => value / SCENE_ZOOM);
        camera.left = -halfSize[0];
        camera.right = halfSize[0];
        camera.top = halfSize[1];
        camera.bottom = -halfSize[1];
        // camera.aspect = this.getCameraAspect();
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onWindowResize, false);
    },
    getCameraAspect() {
      const ratio = this.size ? (this.size.width / this.size.height) : (0.8 / 0.45);
      return (window.innerWidth / window.innerHeight) * ratio;
    },
    getRenderSize() {
      const rootDiv = document.getElementById('model-wrapper');
      const height = rootDiv.clientWidth / this.getCameraAspect();
      return [rootDiv.clientWidth, height];
    },
    setDiff(mesh) {
      const STL_DIFF = {
        rotation: [-1.57, 0, 0],
        scale: [0.18, 0.18, 0.18],
      };
      mesh.rotation.set(...STL_DIFF.rotation);
      mesh.scale.set(...STL_DIFF.scale);
    },
    changeJoint(value) {
      this.state.test.jx = JOINT_POSITION[value + 1][0];
      this.state.test.jy = JOINT_POSITION[value + 1][1];
      this.state.test.jz = JOINT_POSITION[value + 1][2];
      this.state.test.x = GROUP_POSITION[value][0];
      this.state.test.y = GROUP_POSITION[value][1];
      this.state.test.z = GROUP_POSITION[value][2];
    },
    valueToRotation(value) {
      return (value * Math.PI) / 180;
    },
  },
    // testtest: {
    //   get() {
    //     return this.$store.state.robot.info.test;
    //   },
    //   set(value) {
    //     this.$store.commit('test', value);
    //   },
    // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;    
}
.hello-row {
  display: inline-block;
}
.block {
  width: 30%;
  padding: 0.2vw 1vw;
  display: inline-block;
}
span.text {
  display: block;
  float: left;
}
#emulator-overlay {
  position: absolute;
}
#emulator-container > *{
  border-radius: 8px;
}
</style>
