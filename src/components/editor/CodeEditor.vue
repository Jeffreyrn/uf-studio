<template>
  <div>
    <div style="position:absolute;">这家伙很懒,什么文件也没有打开</div>
    <codemirror
      v-bind:class="classObject"
      id="codemirror-id"
      v-model="model.localProjTree.curSelectedContent"
      :options="editorOption"
      ref="myEditor"
      @input="onEditorCodeChange">
    </codemirror>
    <div class="float-clear"></div>

  </div>
</template>

<script>

import { codemirror, CodeMirror } from 'vue-codemirror';
import { codemirror2, CodeMirror2 } from 'vue-codemirror';
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
import PythonHint from '../../assets/lib/python-hint';

export default {
  data() {
    return {
      // code: 'def as #123',
      model: GlobalUtil.model,
      uneditorOption: {
        readOnly : true,
      },
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
    const codemirrorId = document.getElementById("codemirror-id");
    console.log(`codemirrorId width = ${codemirrorId.style.width}`);
  },
  methods: {
    onEditorCodeChange(newCode) {
      console.log('this is new code', newCode);
      GlobalUtil.model.localProjTree.curFile.content = newCode;
      // this.code = newCode;
      GlobalUtil.model.localProjTree.curSelectedContent = newCode;
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
    classObject: () => {
      return {
        'opacity0': !GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
        'opacity1': GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
      }
    },
  },
  components: {
    codemirror,
  },
};
</script>

<style scoped>
.opacity0 {
  opacity: 0.0;
}
.opacity1 {
  opacity: 1.0;
}
</style>
