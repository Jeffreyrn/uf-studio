<!-- 传递参数control（数组，index: 0-6）, 离线模式下控制机械臂, <keep-alive> 
     默认高度为窗口宽度的52%
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
          <!-- <input v-model="testtest"/> -->
        <!-- <span v-for="j in 7" :key="j" class="text">#{{j-1}}:{{joints[j-1]}}</span> -->
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
import OrbitControls from 'three-orbitcontrols';
import baseg from '../../lib/threeJSLoader'

// import * as types from '../../store/mutation-types';
THREE.Cache.enabled = true;

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
const SCENE_ZOOM = 50; // 64

export default {
  name: 'XarmModel',
  props: ['control', 'size'],
  watch: {
    control(newValue) {
      console.log('watch posi print:');
      console.table(newValue);
    },
    size(newValue) {
      const sizeArray = this.getRenderSize()
      console.log('watch new size', newValue, sizeArray)
      if (this.three.renderer) {
        this.three.renderer.setSize(...sizeArray)
      }
      if (this.three.camera) {
        const halfSize = sizeArray.map(value => value / SCENE_ZOOM);
        this.three.camera.left = -halfSize[0];
        this.three.camera.right = halfSize[0];
        this.three.camera.top = halfSize[1];
        this.three.camera.bottom = -halfSize[1];
        // camera.aspect = this.getCameraAspect();
        this.three.camera.updateProjectionMatrix();
      }
    },
    shouldLoad() {
      this.createRobotModel()
    },
    // robotJointsAngle() {
    //   this.$set(this.robotJointsAngle, 0, this.robotJointsAngle[0]);
    // },
  },
  computed: {
    shouldLoad() {
      return this.$store.state.geometry.preloaded
    },
    joints: {
      get() {
        const arr = this.$store.getters.joints;
        // console.log('get ax', arr);
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
      resizeTick: true,
      test: null,
      testtest: 0,
      config: {
        debugMax: 200,
        debugMin: -300,
        jointMax: 180,
        jointMin: -180,
        step: 0.1,
        offsetY: -5,
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
        render: null,
        camera: null,
      },
      loading: null,
    };
  },
  mounted() {
    if (this.shouldLoad) {
      this.createRobotModel();
    }
  },
  // activated() {
  //   const sizeArray = this.getRenderSize();
  //   this.three.renderer.setSize(...sizeArray);
  // },
  beforeDestroy() {
    if (this.three.scene) {
      this.three.scene.remove();
      this.three.scene.remove(this.three.groups[0]);
    }
    window.removeEventListener('resize', this.onWindowResize, false)
    // this.three.scene.remove(this.three.groups[0]);
  },
  activated() {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize, false)
  },
  deactivated() {
    window.removeEventListener('resize', this.onWindowResize, false)
  },
  methods: {
    createRobotModel() {
      // this.loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)',
      // });
      // console.log(materialList);
      const scene = new THREE.Scene();
      // console.log(this.three.scene, scene);
      scene.background = new THREE.Color(0xffffff); // c0c0c0
      // const camera = new THREE.PerspectiveCamera(105, this.getCameraAspect(), 0.1, 1000);
      const sizeArray = this.getRenderSize();
      console.log('get size', sizeArray)
      const halfSize = sizeArray.map(value => value / SCENE_ZOOM);
      const camera = new THREE.OrthographicCamera(-halfSize[0], halfSize[0], halfSize[1], -halfSize[1], -50, 50);
      this.three.camera = camera
      // camera.position.z = -50;
      // camera.up = new THREE.Vector3(-1, -1, -1);
      camera.position.set(3, 1, 3); // camera position
      camera.lookAt(scene.position); // camera look at
      const light = new THREE.PointLight(0xffffff, 1, 100); // light
      light.position.set(5, 14, 20);
      const lightBottomBack = new THREE.PointLight(0xffffff, 1, 100); // light
      const lightBottomFront = new THREE.PointLight(0xeeeeee, 1, 100); // light
      lightBottomBack.position.set(-12, 0, 0);
      lightBottomFront.position.set(22, 0, -10);
      scene.add(lightBottomBack);
      scene.add(lightBottomFront);
      scene.add(light);
      // camera.position.set(25, 25, 25);
      const renderer = new THREE.WebGLRenderer();
      this.three.renderer = renderer
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enablePan = false; // disable keyboard camera control
      controls.update();
      // renderer.setSize(...sizeArray);
      document.getElementById('emulator-container').appendChild(renderer.domElement);
      // new THREE.CylinderGeometry(0.5, 0.5, 2, 4, 4);
      // load first model
      const base = baseg.geometryList[0]
      // base = new THREE.Mesh(baseg.geometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
      window.setTimeout(() => {
        const position = [7.66, 0.04 + this.config.offsetY, -0.86];
        base.position.set(...position);
        this.setDiff(base);
        scene.add(base)
      }, 0)
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
      const addMesh = (index, geometry) => {
        return new Promise((resolve) => {
          // joints[index] = new THREE.Mesh(geometry, materialList[index - 1]);
          joints[index] = geometry;
          joints[index].position.set(...JOINT_POSITION[index]);
          if (index < 7) {
            groups[index - 1].add(joints[index], groups[index]);
          }
          else {
            groups[index - 1].add(joints[index]);
          }
          groups[index - 1].position.set(...GROUP_POSITION[index - 1]);
          resolve()
        })
      }
      const loadModel = (index) => { // model index: 1-6
        // return new Promise((resolve) => {

        // })
        if (index < 8) {
          addMesh(index, baseg.geometryList[index])
          window.setTimeout(() => {
            console.log(`NO.${index} mesh loaded.`, baseg.geometryList[index]);
            // const mesh = new THREE.Mesh(baseg.geometryList[index], materialList[index - 1]);
            loadModel(index + 1); // load next model
          }, 0)
        }
        else {
          console.log('loading all');
          this.setDiff(groups[0]);
          groups[0].position.y += this.config.offsetY;
          // window.GlobalUtil.xarm = groups[0];
          scene.add(groups[0]);
          animate();
          renderer.render(scene, camera);
          // this.loading.close(); // hide loading overlay
        }
      };
      loadModel(1);
      const gridplaneSize = 50;
      const gridstep = 30;
      const gridcolor = 0xdddddd; // e27347
      const gridHelper_xy = new THREE.GridHelper(gridplaneSize, gridstep, gridcolor, gridcolor);
      gridHelper_xy.position.set(0, this.config.offsetY, 0);
      // gridHelper_xy.setColors(new THREE.Color(gridcolor), new THREE.Color(gridcolor));
      scene.add(gridHelper_xy);
      const axisHelper = new THREE.AxesHelper(5);
      axisHelper.position.y = this.config.offsetY;
      scene.add(axisHelper);
      // this.changeJoint(this.select);
      this.onWindowResize()
      window.addEventListener('resize', this.onWindowResize, false)
    },
    onWindowResize() {
      if (this.resizeTick) {
        requestAnimationFrame(this.updateWindow)
        this.resizeTick = false
      }
    },
    updateWindow() {
      const sizeArray = this.getRenderSize();
      this.three.renderer.setSize(...sizeArray);
      const halfSize = sizeArray.map(value => value / SCENE_ZOOM);
      this.three.camera.left = -halfSize[0];
      this.three.camera.right = halfSize[0];
      this.three.camera.top = halfSize[1];
      this.three.camera.bottom = -halfSize[1];
      // camera.aspect = this.getCameraAspect();
      this.three.camera.updateProjectionMatrix();
      this.resizeTick = true
    },
    // getCameraAspect() {
    //   if (this.size) {
    //     return (window.innerWidth / window.innerHeight) * (this.size.width / this.size.height);
    //   }
    //   return 1 / 0.52; // default
    // },
    getRenderSize() {
      const rootDiv = document.getElementById('model-wrapper');
      let height;
      console.log('size', this.size, rootDiv.clientHeight, rootDiv.clientWidth)
      if (this.size) {
        height = this.size;
      }
      else {
        height = rootDiv.clientHeight; // rootDiv.clientWidth * 0.52;
      }
      // const height = rootDiv.clientWidth / this.getCameraAspect();
      // const height = rootDiv.clientWidth * 0.52;
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
  height: 100%;    
}
.hello-row {
  display: inline-block;
  height: 100%;
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
#model-wrapper {
  box-shadow: 0 0 6px 0 rgba(205,205,205,0.50);
}
</style>
