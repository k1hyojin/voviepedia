<template>
  <div class="myListView">
    <ul>
      <li v-for="(i, x) in this.myMovie" :key="{ x }">
        <router-link :to="`/detail/${i.id}`">
          <img :src="this.backUrl + i.poster" />
          <span>{{
            i.title.length > 15 ? i.title.substr(0, 13) + ".." : i.title
          }}</span>
        </router-link>
        <button @click="deleteMyList(i.id)">삭제하기</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  props: {
    myMovie :String
},
computed:{
    ...mapState([ 'backUrl'])
},
  methods: {
    deleteMyList(myid){
        this.$emit('deletemine',myid);
    }
  },
};
</script>

<style lang="scss">
.myListView {
  @include base(100%, auto, flex);
  margin-top: 20px;
  & > ul {
    @include base(1000px, auto, flex);
    @include flex(row wrap, start, center);
    margin: 0 auto;
    & > li {
      @include base(200px, 280px, flex);
      @include flex(column nowrap, center, center);
      position: relative;
      & > a {
        @include base($cardwidth2, $cardheight2, flex);
        @include flex(column nowrap, space-between, center);
      }
      & > a > img {
        @extend %moviecard2;
        transition: all 0.4s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > a > span {
        @include base($cardwidth2, 30px, block);
        line-height: 30px;
        font-size: 14px;
      }
      & > button {
        @extend %btn;
        position: absolute;
        bottom: 70px;
        left: 50px;
      }
    }
  }
}
</style>