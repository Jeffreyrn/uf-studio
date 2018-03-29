<template>
  <div class="paint-bottom">

    <div class="icon-btn" @click='onundo'>
      <div class="size undo" alt="Undo">
        <div class="icon-text">Undo</div>
      </div>
    </div>

    <div class="icon-btn" @click="onredo">
      <div class="size redo" alt="Redo">
        <div class="icon-text">Redo</div>
      </div>
    </div>

    <div class="icon-btn" @click="ontext">
      <div class="size text" alt="Text">
        <div class="icon-text">Text</div>
      </div>
    </div>

    <div class="icon-btn" @click="onimage">
      <div class="size image" alt="Image">
        <div class="icon-text">Image</div>
      </div>
    </div>

    <div class="icon-btn" @click="oncopy">
      <div class="size copy" alt="Copy">
        <div class="icon-text">Copy</div>
      </div>
    </div>

    <div class="icon-btn" @click="onadd">
      <div class="size add" alt="Add">
        <div class="icon-text">Add</div>
      </div>
    </div>

    <div class="icon-btn" @click="ondelete">
      <div class="size delete" alt="Delete">
        <div class="icon-text">Delete</div>
      </div>
    </div>

    <div class="icon-btn" @click="onremoveall">
      <div class="size clear" alt="Clear">
        <div class="icon-text">Clear</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: ['onimage', 'onadd', 'ontext', 'ondelete', 'oncopy', 'onundo', 'onredo', 'onremoveall'],
  name: 'bottom-tools',
  data() {
    return {
      model: window.GlobalUtil.model,
    };
  },
  mounted() {
  },
  activated: function() {
  },
  methods: {
    // onremoveall() {
    //   console.log('onremoveall onremoveall onremoveall');
    // },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
  },
  components: {
  },
};
</script>
<style scoped lang="scss">
.paint-bottom {
  position:absolute;
  width:621px;
  height:63px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin:auto;
  border: 1px solid #D8D8D8;
  // background:lightgreen;
}
.icon-btn {
  border: 0;
  // background: yellow;
  width: 45px;
  height: 100%;
  margin-left: 28px;
  float: left;
  cursor: pointer;
  .size {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: top;
  }
  .icon-text {
    position: absolute;
    color: white;
    top: 42px;
    padding-left: 12px;
    font-family: 'Gotham-Book';
    font-size: 10px;
    color: #787878;
    letter-spacing: -0.8px;
    // text-align: center;
  }
  .undo {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-undo.svg');
  }
  .redo {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-redo.svg');
  }
  .text {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-text.svg');
  }
  .image {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-image.svg');
  }
  .copy {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-copy.svg');
  }
  .add {
    margin-top: 10px;
    background-image: url('./../../assets/img/paint/icon_addsticker.svg');
  }
  .delete {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-delete.svg');
  }
  .clear {
    margin-top: 15px;
    background-image: url('./../../assets/img/paint/tool-clear.svg');
  }
}

</style>