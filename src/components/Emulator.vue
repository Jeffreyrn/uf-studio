<template>
  <div class="hello">
    <div class="hello-row">
      <div class="block" v-for="j in 7" :key="j">
        <span class="text">J{{j}}:{{state.joint[j]}}</span>
        <el-slider v-model="state.joint[j]"></el-slider>
      </div>
    </div>
    <div class="hello-row">
      <img src="../assets/img/xarm-model.png" width="100" height="100"/>
      <div>{{ msg }}-debug</div>
      <div class="block">
        <span class="text">Group-X</span>
        <el-slider v-model="state.test.x" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
      <div class="block">
        <span class="text">Group-Y</span>
        <el-slider v-model="state.test.y" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
      <div class="block">
        <span class="text">Group-Z</span>
        <el-slider v-model="state.test.z" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-X</span>
        <el-slider v-model="state.test.x" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-Y</span>
        <el-slider v-model="state.test.y" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
      <div class="block">
        <span class="text">Joint-Z</span>
        <el-slider v-model="state.test.z" :step="0.1" :max="config.debugMax" :min="config.debugMin"></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
// import threeD1 from '../assets/three-d/1.json';

export default {
  name: 'HelloWorld',
  data() {
    return {
      config: {
        debugMax: 10,
        debugMin: -10,
      },
      state: {
        joint: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
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
      },
    };
  },
  mounted() {
    const RAINBOW_COLOR_LIST = [0x4B0082, 0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x9400D3];
    const materialList = [];
    RAINBOW_COLOR_LIST.forEach((hex) => {
      materialList.push(new THREE.MeshPhongMaterial({ color: hex }));
    });
    console.log(materialList);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc0c0c0);
    const camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 8;
    camera.up = new THREE.Vector3(-1, -1, -1);
    camera.position.set(5, 7, 5); // 设置相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点
    // light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    scene.add(light);
    // camera.position.set(25, 25, 25);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // new THREE.CylinderGeometry(0.5, 0.5, 2, 4, 4);
    const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joints = [];
    joints[1] = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));
    const loader = new THREE.JSONLoader();
    loader.load('../src/assets/three-d/1.json', (geometry) => {
      const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        vertexColors: THREE.FaceColors,
        morphTargets: true,
      }));
      scene.add(mesh);
      // obj.position.set(0, 2, 0);
      // scene.add(obj);
    });
    // const geometry2 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // const joints[2] = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color: 0xFF7F00 }));

    // const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // const joints[3] = new THREE.Mesh(geometry3, new THREE.MeshBasicMaterial({ color: 0x0000FF }));
    // const geometry4 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // const joints[4] = new THREE.Mesh(geometry4, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    // const geometry5 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // joints[5] = new THREE.Mesh(geometry5, new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    // const geometry6 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // joints[6] = new THREE.Mesh(geometry6, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // const geometry7 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    // joints[7] = new THREE.Mesh(geometry7, new THREE.MeshBasicMaterial({ color: 0x9400d3 }));
    const geometry8 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 4, 4);
    joints[8] = new THREE.Mesh(geometry8, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    // joints[2].rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), 0.075);
    // joints[5].position.set(0, 1, 0);
    // joints[6].position.set(0, 0.5, 0); // green
    // joints[7].position.set(0, 0.5, 0);
    // joints[8].position.set(0, 1.25, 0);
    const groups = [];
    for (let i = 0; i < 6; i += 1) {
      groups[i] = new THREE.Group();
    }
    // groups[5].position.y = 1; // purple
    // groups[4].position.y = 1.5; // green
    // groups[3].position.y = 0; // yellow
    // groups[3].position.x = 0.5; // yellow
    // groups[3].position.z = -0.5; // yellow
    // groups[3].rotation.x = 0.5; // yellow
    // groups[2].position.y = 1.5;
    // groups[2].position.x = -0.5;
    scene.add(joints[1]);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      groups[0].rotation.y = (0.1 * this.state.joint[1]);
      groups[1].rotation.z = (0.1 * this.state.joint[2]);
      groups[2].rotation.y = (0.1 * this.state.joint[3]);
      groups[3].rotation.z = (0.1 * this.state.joint[4]);
      groups[4].rotation.y = (0.1 * this.state.joint[5]);
      groups[5].rotation.x = (0.1 * this.state.joint[6]);
      joints[8].rotation.y = (0.1 * this.state.joint[7]);
      // joints[4].position.x = this.state.test.x;
      // joints[4].position.y = this.state.test.y;
    };
    loader.load('../src/assets/three-d/2.json', (geometry) => {
      joints[2] = new THREE.Mesh(geometry, materialList[0]);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[0].add(joints[2], groups[1]);
      scene.add(groups[0]);
    });

    loader.load('../src/assets/three-d/3.json', (geometry) => {
      joints[3] = new THREE.Mesh(geometry, materialList[1]);
      joints[3].position.set(0, -3.2, 0);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[1].add(joints[3], groups[2]);
      groups[1].position.y = 3.2;
    });
    loader.load('../src/assets/three-d/4.json', (geometry) => {
      joints[4] = new THREE.Mesh(geometry, materialList[2]);
      joints[4].position.set(0, 0, 0);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[2].add(joints[4], groups[3]);
      groups[2].position.y = -3.2;
    });
    loader.load('../src/assets/three-d/5.json', (geometry) => {
      joints[5] = new THREE.Mesh(geometry, materialList[3]);
      joints[5].position.set(0, -6.5, 0);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[3].add(joints[5], groups[4]);
      groups[3].position.y = 6.5;
      groups[3].position.x = 0;
    });
    loader.load('../src/assets/three-d/6.json', (geometry) => {
      joints[6] = new THREE.Mesh(geometry, materialList[4]);
      joints[6].position.set(0, 0, 0);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[4].add(joints[6], groups[5]);
      groups[4].position.y = 3.2;
    });
    loader.load('../src/assets/three-d/7.json', (geometry) => {
      joints[7] = new THREE.Mesh(geometry, materialList[5]);
      joints[7].position.set(0, 0, 0);
      // joints[2].position.set(1, 1, 0);
      // joints[2].position.set(0, 0, 0);
      groups[5].add(joints[7], joints[8]);
      groups[5].position.y = 3.2;
      animate();
    });
    const gridplaneSize = 20;
    const gridstep = 10;
    // const gridcolor = 0xCCCCCC;
    const gridHelper_xy = new THREE.GridHelper(gridplaneSize / 2, gridstep);
    gridHelper_xy.position.set(0, 0, 0);
    // gridHelper_xy.setColors(new THREE.Color(gridcolor), new THREE.Color(gridcolor));
    scene.add(gridHelper_xy);
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
}
.hello-row {
  display: flex;
}
.block {
  width: 200px;
  padding: 2vw;
}
</style>
