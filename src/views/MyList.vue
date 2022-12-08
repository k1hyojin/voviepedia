<template>
  <div>
    <h1>내가 좋아하는 영화들  🎞</h1>
    <div class="myListView">
      <ul>
        <li v-for="(i, x) in this.myList" :key="{ x }">
          <router-link :to="`/detail/${i.id}`">
            <img :src="this.backUrl + i.poster" />
            <span>{{ i.title.length > 15 ? i.title.substr(0, 13) + ".." : i.title }}</span>
          </router-link>
          <button @click="removeMyList(i.id)">삭제하기</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myList: [],
      backUrl: "https://image.tmdb.org/t/p/w200",
    };
  },
  methods: {
    removeMyList(discard){
      for(let i = 0; i < this.myList.length; i++){
        this.myList[i];
        if(discard === this.myList[i].id){
          this.myList.splice(i, 1);
          i--;
        }
      }
      localStorage.setItem("store",JSON.stringify(this.myList))
    }
  },
  mounted() {
    this.myList = JSON.parse(localStorage.getItem("store"));
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include base(100%, 50px, block);
  line-height: 50px;
  text-align: center
}
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
      &>a{
        @include base($cardwidth2, $cardheight2, flex);
        @include flex(column nowrap, space-between, center);
      }
      & > a > img {
        @extend %moviecard2;
        transition: all 0.4s ease;
        &:hover{
          transform:scale(1.1);
        }
      }
      & > a > span{
        @include base($cardwidth2, 30px, block);
        line-height: 30px;
        font-size: 14px;
      }
      &>button{
        @extend %btn;
        position: absolute;
        bottom: 70px;
        left: 50px;
      }
    }
  }
}
</style>