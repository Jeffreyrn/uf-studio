<template>
  <div
    class="el-tree-node noselected"
    @click.stop="handleClick"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
  >
    <div class="el-tree-node__content"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <span
        v-if="node.label.indexOf('.py')>=0"
        class="py-icon"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <span
        v-if="node.label.indexOf('.txt')>=0||node.label.indexOf('.md')>=0"
        class="txt-icon"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>      
      <span
        v-if="node.label.indexOf('.')<0 && !expanded"
        class="icon-folder"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <span
        v-if="node.label.indexOf('.')<0 && expanded"
        class="icon-folder-open"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <!-- <span
        v-if="node.label.indexOf('.')<0"
        class="el-tree-node__expand-icon el-icon-caret-right icon-folder2"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span> -->
      <!-- <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      >
      </el-checkbox> -->
      <!-- <span
        v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading">
      </span> -->
      <node-content :node="node" class="label-font" style="padding-left:5px;"></node-content>
    </div>
    <!-- <el-collapse-transition>
      <div
        class="el-tree-node__children"
        v-if="childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <el-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </el-tree-node>
      </div>
    </el-collapse-transition> -->
      <div
        class="el-tree-node__children"
        v-if="childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <el-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </el-tree-node>
      </div>
  </div>
</template>

<script type="text/jsx">
  import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
  import ElCheckbox from 'element-ui/packages/checkbox';
  import emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElTreeNode',

    componentName: 'ElTreeNode',

    mixins: [emitter],

    props: {
      node: {
        default() {
          return {};
        }
      },
      props: {},
      renderContent: Function
    },

    components: {
      ElCollapseTransition,
      ElCheckbox,
      NodeContent: {
        props: {
          node: {
            required: true
          }
        },
        render(h) {
          const parent = this.$parent;
          const node = this.node;
          const data = node.data;
          const store = node.store;
          return (
            parent.renderContent
              ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node, data, store })
              : <span class="el-tree-node__label">{ this.node.label }</span>
          );
        }
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        showCheckbox: false,
        oldChecked: null,
        oldIndeterminate: null
      };
    },

    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val);
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate);
      },

      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
        if (val) {
          this.childNodeRendered = true;
        }
      }
    },

    methods: {
      getNodeKey(node, index) {
        const nodeKey = this.tree.nodeKey;
        if (nodeKey && node) {
          return node.data[nodeKey];
        }
        return index;
      },

      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('check-change', this.node.data, checked, indeterminate);
        }
        this.oldChecked = checked;
        this.indeterminate = indeterminate;
      },

      handleClick() {
        const store = this.tree.store;
        store.setCurrentNode(this.node);
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
        this.tree.currentNode = this;
        if (this.tree.expandOnClickNode) {
          this.handleExpandIconClick();
        }
        this.tree.$emit('node-click', this.node.data, this.node, this);
      },

      handleExpandIconClick() {
        if (this.node.isLeaf) return;
        if (this.expanded) {
          this.tree.$emit('node-collapse', this.node.data, this.node, this);
          this.node.collapse();
        } else {
          this.node.expand();
          this.$emit('node-expand', this.node.data, this.node, this);
        }
      },

      handleCheckChange(value, ev) {
        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      },

      handleChildNodeExpand(nodeData, node, instance) {
        this.broadcast('ElTreeNode', 'tree-node-expand', node);
        this.tree.$emit('node-expand', nodeData, node, instance);
      }
    },

    mounted() {
      console.log(`mounted node 2 = ${this.node.label}`);
      console.log(`mounted node 2 = ${this.node}`);
      const label = this.node.label;
    },

    created() {
      const parent = this.$parent;

      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }

      const tree = this.tree;
      if (!tree) {
        console.warn('Can not find node\'s tree.');
      }

      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren();
      });

      this.showCheckbox = tree.showCheckbox;

      if (this.node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }

      if(this.tree.accordion) {
        this.$on('tree-node-expand', node => {
          if(this.node !== node) {
            this.node.collapse();
          }
        });
      }
    }
  };
</script>

<style scoped>
.icon-folder {
  width: 18px;
  height: 18px;
  background-image: url('./../assets/img/icon_folder.svg');
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: center;
}
.icon-folder-open {
  width: 18px;
  height: 18px;
  /* background-image: url('./../assets/img/icon_folder.svg'); */
  background-image: url('./../assets/img/icon_openfolder.svg');
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: center;
}
.py-icon {
  margin-left: 8px;
  margin-top: 4px;
  width: 12px;
  height: 12px;
  background-image: url('./../assets/img/language_python.svg');
  background-size: 12px 12px;
}
.txt-icon {
  margin-left: 8px;
  margin-top: 4px;
  width: 12px;
  height: 12px;
  background-image: url('./../assets/img/icon_documents.svg');
  /* background-image: url('./../assets/img/language_python.svg'); */
  background-size: 12px 12px;
}
.label-font {
  font-family: 'Gotham-Book';
  /* font-size: 5px; */
  /* color: #FFFFFF; */
  color:#A6A6A6;
  /* color: yellow; */
  letter-spacing: -0.8px;
}

/* ::selection
{
  color:#ff0000;
}

::-moz-selection
{
  color:#ff0000;
} */
</style>

