<template>
<!--
    <div class='card' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
        <h1>a</h1>
        <div class='card-body'>
            <textarea style="overflow: hidden; line-height: 25px; height: 100px;" class="card-text form-control animated" :class="this.cardbody_color(this.cardStyle, this.cardIndex)" placeholder="new memo write ..."  @input="rewrite($event.target)" :value='this.memo.text' @click="sclick($event.target)" @dblclick="dclick($event.target)"></textarea>
        </div>
        <div class='card-footer text-muted' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
            <span class="straight">last update&nbsp; {{this.memo.datetime}}&nbsp;&nbsp;</span>
            <delIcon :key=this.cardIndex v-bind:cardId='this.genCardId(this.cardIndex)' v-on:delete_event_child='delOnx' />
        </div>       
    </div>    
-->
    <div class='card h-300' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
        <h1>a</h1>
        <div class='card-body'>
            <textarea style="line-height: 25px; height: 100px;" class="card-text form-control animated" :class="this.cardbody_color(this.cardStyle, this.cardIndex)" placeholder="new memo write ..."  @input="rewrite($event.target)" :value='this.memo.text' @click="sclick($event.target)" @dblclick="dclick($event.target)"></textarea>
        </div>
        
        <div class='card-footer text-muted' :class="this.cardbody_color(this.cardStyle, this.cardIndex)">
            <span class="straight">last update&nbsp; {{this.memo.datetime}}&nbsp;&nbsp;</span>
            <delIcon :key=this.cardIndex v-bind:cardId='this.genCardId(this.cardIndex)' v-on:delete_event_child='delOnx' />
        </div>
             
    </div>    
</template>

<script>
import delIcon from './delIcon'

const colors = ['primary','success','info','warning','danger','secondary','dark','light'];
/**
 * mono style
 */
function color_mono(){
    return 'bg-light'
}
/**
 * outline style
 */
function color_outline(cardIndex){
    const index = cardIndex % colors.length;
    return 'border-' + colors[index];
}
/**
 * background style
 */
function color_background(cardIndex){
    const index = cardIndex % colors.length;
    if (index == 7){
        return 'bg-' + colors[index];
    }else{
        return 'bg-' + colors[index] + ' text-white';
    }
}
/**
 * double click checker
 */
var timer = 0;
var delay = 200;
var prevent = false;

/**
 * textarea double click action
 */
function textAreaSpread(o){
    o.style.height = "1px";
    o.style.height = (o.scrollHeight) + "px";
}
function textAreaHeightReset(o, height){
    o.style.height = height
}
/**
 * exports
 */
export default {
    name:'card',
    components:{
        delIcon
    },
    props:{
        memo: Object,
        cardIndex: Number,
        cardStyle: String
    },
    data: () => ({
        test: Number,
        cardtext: String,
        carddatetime: String,
        initialTextareaHeight: '100px'
    }),
    methods:{

        cardbody_color: (color, cardIndex) => {
            if (color === 'background'){
                return color_background(cardIndex)
            }else if(color === 'mono'){
                return color_mono()
            }else if(color === 'outline'){
                return color_outline(cardIndex)
            }
        },
        /**
         * textarea clicks
         */
        sclick: function(o){
            timer = setTimeout(function() {
                if (!prevent) {
                    textAreaSpread(o)
                }
                prevent = false;
            }, delay);
        },
        /**
         * textarea double click
         */
        dclick: function(o){
            clearTimeout(timer);
            prevent = true;
            textAreaHeightReset(o, this.initialTextareaHeight)
        },
        /**
         * text edit event
         */
        rewrite: function(target){
            this.$emit('input', target.value);     // textarea parent data re-write
            this.$emit('editing_event_parent', this.cardIndex, target.value);
            textAreaSpread(target)
        },
        /**
         * delete on
         */
        delOnx: function(){
            this.$emit('delete_event_parent', this.cardIndex);
        },
        /**
         * gen trash icon id
         */
        genCardId: function(no){
            return 'delId' + String(no)
        }
    },
    beforeMount(){
        this.countTest = 0;
        this.test = 0;
    }
}
</script>

<style>

.card-body{
    padding:0px;
}
.card-text{
    border:0px;
    font-size: 0.82rem;
}
.card-footer{
    font-size: 0.8rem;    
    padding:0px;
}

.trash_confirm{
    margin-right: 2%;
}
.card_trash{

}


.tooltip-inner{

}

click-confirm{
    display: inline;
}
.animated {
	-webkit-transition: height 0.2s;
	-moz-transition: height 0.2s;
	transition: height 0.2s;
}

</style>
