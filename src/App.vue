<template>
  <div id="app"  class='container-fluid'>
    <userSelect />

<!--
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/></svg>
  <svg class="bi" width="32" height="32" fill="currentColor">
    <use xlink:href="bootstrap-icons.svg#heart-fill"/>
  </svg>


    <nav style='display: inline;'>
      <router-link class='btn btn-sm btn-outline-info' :to="{name: 'Panel'}">Panel</router-link>
      <router-link class='btn btn-sm btn-outline-danger' :to="{name: 'memo', params: {color: 'mono'}}">Memo-mono</router-link>
      <router-link class='btn btn-sm btn-outline-secondary' :to="{name: 'memo', params: {color: 'background'}}">Memo-bg</router-link>
      <router-link class='btn btn-sm btn-outline-primary' :to="{name: 'memo', params: {color: 'outline'}}">Memo-outline</router-link>
      <router-link class='btn btn-sm btn-outline-success' :to="{name: 'filter-test'}">Filter-test</router-link>
        <button id='dbBtn' class='btn btn-sm btn-outline-dark btn-circle'>db</button>
    </nav>

    <hr style='margin:0;'/>

    <router-view />
-->
  </div>
</template>

<script>
import userSelect from './page/userSelect.vue'
/* disable-eslint-next-line */

export default {


}




</script>

<style>
.f1{font-family: 'Noto Sans JP', sans-serif;}
.f2{font-family: 'Noto Sans TC', sans-serif;}
.f3{font-family: 'M PLUS 1p', sans-serif;}
.f4{font-family: 'Noto Sans SC', sans-serif;}
.f5{font-family: 'Sawarabi Mincho', sans-serif;}
.f6{font-family: 'Sawarabi Gothic', sans-serif;}
.f7{font-family: 'Kosugi Maru', sans-serif;}
.f8{font-family: 'M PLUS Rounded 1c', sans-serif;}
.f9{font-family: 'Kosugi', sans-serif;}
h1{display: inline;}
#app {
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  */
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  padding-left: 0;
  padding-right:0;
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.42;
  border-radius: 15px;
}
/*#dbBtn{float:right; margin-top:12px;}
*/
#dbBtn{float:right;}
</style>
