<template>
  <div class="paint-bottom">

    <div class="icon-btn" @click="removeAll()">
      <div class="size undo" alt="Undo">
        <div class="icon-text">Undo</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size redo" alt="Redo">
        <div class="icon-text">Redo</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size text" alt="Text">
        <div class="icon-text">Text</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size image" alt="Image">
        <div class="icon-text">Image</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size copy" alt="Copy">
        <div class="icon-text">Copy</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size add" alt="Add">
        <div class="icon-text">Add</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size delete" alt="Delete">
        <div class="icon-text">Delete</div>
      </div>
    </div>

    <div class="icon-btn" @click="removeAll()">
      <div class="size clear" alt="Clear">
        <div class="icon-text">Clear</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: [''],
  name: 'bottom-tools',
  data() {
    return {
    };
  },
  mounted() {
  },
  activated: function() {
  },
  methods: {
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
  left:0;
  right:0;
  bottom:0;
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
    margin-top: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: top;
  }
  .icon-text {
    color: white;
    padding-top: 25px;
    padding-left: 12px;
    font-family: Gotham-Book;
    font-size: 10px;
    color: #787878;
    letter-spacing: -0.8px;
    // text-align: center;
  }
  .undo {
    background-image: url('./../../assets/img/paint/tool-undo.svg');
  }
  .redo {
    background-image: url('./../../assets/img/paint/tool-redo.svg');
  }
  .text {
    background-image: url('./../../assets/img/paint/tool-text.svg');
  }
  .image {
    background-image: url('./../../assets/img/paint/tool-image.svg');
  }
  .copy {
    background-image: url('./../../assets/img/paint/tool-copy.svg');
  }
  .add {
    background-image: url('./../../assets/img/paint/tool-copy.svg');
  }
  .delete {
    background-image: url('./../../assets/img/paint/tool-delete.svg');
  }
  .clear {
    background-image: url('./../../assets/img/paint/tool-clear.svg');
  }
}

</style>