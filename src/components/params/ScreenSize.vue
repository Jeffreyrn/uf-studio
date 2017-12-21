<template lang="html">
    <div class="app-container">

      <div>
        屏幕分辨率:
      </div>
      <div>
        screen.width: {{ screen_width }}
      </div>
      <div>
        screen.height: {{ screen_height }}
      </div>
      <div>
        屏幕可用:
      </div>
      <div>
        screen.availWidth: {{ screen_avail_width }}
      </div>
      <div>
        screen.availHeight: {{ screen_avail_height }}
      </div>

      <div>
        网页可见区域:
      </div>
      <div>
        window.screen.width: {{ body_client_width }}
      </div>
      <div>
        window.screen.height: {{ body_client_height }}
      </div>

      <div>
        屏幕可用工作区:
      </div>
      <div>
        window.screen.availWidth: {{ screen_avail_width }}
      </div>
      <div>
        window.screen.availHeight: {{ screen_avail_height }}
      </div>

    </div>
</template>
<script>
console.log('Rounter = Screen');

// var html = document.getElementById("index-page");
// console.log("html = " + html.innerHTML);

export default {
  data() {
    return {
      model: GlobalUtil.model,
      screen_width: 0,
      screen_height: 0,
      screen_avail_width: 0,
      screen_avail_height: 0,
      body_client_width: 0,
      body_client_height: 0,
    };
  },
  mounted() {
    this.screen_width = screen.width;
    this.screen_height = screen.height;
    this.screen_avail_width = screen.availWidth;
    this.screen_avail_height = screen.availHeight;
    this.body_client_width = document.body.clientWidth;
    this.body_client_height = document.body.clientHeight;
  },
  methods: {
  },
  beforeDestroy() {
  },
  components: {
  },
  computed: {
  },
};

</script>
<style lang="scss" scoped>
.container-background {

}
.change-btn {
  height: 30px;
}
.change-btn-background {
  background-color: yellow;
}
</style>
