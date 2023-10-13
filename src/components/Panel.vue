<!-- panel -->
<template>
    <div class='container-fluid'>
        <h4>panel</h4>
        <span>{{memos}}</span>
        <span>{{this.memos}}</span>
        <!--
        <transition-group name='list-complete' tag='div'>
            <panelCard class='list-complete-item' v-for='(item, index) in this.memos' :key=item.viewIndex v-bind:cardIndex='index' v-bind:memo='item' v-bind:cardStyle='cardStyle' v-on:editing_event_parent='editOnParent' v-on:delete_event_parent='deleteOn'/>
        </transition-group>
        -->
        <div class="row row-cols-1 row-cols-md-4 g-3">
            <transition-group name='panel-complete' tag='div' class='col'>
                <panelCard class='panel-complete-item' v-for='(item, index) in this.memos' 
                    :key=item.viewIndex 
                    v-bind:cardIndex='index' 
                    v-bind:memo='item' 
                    v-bind:cardStyle='cardStyle' 
                    v-on:editing_event_parent='editOnParent' 
                    v-on:delete_event_parent='deleteOn'/>
            </transition-group>
        </div>
<!--
<div class="row row-cols-1 row-cols-md-4 g-3">
    <div class="col">
        <div class="card h-300">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-white bg-dark h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Dark card title</h5>
                <textarea style="overflow: hidden; line-height: 25px; height: 100px;" class="card-text form-control animated" :class="this.cardbody_color(this.cardStyle, this.cardIndex)" placeholder="new memo write ..."  @input="rewrite($event.target)" :value='this.memo.text' @click="sclick($event.target)" @dblclick="dclick($event.target)"></textarea>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-dark bg-light h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Light card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-white bg-secondary h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Secondary card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
</div>
<div class="row row-cols-1 row-cols-md-4 g-3">
    <div class="col">
        <div class="card h-300">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-white bg-dark h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Dark card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-dark bg-light h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Light card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card text-white bg-secondary h-300">
            <div class="card-header">Header</div>
            <div class="card-body">
                <h5 class="card-title">Secondary card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
</div>
-->
    </div>
</template>
<script>
/**
 * panel表示
 * 
 * card 8枚のlinesを表示。固定メモ。
 * クリアでmemoに保存され、テキストクリア
 * mongodb/vueMemo.panel {title:,memo:,date}
 * 
 * 
 */
import panelCard from './panelCard.vue'
export default {
    name:'Panel',
    components:{
        panelCard
    },
    data: () => ({
        memos:[],
        cardStyle:String
    }),
    beforeMount(){
        for(let i=0; i<8; i++){
            this.memos.push({title:'',lines:'(empty)',datetime:'',viewIndex:i}) 
        }
        this.cardStyle = this.$route.params.color
    },
    methods:{
        //eslint-disable-next-line
        cardbody_color: (color, cardIndex) => {
            /*
            if (color === 'background'){
                return color_background(cardIndex)
            }else if(color === 'mono'){
                return color_mono()
            }else if(color === 'outline'){
                return color_outline(cardIndex)

            }
            */
            return ''
        },
        //eslint-disable-next-line
        deleteOn(cardIndex){
            // event: delet one
            console.log('panel/delete-on', cardIndex)
        },
        /*
        cardStyle(){
            // :class / return css param
            return ''
        },
        */
        //eslint-disable-next-line
        editOnParent(cardIndex, newData){
            // event: re-write
        }
    }
}
</script>
<style scoped>
.panel-complete-item {
  transition: all 1s;
  /*display: inline-block;*/
  display: block;
  /*margin-right: 10px;*/
}
/**
 * transition
 */
.panel-complete-enter, .panel-complete-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}
.panel-complete-leave-active {
  position: absolute;
}
</style>