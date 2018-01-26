<!-- 传递参数control（数组，index: 0-6）, 离线模式下控制机械臂, <keep-alive> -->
<template>
  <div class="hello">
    <div class="hello-row">
      <div class="block" v-for="j in 7" :key="j">
        <span class="text">J{{j-1}}:{{joints[j-1]}}</span>
        <!-- <el-slider v-model="joints[j-1]" :step="config.step" :max="config.jointMax" :min="config.jointMin"></el-slider> -->
      </div>
      <div id="emulator-container"></div>
    </div>
    <!-- 
    <div class="block">{{ msg }}-debugTest-{{joints}}</div>
    step<input v-model="config.step"/>>
    <div class="block">
      <el-select v-model="select" placeholder="Select" @change="changeJoint">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="hello-row">
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
    </div> -->
  </div>
</template>

<script>
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
// import * as types from '../../store/mutation-types';

const JOINT_POSITION = [
  null,
  [-0.2, 0, -0.1],
  [-0.2, -3.1, -0.1],
  [-0.15, 0, -0.1],
  [0.45, -6.48, 0],
  [0, -7.35, -0.02],
  [4.17, -7.35, 0],
];
const GROUP_POSITION = [
  [0.2, 0, 0.1],
  [0, 3.1, -0.1],
  [-0.05, -3.2, 0],
  [-0.59, 6.48, -0.12],
  [0.45, 0.86, 0.02],
  [-4.17, 0, -0.05],
];
export default {
  name: 'xarm-model',
  props: ['control'],
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
          console.log('arr posi print:', values.length);
          console.table(values);
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
        debugMax: 10,
        debugMin: -10,
        jointMax: 180,
        jointMin: -180,
        step: 0.01,
      },
      options: [0, 1, 2, 3, 4, 5, 6, 7],
      select: 5,
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
    }
    // this.three.scene.remove(this.three.groups[0]);
    if (this.three.groups) {
      this.three.groups.forEach((group) => {
        group.dispose();
      });
    }
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
      const MODEL_DIR = '../../src/assets/three-d/';
      const JOINT_MODEL_SRC = [
        `${MODEL_DIR}1.json`,
        `${MODEL_DIR}2.json`,
        `${MODEL_DIR}3.json`,
        `${MODEL_DIR}4.json`,
        `${MODEL_DIR}5.json`,
        `${MODEL_DIR}6.json`,
        `${MODEL_DIR}7.json`,
      ];
      const materialList = [];
      RAINBOW_COLOR_LIST.forEach((hex) => {
        materialList.push(new THREE.MeshPhongMaterial({ color: hex }));
      });
      console.log(materialList);
      const scene = new THREE.Scene();
      console.log(this.three.scene, scene);
      scene.background = new THREE.Color(0xc0c0c0);
      const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
      // camera.position.z = 8;
      // camera.up = new THREE.Vector3(-1, -1, -1);
      camera.position.set(5, 8, 5); // camera position
      camera.lookAt(new THREE.Vector3(0, 0, 0)); // camera look at
      const light = new THREE.PointLight(0xffffff, 1, 100); // light
      light.position.set(7, 10, 7);
      const lightBottom = new THREE.PointLight(0xffffff, 1, 100); // light
      lightBottom.position.set(-7, 0, -7);
      scene.add(lightBottom);
      scene.add(light);
      // camera.position.set(25, 25, 25);
      const renderer = new THREE.WebGLRenderer();
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.update();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('emulator-container').appendChild(renderer.domElement);
      // new THREE.CylinderGeometry(0.5, 0.5, 2, 4, 4);
      const joints = [];
      const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
      joints[0] = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));
      const geometry7 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 4, 4);
      joints[7] = new THREE.Mesh(geometry7, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      scene.add(joints[0]);
      const loader = new THREE.JSONLoader();
      loader.load(JOINT_MODEL_SRC[0], (geometry) => {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
          vertexColors: THREE.FaceColors,
          morphTargets: true,
        }));
        scene.add(mesh);
      });
      const groups = [];
      // this.three.groups = groups;
      for (let i = 0; i < 7; i += 1) {
        groups[i] = new THREE.Group();
      }
      groups[6].add(joints[7]);
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        // if (this.state.online) {
        //   for (let i = 0; i < 7; i += 1) {
        //     this.$set(this.state.joint, i, GlobalUtil.model.robot.info.axis[i]);
        //   }
        // }
        const angles = this.online ? this.joints : this.control;
        groups[0].rotation.y = this.valueToRotation(angles[0]);
        groups[1].rotation.z = this.valueToRotation(angles[1]);
        groups[2].rotation.y = this.valueToRotation(angles[2]);
        groups[3].rotation.z = this.valueToRotation(angles[3]);
        groups[4].rotation.x = this.valueToRotation(angles[4]);
        groups[5].rotation.z = this.valueToRotation(angles[5]);
        joints[7].rotation.y = this.valueToRotation(angles[6]);
        // groups[this.select].position.set(this.state.test.x, this.state.test.y, this.state.test.z);
        // if (joints[this.select + 1]) {
        //   joints[this.select + 1].position.set(this.state.test.jx, this.state.test.jy, this.state.test.jz);
        // }
      };
      function loadModel(index) { // model index: 1-6
        if (index < 7) {
          loader.load(JOINT_MODEL_SRC[index], (geometry) => {
            console.log(index, 'model loaded:');
            joints[index] = new THREE.Mesh(geometry, materialList[index - 1]);
            joints[index].position.set(...JOINT_POSITION[index]);
            groups[index - 1].add(joints[index], groups[index]);
            groups[index - 1].position.set(...GROUP_POSITION[index - 1]);
            loadModel(index + 1); // load next model
          });
        }
        else {
          console.log('loading all');
          scene.add(groups[0]);
          animate();
          loading.close(); // hide loading overlay
        }
      }
      loadModel(1);
      const gridplaneSize = 20;
      const gridstep = 10;
      // const gridcolor = 0xCCCCCC;
      const gridHelper_xy = new THREE.GridHelper(gridplaneSize / 2, gridstep);
      gridHelper_xy.position.set(0, 0, 0);
      // gridHelper_xy.setColors(new THREE.Color(gridcolor), new THREE.Color(gridcolor));
      scene.add(gridHelper_xy);
      const axisHelper = new THREE.AxesHelper(5);
      scene.add(axisHelper);
      // this.changeJoint(this.select);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener('resize', onWindowResize, false);
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
</style>
