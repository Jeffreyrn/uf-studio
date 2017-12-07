<template>
  <div class="main-wrapper" id="editor-wrapper">
    
    <codemirror
      v-model="code"
      :options="editorOption"
      ref="myEditor"
      @change="onEditorCodeChange">
    </codemirror>
  </div>
</template>
<script>
// import robot from '../assets/lib/robot';
import { codemirror, CodeMirror } from 'vue-codemirror-lite';

require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/edit/closebrackets');
require('codemirror/mode/clike/clike.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/comment/comment.js');
require('codemirror/addon/dialog/dialog.js');
require('codemirror/addon/dialog/dialog.css');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/search.js');
require('codemirror/keymap/emacs.js');
require('codemirror/theme/monokai.css');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/addon/hint/javascript-hint.js');

let count = 0;
const tmp = setInterval(() => {
  if (count > 5) {
    clearInterval(tmp);
  }
  else {
    CodeMirror.getLiveHint.push(String(count));
    count += 1;
  }
}, 1000);
CodeMirror.getLiveHint = ['11', '22', '33'];

export default {
  data() {
    return {
      code: 'def as #123',
      editorOption: {
        mode: 'text/x-python',
        tabSize: 2,
        keyMap: 'emacs',
        theme: 'monokai',
        extraKeys: {
          Tab: (cm) => {
            CodeMirror.showHint(cm, CodeMirror.hint.python);
            // CodeMirror.showHint(cm, CodeMirror.hint.coffeescript);
          },
        },
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        lineNumbers: true,
        line: true,
        autoCloseBrackets: true,
      },
    };
  },
  mounted() {
    this.editor.focus();
    console.log('this is current editor object', this.editor);
  },
  methods: {
    onEditorCodeChange(newCode) {
      console.log('this is new code', newCode);
      this.code = newCode;
    },
  },
  beforeDestroy() {
  },
  watch: {
  },
  computed: {
    editor() {
      // get current editor object
      return this.$refs.myEditor.editor;
    },
  },
  components: {
    codemirror,
  },
};
</script>
<style scoped>
#editor-wrapper {
  background: black;
}
a {
  color: white;
}
</style>


