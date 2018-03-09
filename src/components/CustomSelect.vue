<template>
    <div class="noselected">
        <ul class="root-select">
            <li>
                <div class="select-head">
                    <span class="select-head-cont select-font" style="padding-top:10px;"></span>
                    <span class="select-icon"></span>
                    <!-- <div class="position-absolute select-toparrow"> -->
                    <div class="position-absolute">
                    </div>
                    <div class="position-absolute select-bottomarrow">
                    </div>
                </div>
                <ul class="option">
                    <template v-for='(data,index) in options'>
                        <li class="option-item select-font" v-bind:value="data.value">{{ data.text }}</li>
                    </template>
                    
                    <!-- <li class="option-item select-font" value='.py'>py</li>
                    <li class="option-item select-font" value='.txt'>txt</li>
                    <li class="option-item select-font" value='.md'>md</li>
                    <li class="option-item select-font" value=''>none</li> -->
                </ul>          
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    // name: "CustomSelect",
    name: 'custom-select',
    data() {
        return {
            model: GlobalUtil.model,
            // inputText: '',
            // selected: '.py',
            options: [
                { text: 'py', value: '.py' },
                { text: 'txt', value: '.txt' },
                { text: 'md', value: '.md' },
                // { text: 'none', value: '' },
            ],
        };
    },
    beforeDestroy() {
    },
    mounted() {
        const selectHead = document.getElementsByClassName('select-head')[0];
        const selectHeadCont = document.getElementsByClassName('select-head-cont');
        const Option = document.getElementsByClassName('option')[0];
        const optionItem = document.getElementsByClassName('option-item');
        
        /*默认是第一个选项*/
        // selectHeadCont[0].innerHTML = optionItem[0].innerHTML;
        
        /*点击后出现下拉框*/
        selectHead.addEventListener('click',function(){
            // setTimeout(()=>{
            //     Option.style.display = 'block';
            // }, 10);
            setTimeout(() => {
                Option.style.display = 'block';
            }, 100);
        },false);
        /*点击选项后出现在下拉框*/
        var len = optionItem.length;
        for(var i=0;i<len;i++){
            optionItem[i].index = i;
            optionItem[i].addEventListener('click',function(){
                selectHeadCont[0].innerHTML = optionItem[this.index].innerHTML;
                GlobalUtil.model.localProjTree.fileSelected = `.${selectHeadCont[0].innerHTML}`;
                if (selectHeadCont[0].innerHTML === 'none') {
                    selectHeadCont[0].innerHTML = '';
                }
                Option.style.display = 'none';
            },false);
        }
        /*点击其他地方时，select会收起来*/
        // document.body.addEventListener('click',function(){
        //     Option.style.display = 'none';
        // }.false);

        // document.getElementById('root-dialog').addEventListener('click',function(){
        //     Option.style.display = 'none';
        // }.false);

        this.setSelected();
    },
    methods: {
        setSelected() {
            const selectHeadCont = document.getElementsByClassName('select-head-cont');
            selectHeadCont[0].innerHTML = GlobalUtil.model.localProjTree.fileSelected.replace('.', ''); //optionItem[0].innerHTML;
            if (selectHeadCont[0].innerHTML === 'none') {
                selectHeadCont[0].innerHTML = '';
            }
        },
    },
    computed: {
    },
    watch: {
    },
};

</script>

<style lang="scss" scoped>
ul,li {
    list-style: none;
    padding: 0;
    margin: 0;
}

/*下拉框样式*/
.root-select {
    // margin:100px;
    // background: rgba(0,0,0,0);
    // width: 249px;
    // height: 40px;
    // background: yellow;
    width: 46px;
    height: 34px;
    // font-family: "微软雅黑";
    font-size: 18px;
    color: white;
    // border: 1px #1a1a1a solid;
    // border-radius: 5px;
    cursor: pointer;
}
.select-head {
    overflow: hidden;
    // width: 249px;
    // height: 40px;
    // box-sizing: border-box;
    // padding: 0 10px;
    // line-height: 40px;
    width: 46px;
    height: 34px;
}
.select-head .select-head-cont {
    float: left;
}
.select-font {
    font-family: Gotham-Book;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: -0.75px;
    padding-left: 8px;
    // padding-top: 8px;
}
.select-head .select-icon {
    float: right;
}
.option {
    // text-indent: 10px;
    // margin-top: 1px;
    // width: 249px;
    width: 46px;
    color: white;
    // background: rgba(236,111,111,0.1);
    // background:#2C2C2C
    background: #2C2C2C;
    line-height: 20px;
    // border: 1px #cfcfcf solid;
    display: none;
}
.option-item:hover {
    // background: rgba(204,106,67,0.3);
    background: #202020;
}
.select-toparrow {
    top:10px;
    left:32px;
    width: 7px;
    height: 5px;
    background-image: url('./../assets/img/pop/toparrowbtns.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 7px 5px
}
.select-bottomarrow {
    top:20px;
    left:32px;
    width: 7px;
    height: 5px;
    background-image: url('./../assets/img/pop/bottomarrowbtns.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 7px 5px
}
.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
not supported by any browser */
}
</style>
