<template>
      <div class="modal" >
      <span @click="$emit('close', false)">❌</span>
      <iframe :src="trailURL" frameborder="0"></iframe>
      </div>
</template>

<script>
export default {
  props:{
    trailURL : String,
    show : Boolean,
    close : Function
  }
}
</script>

<style lang="scss">
  .modal{
    @include base(600px, 350px, block);
    background-color: #222;
    z-index: 100;
    box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px;
    position: absolute;
    top: 20%;
    right: 15%;
    &>iframe{
        @include base(600px, 350px, block);
    }
    &>span{
      @extend %btn;
      @include base(50px,50px, block);
      line-height: 50px;
      font-size: 25px;
      position: absolute;
      bottom: -70px;
      left: 45%;
    }
  }
</style>