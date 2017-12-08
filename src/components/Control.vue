<template>
  <div class="main-wrapper" id="control-wrapper">
    <div class="motion-wrapper">
      <canvas id="canvas-move" data-score="0" width="600" height="600"></canvas>
      <el-slider v-model="position.z" vertical height="300px"></el-slider>
    </div>
    <div class="config-wrapper">
      <div class="block">
        <span class="text">speed</span>
        <el-slider v-model="state.speed"></el-slider>
      </div>
      <div class="block">
        <span class="text">acceleration</span>
        <el-slider v-model="state.acceleration"></el-slider>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce';
import robot from '../assets/lib/robot';

const DEFAULT_RADIAN = -(Math.PI / 2);
// const PI2 = Math.PI * 2;
const setRadius = 240;
const smallRadius = setRadius / 12;
const deadRadius = 60; // 60,110
const halfCircleLineWidth = 3;
export default {
  data() {
    return {
      radian: DEFAULT_RADIAN,
      move: {
        ctx: null,
        canvas: null,
        offset: null,
      },
      position: {
        x: 70,
        y: 70,
        z: 80,
      },
      state: {
        speed: 50,
        acceleration: 50,
      },
    };
  },
  mounted() {
    this.move.canvas = document.getElementById('canvas-move');
    this.move.ctx = this.move.canvas.getContext('2d');
    this.drawMoveRange();
    this.move.canvas.addEventListener('mousedown', this.onMouseDown);
    this.move.canvas.addEventListener('mouseup', this.removeMouseMove);
  },
  methods: {
    drawMoveRange() {
      this.move.ctx.save();
      this.move.ctx.clearRect(0, 0, this.move.canvas.width, this.move.canvas.height);
      this.move.ctx.translate(this.move.canvas.width / 2, this.move.canvas.height / 2);
      this.move.ctx.rotate(Math.PI);

      window.requestAnimationFrame(this.drawMoveRange); // real time change when let changes

      this.move.ctx.save(); // middle circle ticks
      this.move.ctx.fillStyle = '#3C3C3C'; // background
      this.move.ctx.beginPath();
      this.move.ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
      this.move.ctx.lineWidth = halfCircleLineWidth / 2;
      for (let i = 5; i > 0; i -= 1) {
        this.move.ctx.arc(0, 0, i * (setRadius / 5), 0, Math.PI * 2, false);
      }
      this.move.ctx.fill();
      this.move.ctx.stroke();
      this.move.ctx.restore();

      this.move.ctx.save(); // connect line
      this.move.ctx.beginPath();
      this.move.ctx.lineWidth = 4;
      this.move.ctx.strokeStyle = '#68C2FF';
      this.move.ctx.moveTo(this.position.x - 0, this.position.y - 0);
      this.move.ctx.lineTo(0, 0);
      this.move.ctx.stroke();
      this.move.ctx.rotate(Math.PI / 4);
      this.move.ctx.restore();

      this.move.ctx.save(); // angle ticks
      for (let i = 0; i < 8; i += 1) {
        this.move.ctx.beginPath();
        this.move.ctx.lineWidth = 2;
        this.move.ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
        this.move.ctx.moveTo(setRadius, 0);
        this.move.ctx.lineTo(0, 0);
        this.move.ctx.stroke();
        this.move.ctx.rotate(Math.PI / 4);
      }
      this.move.ctx.beginPath();
      this.move.ctx.restore(); // line bug fix

      this.move.ctx.save(); // aixs circle
      this.move.ctx.fillStyle = '#363636'; // half dark
      this.move.ctx.beginPath();
      this.move.ctx.strokeStyle = '#6c6c6c';
      this.move.ctx.lineWidth = 5;
      this.move.ctx.arc(0, 0, smallRadius, 0, 2 * Math.PI, false);
      // this.move.ctx.arc(0, 0, smallRadius/2, 0, 2*Math.PI, false);
      this.move.ctx.closePath();
      this.move.ctx.fill();
      this.move.ctx.stroke();
      this.move.ctx.restore();
      this.move.ctx.save(); // aixs circle 2
      this.move.ctx.fillStyle = '#363636'; // half dark
      this.move.ctx.beginPath();
      this.move.ctx.strokeStyle = '#6c6c6c';
      this.move.ctx.lineWidth = 10;
      this.move.ctx.arc(0, 0, smallRadius / 5, 0, 2 * Math.PI, false);
      // this.move.ctx.arc(0, 0, smallRadius/2, 0, 2*Math.PI, false);
      this.move.ctx.closePath();
      this.move.ctx.fill();
      this.move.ctx.stroke();
      this.move.ctx.restore();

      this.move.ctx.save(); // dragable
      this.move.ctx.fillStyle = '#3370d4'; // blue
      this.move.ctx.beginPath();
      this.move.ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
      this.move.ctx.lineWidth = 3;
      this.move.ctx.arc(this.position.x, this.position.y, 4 * (smallRadius / 5), 0, 2 * Math.PI, false);
      this.move.ctx.closePath();
      this.move.ctx.fill();
      this.move.ctx.stroke();
      this.move.ctx.beginPath(); // bug fix
      this.move.ctx.restore();
      this.move.ctx.stroke();
      this.move.ctx.restore();
    },
    onMouseDown(e) {
      const cursor = {
        x: -(e.clientX - this.move.canvas.getBoundingClientRect().left),
        y: -(e.clientY - this.move.canvas.getBoundingClientRect().top),
      };
      this.offset = {
        x: cursor.x - this.position.x,
        y: cursor.y - this.position.y,
      };
      this.move.canvas.addEventListener('mousemove', this.onMouseMove, false);
    },
    onMouseMove(e) {
      const mouse = {
        x: -(e.clientX - this.move.canvas.getBoundingClientRect().left),
        y: -(e.clientY - this.move.canvas.getBoundingClientRect().top),
      };
      const tempX = mouse.x - this.offset.x;
      const tempY = mouse.y - this.offset.y;
      const rangeTemp = Math.hypot(tempX, tempY);
      if (rangeTemp > deadRadius) {
        if (rangeTemp < (setRadius + 2)) { // real time show on right side panel
          this.position.y = tempY;
          this.position.x = tempX;
        }
        else if (Math.abs(tempX) < (setRadius + 2) || Math.abs(tempY) < (setRadius + 2)) { // only one strategy
          const signY = tempY > 0 ? 1 : -1;
          const signX = tempX > 0 ? 1 : -1;
          if (Math.abs(tempX) >= setRadius + 2) {
            this.position.x = setRadius * signX;
          }
          else {
            this.position.x = tempX;
          }
          this.position.y = signY * Math.sqrt((setRadius ** 2) - (this.position.x ** 2));
        }
      }
    },
    removeMouseMove() {
      this.move.canvas.removeEventListener('mousemove', this.onMouseMove);
    },
    setPosition: debounce(function sendposition() {
      const zoom = 2.5;
      robot.setPosition({
        x: -1 * this.position.x * zoom,
        y: this.position.y * zoom,
        z: this.position.z,
        wait: false,
        // speed: this.realSpeed,d
        // acceleration: this.acceleration,
      });
      console.log(this.position.x, this.position.y);
    }, 100),
  },
  beforeDestroy() {
    this.move.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.move.canvas.removeEventListener('mouseup', this.removeMouseMove);
  },
  watch: {
    'position.x': function x() {
      this.setPosition();
    },
    'position.y': function y() {
      this.setPosition();
    },
    'position.z': function z() {
      this.setPosition();
    },
  },
};
</script>
<style scoped lang="scss">
#control-wrapper {
  background: radial-gradient(ellipse farthest-corner, #444, #3A3A3A, #313131, #2B2B2B);
  .motion-wrapper{
    display: inline-flex;
    align-items: center;
  }
  .config-wrapper{
    .block {
      span{
        width: 20%;
      }
      display: flex;
      align-items: center;
      .el-slider {
        width: 70%;
      }
    }
  }
}
#canvas-move:hover {
  cursor: move;
}
a, .text {
  color: white;
}
</style>


