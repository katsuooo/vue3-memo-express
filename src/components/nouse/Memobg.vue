<!-- memo bg -->
<template>
  <div id="app" class='f9'>
    <h1 style='margin-left:7%;'>v-memo</h1>
    <button class='btn btn-sm btn-block btn-outline-secondary' @click='addBtnOn'>add new</button>
    <transition-group name='list-complete' tag='p'>
      <card class='list-complete-item' v-for='(item, index) in this.memos' :key=item.datetime v-bind:cardIndex='index' v-bind:memo='item' v-on:editing_event_parent='editOnParent' v-on:delete_event_parent='deleteOn'/>
    </transition-group>
    <button class='btn btn-sm btn-block btn-outline-danger' @click='nextData'>next10</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
import card from './card.vue'
import moment from 'moment'
import mongoUrl from './mongoUrl'
/**
 * memo.text >>> memo.lines[]
 * @param {String} memo 
 */
function shapeMemo(memo){
    var newMemo = {}
    newMemo._id = memo._id;
    newMemo.datetime = memo.datetime;
    newMemo.lines = memo.text.split('\n');
    return newMemo;
}
/**
 * text change check
 */
function isChange(nowMemo, newMemo){
    if (nowMemo === newMemo){
        return false;
    }
    return true;
}
/**
 * get datetime
 */
function getDatetime(){
    return moment().format().split('+')[0];
}
/**
 * 
 */
export default {
  name: 'app',
  components: {
    card
  },
  data: () => ({
    memos: Array,
    //socket : io('localhost:3030'),
    socket: io(mongoUrl.getUrl(), {transports: ['websocket']}),
    count: 0,
    test_memos:Array
  }),
  methods: {
    socketTest(){
            this.name = 'aaa';
            this.message = 'test message';
            //this.sendMessage()
            this.count += 1;
            this.memos = [{text:'aaa',datetime:'bbb', _id:'new'}];
            this.socket.emit('READLIMIT', 4);
    },
    textNew(val){
            this.memos.text = val;
    },
    editOnParent:function(cardIndex, newText){
            if (!isChange(this.memos[cardIndex].text, newText)){
               return;
            }
            this.memos[cardIndex].text = newText;
            this.memos[cardIndex].datetime = getDatetime();
			const shaped = shapeMemo(this.memos[cardIndex]);
			if(this.memos[cardIndex]._id === 'new'){
				this.socket.emit('ADD_NEW_ONE', shaped);
			}else{
                this.socket.emit('UPSERT_ONE', shaped);
			}
		},
		/**
		 * on add new button
		 */
    addBtnOn: function(){
		if(this.memos[0]._id === 'new'){
			return;
			}
		const newMemo = [{_id: 'new', text:'xxx', datetime:getDatetime()}];
        this.memos.splice(0,0,newMemo[0]);
    },
    successAlert: function(){
      //dummy
    },
    /**
     * 
     */
    deleteOn: function(cardIndex){
      if (this.memos[cardIndex]._id !== 'new'){
        this.socket.emit('DELETE_ONE', this.memos[cardIndex]._id);
      }
      this.memos.splice(cardIndex, 1);
    },
    /**
     * next data request
     */
    nextData: function(){
      this.show = !this.show;
    }
  },
  mounted(){
        this.socket.on('MESSAGE', (mes) => {
            this.messages = [...this.messages, mes];
        }),
        this.socket.on('READLIMIT_RESULT', (mes) => {
            //alert(typeof(mes), mes);
            var buf = [];
            mes.forEach( m => {
                var jointext;
                if(m.lines){
                    jointext = m.lines.join('\n');
                }else if(m.text){
                    jointext = m.text;            
                }else{
                    jointext = '';
                }
                buf.push({_id: m._id, datetime: m.datetime, text: jointext});
            });
            this.memos = buf;
		}),
		/**
		 * new mongo id set
		 */
		this.socket.on('NEW_ID', (mes) => {
			if(this.memos[0]._id === 'new'){
				this.memos[0]._id = mes;
			}
		})
  },
  beforeMount(){
        //this.socketTest();
        this.memos = [{datetime:'', text:'', _id:''}];
        this.socket.emit('READLIMIT', 4);
  }
}
</script>
<style>
h1{display: inline;}

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;
}
.btn-circle-confirm {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;
  margin-left: 2px;
  margin-right:2px;
}
/**
 * animation
 */
.list-complete-item {
  transition: all 1s;
  /*display: inline-block;*/
  display: block;
  /*margin-right: 10px;*/
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}
.list-complete-leave-active {
  position: absolute;
}
</style>