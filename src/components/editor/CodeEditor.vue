<!-- v-model="model.localProjTree.curSelectedContent" -->
<!-- v-bind:class="classObject" -->

<template>

  <div>

    <div v-if="model.localProjTree.curSelectedFileUUID!==data.uuid && isShow" :value="data.uuid" class="position-absolute opacity0" style="width:100%;">
      <div class="top-path" style="width:100%;background:#2E3032;color:#50E3C2;font-family:'Gotham-Book';"> {{ data.uuid }} </div>
      <codemirror
        v-model="model.localProjTree.inputsText[data.uuid]"
        style="width:100%"
        id="codemirror-id"
        :options="editorOption"
        ref="myEditor"
        @input="onEditorCodeChange">
      </codemirror>
      <div class="float-clear"></div>
    </div>

    <div v-if="model.localProjTree.curSelectedFileUUID===data.uuid && isShow" :value="data.uuid" class="position-absolute opacity1" style="width:100%;">
      <div class="top-path" style="width:100%;background:#2E3032;color:#50E3C2;font-family:'Gotham-Book';"> {{ data.uuid }} </div>
      <codemirror
        v-model="model.localProjTree.inputsText[data.uuid]"
        style="width:100%"
        id="codemirror-id"
        :options="editorOption"
        ref="myEditor"
        @input="onEditorCodeChange">
      </codemirror>
      <div class="float-clear"></div>
    </div>

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
      // inputText: '',
      isShow: true,
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
    const self = this;
    console.log(`init uuid = ${this.data.uuid}`);
    let fileInfo = GlobalUtil.model.localProjTree.getFileInfo(self.data.uuid);
    GlobalUtil.model.localProjTree.inputsText[self.data.uuid] = fileInfo.localContent;
    GlobalUtil.model.localProjTree.allCodeEditorVue[this.data.uuid] = this;//.inputText;
    // const file = GlobalUtil.model.localProjTree.getFile(this.data.uuid);
    // this.inputText = file.content;
    CodeMirror.registerHelper('hintWords', 'python', PythonHint);
    console.log('this is current editor object', this.editor);
    this.editor.foldCode(CodeMirror.Pos(13, 0));
    const html = document.getElementById("codemirror-id").innerHTML;
    GlobalUtil.model.localProjTree.editors[this.data.uuid] = this.editor;
    GlobalUtil.model.localProjTree.onwinresize();
    
    CommandsEditorSocket.getFile(this.data.uuid, (dict) => {
      let content = dict.data;
      if (content === null || content === undefined) {
        content = '';
      }
      let fileInfo = GlobalUtil.model.localProjTree.getFileInfo(self.data.uuid);
      fileInfo.localContent = content;
      GlobalUtil.model.localProjTree.inputsText[self.data.uuid] = content;
      self.isShow = false;
      self.isShow = true;
    });
  },
  methods: {
    onEditorCodeChange(newCode) {
      CommandsEditorSocket.saveOrUpdateFile(this.data.uuid, newCode, (dict) => {
        if (dict.data === 'success') {
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
        // 'opacity0': !GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
        // 'opacity1': GlobalUtil.model.localProjTree.hasOpenFileInCurPro,
        'opacity0': GlobalUtil.model.localProjTree.curSelectedFileUUID!==this.data.uuid,
        'opacity1': GlobalUtil.model.localProjTree.curSelectedFileUUID===this.data.uuid,
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
