<!-- memo bg -->
<template>
    <div id="app" class='f9' style='display:flex;'>
        <h1>test</h1>
        <div class='form-group'>
            <!--<label for='filter'></label>-->
            <input type='text' class='form-control form-control-sm' id='filter' placeholder='text input...' :value='this.filter' @input="filterWrite($event.target)"/>
        </div>
        <button class='btn btn-sm btn-block btn-outline-secondary' @click='addBtnOn'>add new</button>
        <transition-group name='test' tag='div'>
            <cardtest class='test-item' v-for='(item, index) in this.memos' :key=item.viewIndex v-bind:cardIndex='index' v-bind:memo='item' v-bind:cardStyle='cardStyle' v-on:editing_event_parent='editOnParent' v-on:delete_event_parent='deleteOn'/>
        </transition-group>
        <button class='btn btn-sm btn-block btn-outline-danger' @click='nextData'>next10</button>
    </div>
</template>

<script>
import io from 'socket.io-client'
//import card from './card.vue'
import cardtest from './cardtest.vue'
import moment from 'moment'




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
 * get url (gen mongodb url)
 */
function getUrl(){
    //return io.request.connection.remoteAddress
    var web_server = window.location.host
    var backend = web_server.split(':')[0] + ':3010'
    return backend
}
/**
 * 
 */
export default {
    name: 'filter-test',
    components: {
        cardtest
    },
    data: () => ({
        memos: Array,
        //socket : io('localhost:3030'),
        //socket : io('192.168.10.132:3030'),
        socket: io(getUrl(), {transports: ['websocket']}),
        test_memos:Array,
        filter: '',
        read_size: 4,
        cardStyle: String,
        viewIndexMaster: 0
    }),
    methods: {
        socketTest(){
            this.name = 'aaa';
            this.message = 'test message';
            this.memos = [{text:'aaa',datetime:'bbb', _id:'new'}];
            this.socket.emit('READLIMIT', this.read_size);
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
		const newMemo = [{_id: 'new', text:'', datetime:getDatetime(), viewIndex: this.viewIndexMaster++}];
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
    },
    /**
     * filter change
     */
    filterWrite: function(target){
        this.$emit('input', target.value);
        if(target.value === this.filter){
            return
        }
        this.filter = target.value;
        this.socket.emit('FILTER_STRING', {filter: this.filter, num: this.read_size});        
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
                buf.push({_id: m._id, datetime: m.datetime, text: jointext, viewIndex: this.viewIndexMaster++});
            });
            this.memos = buf;
		}),
		/**
		 * new mongo id set
		 */
		this.socket.on('NEW_ID', (mes) => {
			if(this.memos[0]._id === 'new'){
                //this.transition_name = 'test-off'
                //this.cardClass = 'test-item-off'
                this.memos[0]._id = mes;
                //this.cardClass = 'test-item'
                //this.transition_name = 'test'
            }
		})
  },
  beforeMount(){
        //this.socketTest();
        //this.memos = [{datetime:'', text:'', _id:''}];
        this.memos = []
        this.socket.emit('READLIMIT', this.read_size);
        this.cardStyle = 'background'
        //this.transition_name = 'test'
        //this.cardClass = 'test-item'
  }
}
</script>
<style>
/**
 * animation
 */
 
.test-item {
  transition: all 1s;
  display: block;
}
.test-enter, .test-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}
.test-leave-active {
  position: absolute;
}


</style>