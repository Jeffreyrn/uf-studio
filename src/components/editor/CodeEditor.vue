<template>
  <div name="code-editor" :value="data.uuid" class="float-left;width:100%;">
    <!-- <input v-model="example0"/> -->
    <!-- v-if="data.uuid===model.localProjTree.curFile.uuid" -->
    <!-- <div style="position:absolute;top:100px;">这家伙很懒,什么文件也没有打开</div> -->
    <!-- <div class="top-path" style="">this:{{ data.uuid }}, cur:{{ model.localProjTree.curFile.uuid }}</div> -->
    <div class="top-path" style="width:100%">{{ data.uuid }}</div>
          <!-- v-model="model.localProjTree.curSelectedContent" -->
    <codemirror
      v-model="inputText"
      v-bind:class="classObject"
      style="width:100%"
      id="codemirror-id"
      :options="editorOption"
      ref="myEditor"
      @input="onEditorCodeChange">
    </codemirror>
    <div class="float-clear"></div>
  </div>
</template>

<script>

import { codemirror, CodeMirror } from 'vue-codemirror';
// import { codemirror2, CodeMirror2 } from 'vue-codemirror';
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
  props: ['data'],
  data() {
    return {
      // code: 'def as #123',
      inputText: '',
      model: GlobalUtil.model,
      complete_prefix: '',
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
            console.log(`Tab`);
            // const cursorLine = cm.getLine(cm.getCursor().line);
            // console.log(cursorLine, CodeMirror.hint.anyword);
            // cm.showHint({ hint: CodeMirror.hint.python });
            // CodeMirror.showHint(cm, CodeMirror.hint.coffeescript);

            const cur = this.editor.getCursor();
            const curLine = this.editor.getLine(cur.line);
            const curColumn = cur.ch;

            let List = curLine.split(' ');
            List = List[List.length-1].split('.');
            const self = this;
            self.complete_prefix = List[List.length-1];

            CommandsEditorSocket.autocompletePython(self.editor.getValue(), cur.line, cur.ch, (dict) => {
              // console.log(`autocompletePython dict = ${JSON.stringify(dict)}`);
              const completeDatas = dict.data;
              console.log(`completeDatas = ${JSON.stringify(completeDatas)}`);
              let prefix = [];
              if (self.complete_prefix !== '.' && self.complete_prefix !== '*' && self.complete_prefix !== '?' && self.complete_prefix !== '+') {
                prefix.push(self.complete_prefix);
              }
              let allDatas = PythonHint.concat(completeDatas).concat(prefix);
              allDatas = GlobalUtil.uniqueArr(allDatas);
              CodeMirror.registerHelper('hintWords', 'python', allDatas);
              cm.showHint({hint: CodeMirror.hint.anyword})
            });
          },
          // F11键切换全屏
          "F11": function(cm) {
            console.log(`F11`);
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          // Esc键退出全屏
          "Esc": function(cm) {
            console.log(`Esc`);
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            // if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
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
    console.log(`init uuid = ${this.data.uuid}`);
    CodeMirror.registerHelper('hintWords', 'python', PythonHint);
    console.log('this is current editor object', this.editor);
    this.editor.foldCode(CodeMirror.Pos(13, 0));
    const html = document.getElementById("codemirror-id").innerHTML;
    GlobalUtil.model.localProjTree.editors[this.data.uuid] = this.editor;
    // GlobalUtil.model.localProjTree.editors[this.data.uuid].setSize('auto', `${document.body.clientHeight - 120 - 200}px`);
    GlobalUtil.model.localProjTree.onwinresize();
    const self = this;
    CommandsEditorSocket.getFile(this.data.uuid, (dict) => {
      let content = dict.data;
      if (content === null || content === undefined) {
        content = '';
      }
      self.inputText = content;
      // self.curFile.remoteContent = content;
      // if (self.curFile.localContent === null || self.curFile.localContent === undefined || self.curFile.localContent === '') {
      //   // self.curFile.localContent === content;
      //   self.setSelectedContent(file.uuid, content);
      // }
    });
  },
  methods: {
    onEditorCodeChange(newCode) {
      console.log('this is new code', newCode);
      // GlobalUtil.model.localProjTree.curFile.content = newCode;
      // const curFile = GlobalUtil.model.localProjTree.curFile;
      // GlobalUtil.model.localProjTree.setSelectedContent(curFile.uuid, newCode);
      // GlobalUtil.model.localProjTree.curOpenedFilesList = GlobalUtil.model.localProjTree.curOpenedFilesList;
      // // const curFile = this.getCurFile();
      // if (curFile === null) {
      //   return;
      // }
      // const uuid = curFile.uuid;
      // const text = curFile.localContent;
      CommandsEditorSocket.saveOrUpdateFile(this.data.uuid, newCode, (dict) => {
        if (dict.data === 'success') {
          // curFile.remoteContent = text;
          GlobalUtil.model.localProjTree.curOpenedFilesList = GlobalUtil.model.localProjTree.curOpenedFilesList;
        }
        console.log(`update content success`);
      });
    },
  },
  beforeDestroy() {
  },
  watch: {
    example0(curVal, oldVal) {
      console.log(curVal, oldVal);
    },
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
    classObject1: (uuid) => {
      return {
        'width0': uuid !== model.localProjTree.curFile.uuid,
        'width1': uuid === model.localProjTree.curFile.uuid,
      }
    }
  },
  components: {
    codemirror,
  },
};
</script>

<style scoped>
.width0 {
  width: 0px;
}
.width1 {
  width: 100%;
}
.opacity0 {
  opacity: 0.0;
}
.opacity1 {
  opacity: 1.0;
}
.top-path {
  color:lightblue;
  font-size: 12px;
  background-color:rgba(255, 250, 226, 1.0);
}
.CodeMirrorOveride {
  border: 1px solid #eee;
  height: 10px;
}
</style>
