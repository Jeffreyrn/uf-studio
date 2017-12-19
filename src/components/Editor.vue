<template>
  <div class="main-wrapper" id="editor-wrapper">
    
    <codemirror
      v-model="code"
      :options="editorOption"
      ref="myEditor"
      @input="onEditorCodeChange">
    </codemirror>
  </div>
</template>
<script>
// import robot from '../assets/lib/robot';
import { codemirror, CodeMirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/mode/python/python';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/addon/display/fullscreen.css';
import PythonHint from '../assets/lib/python-hint';
// require('codemirror/mode/clike/clike.js');
// require('codemirror/addon/comment/comment.js');
// require('codemirror/addon/dialog/dialog.js');
// require('codemirror/addon/dialog/dialog.css');
// require('codemirror/addon/search/searchcursor.js');
// require('codemirror/addon/search/search.js');
// require('codemirror/keymap/emacs.js');
// require('codemirror/theme/monokai.css');
// require('codemirror/addon/hint/javascript-hint.js');

// let count = 0;
// const tmp = setInterval(() => {
//   if (count > 5) {
//     clearInterval(tmp);
//   }
//   else {
//     CodeMirror.getLiveHint.push(String(count));
//     count += 1;
//   }
// }, 1000);
// CodeMirror.getLiveHint = ['11', '22', '33'];

export default {
  data() {
    return {
      code: 'def as #123',
      editorOption: {
        mode: {
          name: 'python',
          version: 3,
          singleLineStringErrors: false,
        },
        tabSize: 2,
        theme: 'monokai',
        extraKeys: {
          Tab: (cm) => {
            const cursorLine = cm.getLine(cm.getCursor().line);
            console.log(cursorLine, CodeMirror.hint.anyword);
            cm.showHint({ hint: CodeMirror.hint.python });
            // CodeMirror.showHint(cm, CodeMirror.hint.coffeescript);
          },
          F10: (cm) => {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
        },
        styleSelectedText: true,
        styleActiveLine: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      },
    };
  },
  mounted() {
    CodeMirror.registerHelper('hintWords', 'python', PythonHint);
    // this.editor.focus();
    console.log('this is current editor object', this.editor);
    this.editor.foldCode(CodeMirror.Pos(13, 0));
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
      return this.$refs.myEditor.codemirror;
    },
  },
  components: {
    codemirror,
  },
};
</script>
<style scoped>
#editor-wrapper {
  background: white;
  text-align: left;
}
a {
  color: white;
}
</style>


