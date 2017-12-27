<template>
  <div class="hello">
    <h1>{{ msg }}<img src="../assets/img/xarm-model.png" width="100"/></h1>
    <div class="block" v-for="j in 7" :key="j">
      <span class="text">J{{j}}:{{state.joint[j]}}</span>
      <el-slider v-model="state.joint[j]"></el-slider>
    </div>
    <br>
    <div class="block">
      <span class="text">J</span>
      <el-slider v-model="state.rott"></el-slider>
    </div>
    <div class="block">
      <span class="text">X</span>
      <el-slider v-model="state.test.x" :step="0.1"></el-slider>
    </div>
    <div class="block">
      <span class="text">Y</span>
      <el-slider v-model="state.test.y" :step="0.1"></el-slider>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'HelloWorld',
  data() {
    return {
      state: {
        joint: {
          1: 0,
          2: 0,
          3: 5,
          4: 56,
          5: 5,
          6: 5,
          7: 5,
        },
        rott: 5,
        test: {
          x: 0,
          y: 0,
        },
      },
      msg: 'Emulator',
    };
  },
  mounted() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeee);
    const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 8;
    camera.up = new THREE.Vector3(-1, -1, -1);
    camera.position.set(5, 7, 5); // 设置相机位置
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // 让相机指向原点
    // camera.position.set(25, 25, 25);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // new THREE.CylinderGeometry(0.5, 0.5, 2, 4, 4);
    const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint1 = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ color: 0x4B0082 }));

    const geometry2 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color: 0xFF7F00 }));

    const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint3 = new THREE.Mesh(geometry3, new THREE.MeshBasicMaterial({ color: 0x0000FF }));
    const geometry4 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint4 = new THREE.Mesh(geometry4, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    const geometry5 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint5 = new THREE.Mesh(geometry5, new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    const geometry6 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint6 = new THREE.Mesh(geometry6, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    const geometry7 = new THREE.CylinderGeometry(0.3, 0.3, 1, 4, 4);
    const joint7 = new THREE.Mesh(geometry7, new THREE.MeshBasicMaterial({ color: 0x9400d3 }));
    const geometry8 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 4, 4);
    const joint8 = new THREE.Mesh(geometry8, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    // joint2.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), 0.075);
    joint2.position.set(0, 1, 0);
    joint3.position.set(0, 0.5, 0);
    joint4.position.set(0, 0, 0);
    joint5.position.set(0, 1, 0);
    joint6.position.set(0, 0.5, 0); // green
    joint7.position.set(0, 0.5, 0);
    joint8.position.set(0, 1.25, 0);
    const group6 = new THREE.Group();
    const group5 = new THREE.Group();
    const group4 = new THREE.Group();
    const group3 = new THREE.Group();
    const group2 = new THREE.Group();
    const group1 = new THREE.Group();
    group6.position.y = 1; // purple
    group5.position.y = 1.5; // green
    group4.position.y = 0; // yellow
    group4.position.x = 0.5; // yellow
    group4.position.z = -0.5; // yellow
    group4.rotation.x = 0.5; // yellow
    group6.add(joint7, joint8);
    group5.add(joint6, group6);
    group4.add(joint5, group5);
    group3.add(joint4, group4);
    group3.position.y = 1.5;
    group3.position.x = -0.5;
    group2.add(joint3, group3);
    group2.position.y = 1.5;
    group2.position.x = 0.5;
    group1.add(joint2, group2);
    scene.add(joint1);
    scene.add(group1);
    const gridplaneSize = 20;
    const gridstep = 10;
    // const gridcolor = 0xCCCCCC;
    const gridHelper_xy = new THREE.GridHelper(gridplaneSize / 2, gridstep);
    gridHelper_xy.position.set(0, 0, 0);
    // gridHelper_xy.setColors(new THREE.Color(gridcolor), new THREE.Color(gridcolor));
    scene.add(gridHelper_xy);
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      group1.rotation.y = (0.1 * this.state.joint[1]);
      group2.rotation.x = (0.1 * this.state.joint[2]);
      group3.rotation.y = (0.1 * this.state.joint[3]);
      group4.rotation.x = (0.1 * this.state.joint[4]);
      group5.rotation.y = (0.1 * this.state.joint[5]);
      group6.rotation.x = (0.1 * this.state.joint[6]);
      joint8.rotation.y = (0.1 * this.state.joint[7]);
      // joint4.position.x = this.state.test.x;
      // joint4.position.y = this.state.test.y;
    };
    animate();
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
}
.block {
  width: 200px;
  padding: 2vw;
}
</style>
